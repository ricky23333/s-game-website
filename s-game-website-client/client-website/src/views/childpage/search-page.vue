<template>
  <section class="main">
    <div class="container">
      <div class="content-box">
        <div class="search-box">
          <div class="first-line">
            <span class="title-text">搜索历史</span>
            <div class="item-box"
                 v-if="searchHistory">
              <li class="item" v-for="(item, index) in searchHistory" :key="index"
                  @click.stop="handleSearch(item)">{{item}}
              </li>
              <li class="item-option" v-if="searchHistory.length>0" @click.stop="clearSearch">清空历史</li>
              <li class="item-option" v-else>暂无</li>
            </div>
          </div>
          <div class="second-line" v-if="guestDate&&guestDate.router_type">
            <span class="title-text">分类搜索</span>
            <div class="item-box">
              <li class="item"
                  v-for="(item, index) in guestDate.router_type[this.$store.getters['user/mainRouterIndex']('article')].navInfo"
                  :key="'1-'+index"
                  @click="handleSearch(item.titleName)">{{item.titleName}}
              </li>
              <li class="item"
                  v-for="(item, index) in guestDate.router_type[this.$store.getters['user/mainRouterIndex']('media')].navInfo"
                  :key="'2-'+index"
                  @click="handleSearch(item.titleName)">{{item.titleName}}
              </li>
            </div>
          </div>
        </div>

        <div class="result-box">
          <div class="article-box">
            <div class="title-text">日志</div>
            <div class="wrap" v-if="searchArticleList&&searchArticleList.length > 0">
              <li class="item" v-for="(item, index) in searchArticleList" :key="'3-'+index"
                  @click="toArticlePath(item.id)">
                <article-banner :articleDate="item" :current-main-type="'article'"/>
              </li>
            </div>
            <ul class="empty" v-else>暂无文章</ul>

            <div class="page-container"
                 v-if="searchArticlePagination&&searchArticlePagination.total_page_count>1">
              <Pagination :paginationDate="searchArticlePagination" layouts="prev,pager,next"
                          @changePage="changeArticlePage"/>
            </div>
          </div>

          <div class="media-box">
            <div class="title-text">媒体</div>
            <div class="wrap" v-if="searchMediaList&&searchMediaList.length > 0">
              <li class="item" v-for="(item, index) in searchMediaList" :key="'4-'+index"
                  @click="toArticlePath(item.id)">
                <article-banner :articleDate="item" :current-main-type="'media'"/>
              </li>
            </div>
            <ul class="empty" v-else>暂无文章</ul>

            <div class="page-container" v-if="searchMediaPagination&&searchMediaPagination.total_page_count>1">
              <Pagination :paginationDate="searchMediaPagination" layouts="prev,pager,next"
                          @changePage="changeMediaPage"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex';
  import ArticleBanner from '../../components/article-banner';
  import Pagination from '../../components/pagination';

  export default {
    components: {
      ArticleBanner,
      Pagination,
    },

    data() {
      return {
        perPageCount: 3,
      }
    },

    created() {
      this.handleOnStart();
    },

    mounted() {

    },

    watch: {
      '$route'(to, from) {
        this.handleOnStart();
      },
      windowResizeFlag() {
        this.setPerPageCount();
      },
    },

    computed: {
      ...mapState({
        searchHistory: state => state.user.searchHistory,
        searchArticleList: state => state.article.searchArticleList,
        searchArticlePagination: state => state.article.searchArticlePagination,
        searchMediaList: state => state.article.searchMediaList,
        searchMediaPagination: state => state.article.searchMediaPagination,
        guestDate: state => state.user.guestDate,
        windowResizeFlag: state => state.user.windowResizeFlag,
      }),
    },

    methods: {
      ...mapActions({
        getArticleListDate: 'article/searchArticle',
        clearSearchHistoryDate: 'user/clearSearchHistoryDate',
        getSearchHistoryDate: 'user/getSearchHistoryDate',
        setSearchHistoryDate: 'user/setSearchHistoryDate',
        getGuestDate: 'user/getUserDate',
      }),

      async handleOnStart() {
        if (!this.guestDate || !this.guestDate.router_type) {
          await this.getGuestDate();
        }
        this.getKeywordOnStart();
        this.searchArticleOnStart();
        this.getSearchHistoryDate();
        this.setPerPageCount();
      },

      async searchArticleOnStart() {
        let res1 = await this.handleSearchArticleList(1, this.perPageCount, 'article', this.keyword);
        let res2 = await this.handleSearchArticleList(1, this.perPageCount, 'media', this.keyword);
      },

      async changeArticlePage(page) {
        let res = await this.handleSearchArticleList(page, this.perPageCount, 'article', this.keyword);
      },

      async changeMediaPage(page) {
        let res = await this.handleSearchArticleList(page, this.perPageCount, 'media', this.keyword);
      },

      async handleSearch(tempKeyword) {
        await this.setSearchHistoryDate(tempKeyword);
        this.$router.push({
          path: '/search',
          query:
            {
              keyword: tempKeyword,
            }
        });
      },

      async handleSearchArticleList(page, perPageCount, mainType, keyword) {
        //若搜索关键字与分类名称相同，则搜索相应分类，否则从文章标题和描述搜索关键字
        let tempIndex = -1;
        let mainTypeIndex = this.$store.getters['user/mainRouterIndex'](mainType);
        if (mainTypeIndex >= 0 && this.guestDate) {
          tempIndex = this.guestDate.router_type[mainTypeIndex].navInfo.findIndex(item => item.titleName === keyword);
        }
        if (tempIndex >= 0) {
          return await this.getArticleListDate({
            main_type: mainType,
            child_type: this.guestDate.router_type[mainTypeIndex].navInfo[tempIndex].titleRouter,
            perPageCount,
            page,
          });
        } else {
          return await this.getArticleListDate({
            main_type: mainType,
            keyword,
            perPageCount,
            page,
          });
        }
      },

      async clearSearch() {
        await this.clearSearchHistoryDate();
        await this.getSearchHistoryDate();
      },

      toArticlePath(id) {
        this.$router.push('/article/' + id);
      },

      getKeywordOnStart() {
        if (this.$route.query.keyword) {
          this.keyword = this.$route.query.keyword;
        }
      },

      setPerPageCount() {
        if (document.documentElement.clientWidth < 1024) {
          this.perPageCount = 4;
        }
        else if (document.documentElement.clientWidth > 1140) {
          this.perPageCount = 4;
        } else {
          this.perPageCount = 3;
        }
      },


    },
  }
