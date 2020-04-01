<template>
  <section class="article-list-content-container" :style="showRightPart?'height:'+(fullHeight-60)+'px;':''">
    <div class="article-list-content-box">
      <div class="left-box">
        <div class="article-box" v-if="articleList&&articleList.length > 0">
          <li class="article-item-container" v-for="(item, index) in articleList" :key="index"
              @click="toPath(item.id)">
            <article-banner :articleDate="item" :current-main-type="currentMainRouter"/>
          </li>
        </div>
        <div class="article-empty" v-else>暂无文章</div>

        <div class="pagination-container" v-if="pagination&&pagination.total_page_count>1">
          <Pagination :paginationDate="pagination" layouts="prev,pager,next" @changePage="changePage"/>
        </div>
      </div>

      <div class="right-box">
        <hot-list class="hot-list" :hot-article-list="hotArticleList"/>
        <child-type-list class="child-type-list"/>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex';
  import ChildTypeList from '../components/article-childtype-list';
  import HotList from '../components/article-hot-list';
  import ArticleBanner from '../components/article-banner';
  import Pagination from '../components/pagination';

  export default {
    components: {
      ArticleBanner,
      Pagination,
      ChildTypeList,
      HotList,
    },

    data() {
      return {
        fullHeight: document.documentElement.clientHeight >= 945 ? document.documentElement.clientHeight : 945,
        showRightPart: true,
      }
    },

    created() {
    },

    mounted() {
      this.getBodyFullHeight();
      this.checkShowRightPart();
    },

    watch: {
      '$route': function () {

      },

      windowResizeFlag() {
        this.getBodyFullHeight();
        this.checkShowRightPart();
      },

      fullHeight(val) {
        if (!this.resizeHeightFlag) {
          this.fullHeight = val
          this.resizeHeightFlag = true
          let that = this
          setTimeout(function () {
            that.resizeHeightFlag = false
          }, 400)
        }
      }
    },

    computed: {
      ...mapState({
        windowResizeFlag: state => state.user.windowResizeFlag,
      }),

      currentMainRouter() {
        return this.$route.path.split('/')[1];
      },
    },

    props: {
      articleList: {
        type: Array,
        required: true,
      },
      hotArticleList: {
        type: Array,
        required: true,
      },
      pagination: {
        required: true,
      },
    },

    methods: {
      changePage(page) {
        this.$emit('changePage', page);
      },

      toPath(id) {
        this.$emit('toPath', id);
      },

      getBodyFullHeight() {
        this.fullHeight = window.fullHeight = document.documentElement.clientHeight >= 945 ? document.documentElement.clientHeight : 945;
      },

      checkShowRightPart() {
        this.showRightPart = document.documentElement.clientWidth >= 1140;
      },
    }
  }
</script>

<style lang="scss" scoped>
  @media screen and (min-width: 1140px) {
    .article-list-content-container {
      width: 100%;
      margin-top: 60px;
      .article-list-content-box {
        margin: 0 auto;
        width: 1140px;
        height: 100%;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        background: rgba(230, 230, 230, 1.0);
        .left-box {
          width: 72%;
          display: flex;
          flex-wrap: wrap;

          border-right: 1px solid rgba(20, 20, 20, 0.1);
          .article-box {
            width: 100%;
            list-style: none;
            overflow: hidden;
            display: flex;
            flex-wrap: wrap;
            margin-left: -5px;
            .article-item-container {
              margin-left: 20px;
              margin-top: 20px;
            }
          }
          .article-empty {
            width: 100%;
            font-size: 25px;
            font-weight: bold;
            text-align: center;
            color: rgba(20, 20, 20, 0.7);
          }
          .pagination-container {
            margin-top: 10px;
          }
        }

        .right-box {
          width: 25%;
        }
      }
    }
  }

  @media screen and (min-width: 1024px) and (max-width: 1139.98px) {
    .article-list-content-container {
      height: auto;
      margin-top: 60px;
      .article-list-content-box {
        margin: 0 auto;
        width: 820px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column-reverse;
        background: rgba(230, 230, 230, 1.0);
        padding-bottom: 20px;
        .left-box {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          border-right: 1px solid rgba(20, 20, 20, 0.1);
          .article-box {
            width: 100%;
            list-style: none;
            overflow: hidden;
            display: flex;
            flex-wrap: wrap;
            margin-left: -5px;
            .article-item-container {
              margin-left: 20px;
              margin-top: 20px;
            }
          }
          .article-empty {
            width: 100%;
            font-size: 25px;
            font-weight: bold;
            text-align: center;
            color: rgba(20, 20, 20, 0.7);
          }
          .pagination-container {
            margin-top: 30px;
          }
        }

        .right-box {
          width: 100%;
          .hot-list {
            display: none;
          }

          .child-type-list {
            margin: 0 auto;
            width: 91%;
          }
        }
      }
    }
  }

  @media screen and (min-width: 576px) and (max-width: 1023.98px) {
    .article-list-content-container {
      height: auto;
      margin-top: 60px;
      .article-list-content-box {
        margin: 0 auto;
        width: 550px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column-reverse;
        background: rgba(230, 230, 230, 1.0);
        padding-bottom: 20px;
        .left-box {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          border-right: 1px solid rgba(20, 20, 20, 0.1);
          .article-box {
            width: 100%;
            list-style: none;
            overflow: hidden;
            display: flex;
            flex-wrap: wrap;
            margin-left: -5px;
            .article-item-container {
              margin-left: 20px;
              margin-top: 20px;
            }
          }
          .article-empty {
            width: 100%;
            font-size: 25px;
            font-weight: bold;
            text-align: center;
            color: rgba(20, 20, 20, 0.7);
          }
          .pagination-container {
            margin-top: 30px;
          }
        }

        .right-box {
          width: 100%;
          .hot-list {
            display: none;
          }

          .child-type-list {
            margin: 0 auto;
            width: 87%;
          }
        }
      }
    }
  }

  @media screen and (max-width: 575.98px) {
    .article-list-content-container {
      height: auto;
      margin-top: 60px;
      .article-list-content-box {
        margin: 0 auto;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column-reverse;
        background: rgba(230, 230, 230, 1.0);
        padding-bottom: 20px;
        .left-box {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          border-right: 1px solid rgba(20, 20, 20, 0.1);
          .article-box {
            width: 100%;
            list-style: none;
            overflow: hidden;
            display: flex;
            flex-wrap: wrap;

            .article-item-container {
              width: 100%;
              margin-left: 10px;
              margin-right: 10px;
              margin-top: 20px;
            }
          }
          .article-empty {
            width: 100%;
            font-size: 25px;
            font-weight: bold;
            text-align: center;
            color: rgba(20, 20, 20, 0.7);
          }
          .pagination-container {
            margin-top: 30px;
          }
        }

        .right-box {
          width: 100%;
          .hot-list {
            display: none;
          }

          .child-type-list {
            margin: 0 auto;
            width: 85%;
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  .pagination-container {
    margin: 0px auto;
    .el-pagination {
      .el-pager {
        li:not(.disabled).active {

        }
      }
    }
  }
</style>