</script>

<style lang="scss" scoped>
  @media screen and (min-width: 1140px) {
    .main {
      position: relative;
      margin: 0px auto;
      width: 1140px;

      .container {
        position: relative;
        padding-top: 60px;
        .content-box {
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          background: rgba(230, 230, 230, 1.0);
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
          .search-box {
            width: 100%;
            padding-bottom: 50px;
            background: rgba(210, 210, 210, 1.0);
            box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2) inset;
            .first-line, .second-line {
              padding-left: 20px;
              padding-right: 20px;
              padding-top: 10px;
              margin-top: 20px;
              width: 100%;
              display: flex;
              flex-wrap: nowrap;
              .title-text {
                width: 70px;
                font-size: 16px;
                font-weight: bold;
                line-height: 50px;
                white-space: nowrap;
              }
              .item-box {
                list-style: none;
                display: flex;
                flex-wrap: wrap;
                text-align: center;
                margin-left: 0px;
                padding-right: 50px;
                margin-top: 3px;
                .item, .item-option {
                  cursor: pointer;
                  font-size: 16px;
                  margin-top: 10px;
                  margin-left: 10px;
                  padding-left: 5px;
                  padding-right: 5px;
                  text-align: center;
                  line-height: 25px;
                  height: 25px;
                  border-radius: 4px;
                  transition: all .5s ease;
                  -webkit-transition: all .5s ease; /* Safari */
                  -moz-transition: all .5s ease;
                  -o-transition: all .5s ease;
                }
                .item {
                  background: rgba(230, 230, 230, 1.0);
                  &:hover {
                    background: rgba(240, 240, 240, 1.0);
                  }
                }
              }
            }
          }

          .result-box {
            width: 100%;
            align-items: center;
            .article-box, .media-box {
              width: 100%;
              margin: 50px auto;
              .title-text {
                margin-left: 2%;
                width: 100%;
                font-weight: bold;
                font-size: 16px;
              }
              .wrap {
                margin: 10px auto;
                width: 96%;
                list-style: none;
                display: flex;
                flex-wrap: nowrap;
                justify-content: space-between;
                .item {

                }
              }
              .empty {
                margin-left: 6%;
                width: 80%;
                font-size: 25px;
                font-weight: bold;
                text-align: center;
                color: rgba(20, 20, 20, 0.7);
              }
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 1024px) and (max-width: 1139.98px) {
    .main {
      position: relative;
      margin: 0px auto;
      width: 820px;

      .container {
        position: relative;
        padding-top: 60px;
        .content-box {
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          background: rgba(230, 230, 230, 1.0);
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
          .search-box {
            width: 100%;
            padding-bottom: 50px;
            background: rgba(210, 210, 210, 1.0);
            box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2) inset;
            .first-line, .second-line {
              padding-left: 20px;
              padding-right: 20px;
              padding-top: 10px;
              margin-top: 20px;
              width: 100%;
              display: flex;
              flex-wrap: nowrap;
              .title-text {
                width: 70px;
                font-size: 16px;
                font-weight: bold;
                line-height: 50px;
                white-space: nowrap;
              }
              .item-box {
                list-style: none;
                display: flex;
                flex-wrap: wrap;
                text-align: center;
                margin-left: 0px;
                padding-right: 50px;
                margin-top: 3px;
                .item, .item-option {
                  cursor: pointer;
                  font-size: 16px;
                  margin-top: 10px;
                  margin-left: 10px;
                  padding-left: 5px;
                  padding-right: 5px;
                  text-align: center;
                  line-height: 25px;
                  height: 25px;
                  border-radius: 4px;
                  transition: all .5s ease;
                  -webkit-transition: all .5s ease; /* Safari */
                  -moz-transition: all .5s ease;
                  -o-transition: all .5s ease;
                }
                .item {
                  background: rgba(230, 230, 230, 1.0);
                  &:hover {
                    background: rgba(240, 240, 240, 1.0);
                  }
                }
              }
            }
          }

          .result-box {
            width: 100%;
            align-items: center;
            .article-box, .media-box {
              width: 100%;
              margin: 50px auto;
              .title-text {
                margin-left: 2.5%;
                width: 100%;
                font-weight: bold;
                font-size: 16px;
              }
              .wrap {
                margin: 10px auto;
                width: 95%;
                list-style: none;
                display: flex;
                flex-wrap: nowrap;
                justify-content: space-between;
                .item {

                }
              }
              .empty {
                margin-left: 6%;
                width: 80%;
                font-size: 25px;
                font-weight: bold;
                text-align: center;
                color: rgba(20, 20, 20, 0.7);
              }
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 576px) and (max-width: 1023.98px) {
    .main {
      position: relative;
      margin: 0px auto;
      width: 575px;

      .container {
        position: relative;
        padding-top: 60px;
        .content-box {
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          background: rgba(230, 230, 230, 1.0);
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
          .search-box {
            width: 100%;
            padding-bottom: 50px;
            background: rgba(210, 210, 210, 1.0);
            box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2) inset;
            .first-line, .second-line {
              padding-left: 20px;
              padding-right: 20px;
              padding-top: 10px;
              margin-top: 20px;
              width: 100%;
              display: flex;
              flex-wrap: nowrap;
              .title-text {
                width: 70px;
                font-size: 16px;
                font-weight: bold;
                line-height: 50px;
                white-space: nowrap;
              }
              .item-box {
                list-style: none;
                display: flex;
                flex-wrap: wrap;
                text-align: center;
                margin-left: 0px;
                padding-right: 50px;
                margin-top: 3px;
                .item, .item-option {
                  cursor: pointer;
                  font-size: 16px;
                  margin-top: 10px;
                  margin-left: 10px;
                  padding-left: 5px;
                  padding-right: 5px;
                  text-align: center;
                  line-height: 25px;
                  height: 25px;
                  border-radius: 4px;
                  transition: all .5s ease;
                  -webkit-transition: all .5s ease; /* Safari */
                  -moz-transition: all .5s ease;
                  -o-transition: all .5s ease;
                }
                .item {
                  background: rgba(230, 230, 230, 1.0);
                  &:hover {
                    background: rgba(240, 240, 240, 1.0);
                  }
                }
              }
            }
          }

          .result-box {
            width: 100%;
            align-items: center;
            .article-box, .media-box {
              width: 100%;
              margin: 30px auto;
              .title-text {
                margin-left: 2.5%;
                width: 100%;
                font-weight: bold;
                font-size: 16px;
              }
              .wrap {
                margin: 0 auto;
                width: 95%;
                list-style: none;
                display: flex;
                flex: 2;
                flex-wrap: wrap;
                justify-content: space-between;
                .item {
                  margin-top: 20px;
                }
              }
              .empty {
                margin-left: 6%;
                width: 80%;
                font-size: 25px;
                font-weight: bold;
                text-align: center;
                color: rgba(20, 20, 20, 0.7);
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 575.98px) {
    .main {
      position: relative;
      margin: 0px auto;
      width: 100%;

      .container {
        position: relative;
        padding-top: 60px;
        .content-box {
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          background: rgba(230, 230, 230, 1.0);
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
          .search-box {
            width: 100%;
            padding-bottom: 50px;
            background: rgba(210, 210, 210, 1.0);
            box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2) inset;
            .first-line, .second-line {
              width: 100%;
              padding-left: 10px;
              padding-right: 10px;
              padding-top: 10px;
              margin-top: 20px;
              display: flex;
              flex-wrap: nowrap;
              .title-text {
                width: 70px;
                font-size: 16px;
                font-weight: bold;
                line-height: 50px;
                text-align: left;
                white-space: nowrap;
              }
              .item-box {
                list-style: none;
                display: flex;
                flex-wrap: wrap;
                text-align: center;
                margin-left: 0px;
                padding-right: 10px;
                margin-top: 3px;
                .item, .item-option {
                  cursor: pointer;
                  font-size: 16px;
                  margin-top: 10px;
                  margin-left: 7px;
                  padding-left: 5px;
                  padding-right: 5px;
                  text-align: center;
                  line-height: 25px;
                  height: 25px;
                  border-radius: 4px;
                  transition: all .5s ease;
                  -webkit-transition: all .5s ease; /* Safari */
                  -moz-transition: all .5s ease;
                  -o-transition: all .5s ease;
                }
                .item {
                  background: rgba(230, 230, 230, 1.0);
                  &:hover {
                    background: rgba(240, 240, 240, 1.0);
                  }
                }
              }
            }
          }

          .result-box {
            width: 100%;
            align-items: center;
            .article-box, .media-box {
              width: 100%;
              margin: 30px auto;
              .title-text {
                margin-left: 2.5%;
                width: 100%;
                font-weight: bold;
                font-size: 16px;
              }
              .wrap {
                width: 95%;
                margin: 0 auto;
                list-style: none;
                display: flex;
                flex: 1;
                flex-wrap: wrap;
                .item {
                  width: 100%;
                  margin-top: 20px;
                }
              }
              .empty {
                width: 80%;
                font-size: 25px;
                font-weight: bold;
                text-align: center;
                color: rgba(20, 20, 20, 0.7);
              }
            }
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  .page-container {
    padding-top: 30px;
    margin-left: -0.5%;
    width: 100%;
    .el-pagination {
      text-align: center;
      .el-pager {
        li:not(.disabled).active {

        }
      }
    }
  }
</style>
