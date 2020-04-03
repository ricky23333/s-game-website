<template>
  <section class="header">
    <VActivityBox v-if="guestDate&&showActivityFlag" :activity-type="guestDate.activity_type"/>

    <header class="header-box" v-if="guestDate">
      <section class="top-banner-homepage" v-if="currentMainRouter==='homepage'">
        <div class="search-container">
          <search @clickOnSearch="handleClickSearchBtn"></search>
        </div>
      </section>

      <section v-else-if="currentMainRouter!=='search'" class="top-banner-nav">
        <div class="main-banner">
          <div :class="mobileNavExpandFlag?'mobile-nav-expand-btn-select':'mobile-nav-expand-btn'"
               @click="handleClickMobileNavExpandBtn"><i
            class="iconicon- el-iconfont"></i>
          </div>
          <div :class="mobileNavExpandFlag?'nav-list-expand':'nav-list'">
            <div class="nav-box" :key="selectNavIndex">
              <li v-for="(item,index) in guestDate.router_type"
                  @click="changeNav($event,index,item.tab_name)" :key="index"
                  :class="selectNavIndex ===index?'nav-item-active':'nav-item'">
                <div class="nav-text"> {{item.tab_name}}</div>
                <div class="select-line"></div>
              </li>
            </div>
          </div>
          <div v-if="mobileNavExpandFlag" @click.stop="handleClickMobileNavExpandBtn"
               class="nav-list-expand-mask"></div>
        </div>


        <div class="game-logo" @click.stop="toPath('/')"><img v-lazy="'static/images/homepage/game-logo.png'"
                                                              alt="LOGO"></div>

        <div class="search-container">
          <search @clickOnSearch="handleClickSearchBtn"></search>
        </div>
      </section>

      <section v-else class="top-banner-search">
        <i id="searchBtn1" class="el-icon-search" @click.stop="toSearchPath(keyword)"></i>
        <input
          placeholder="请输入搜索内容"
          maxlength="16"
          @keyup.enter="toSearchPath(keyword)"
          v-model="keyword"
        />
        <div @click.stop="toSearchPath(keyword)">搜索</div>
        <i id="searchBtn2" class="icon el-icon-close" @click.stop="handleCloseSearch"></i>
      </section>
    </header>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import VActivityBox from '../views/childpage/activity-box';
  import Search from '../components/search';

  export default {
    name: "main-header",

    components: {
      VActivityBox,
      Search,
    },

    data() {
      return {
        mobileNavExpandFlag: false,
        keyword: '',
        selectNavIndex: 0,
        homepageNavIndex: 0,
      }
    },

    created() {
      this.getGuestInfo();
      this.getKeywordOnStart();
    },

    mounted() {
      window.onresize = () => {
        return (() => {
          this.$store.state.user.windowResizeFlag = !this.$store.state.user.windowResizeFlag;
        })()
      }
    },

    destroyed() {

    },

    watch: {
      '$route'(to, from) {
        if (this.mobileNavExpandFlag) this.mobileNavExpandFlag = false;
        this.setDocumentTitle();
        this.getKeywordOnStart();
      },
    },

    computed: {
      ...mapState({
        guestDate: state => state.user.guestDate,
        showActivityFlag: state => state.user.showActivityFlag,
      }),

      currentMainRouter() {
        return this.$route.path.split('/')[1];
      },

      currentChildRouter() {
        return this.$route.path.split('/')[2];
      },

      mainRouterIndex() {
        return this.$store.getters['user/mainRouterIndex'](this.currentMainRouter);
      },
    },
    methods: {
      ...mapActions({
        getGuestDate: 'user/getUserDate',
        setSearchHistoryDate: 'user/setSearchHistoryDate',
      }),

      //切换导航栏标签
      changeNav(e, newIndex, tabName) {
        let path = '/';
        if (newIndex < this.guestDate.router_type.length) {
          path += this.guestDate.router_type[newIndex].router_name;
        }
        this.selectNavIndex = newIndex;
        this.toPath(path);
      },

      //页面刷新时从服务器获取访客信息
      async getGuestInfo() {
        await this.getGuestDate();
        this.setDocumentTitle();
      },

      //路由跳转
      toPath(path) {
        this.$router.push(path);
      },

      setDocumentTitle() {
        let num = this.mainRouterIndex;
        this.selectNavIndex = num;
        if (num >= 0) document.title = this.guestDate.router_type[num].tab_name;
        else document.title = 'StellarBug';
      },

      async handleClickSearchBtn(tempKeyword) {
        await this.setSearchHistoryDate(tempKeyword);
        this.$router.push({
          path: '/search',
          query:
            {
              keyword: tempKeyword,
              historyPathInfo: this.$route.path,
            }
        });
      },

      //搜索文章,返回文章列表
      async toSearchPath(tempKeyword) {
        await this.setSearchHistoryDate(tempKeyword);
        this.$router.push({
          path: '/search',
          query:
            {
              keyword: tempKeyword,
            }
        });
      },

      getKeywordOnStart() {
        if (this.$route.query.keyword) {
          this.keyword = this.$route.query.keyword;
        }
      },

      handleCloseSearch() {
        if (this.$route.query.historyPathInfo) {
          this.$router.push(this.$route.query.historyPathInfo);
        } else {
          this.$router.push('/');
        }
      },

      handleClickMobileNavExpandBtn() {
        this.mobileNavExpandFlag = !this.mobileNavExpandFlag;
      },
    },
  }
</script>

<style lang="scss" scoped>
  @media screen and (min-width: 1140px) {
    .header {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      height: 60px;
      z-index: 1000;
      .header-box {
        width: 100%;
        height: 100%;
        .top-banner-homepage, .top-banner-nav {
          width: 100%;
          height: 100%;
          display: flex;
          flex-wrap: nowrap;
          font-size: 22px;
          color: rgba(250, 250, 250, .6);
          justify-content: space-between;
        }

        .top-banner-nav {
          background: rgba(0, 0, 0, 0.5);
          box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.4);

          .main-banner {
            width: 20%;
            min-width: 300px;
            .mobile-nav-expand-btn {
              display: none;
            }
            .nav-list {
              .nav-box {
                margin-top: 17px;
                display: flex;
                flex-wrap: nowrap;
                .nav-item-active, .nav-item {
                  margin-left: 20px;
                  list-style: none;
                  cursor: pointer;

                  &:hover {
                    color: rgba(255, 255, 250, .75);
                  }
                }
                .nav-item-active {
                  color: rgba(255, 255, 250, .9);
                  font-weight: bold;
                  .select-line {
                    margin-top: 17px;
                    display: block;
                    background: rgba(250, 250, 250, .6);
                    height: 2px;
                  }
                }
                .nav-item {
                  .select-line {
                    display: none;
                  }
                }
              }
            }
          }

          .game-logo {
            margin-left: 55px;
            img {
              width: 228px;
              height: 41px;
              position: relative;
              margin: 15px auto;
            }
          }

          .search-container {
            margin-right: 55px;
            width: 20%;
            margin-top: 20px;
          }
        }

        .top-banner-homepage {
          font-size: 24px;
          .search-container {
            width: 100%;
            height: 60px;
            position: absolute;
            right: 55px;
            top: 20px;
            align-items: right;
          }
        }

        .top-banner-search {
          width: 100%;
          height: 60px;
          color: rgba(20, 20, 20, 0.75);
          background: rgba(240, 240, 240, 1.0);
          box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
          i {
            cursor: pointer;
            font-weight: bold;
            font-size: 30px;
            line-height: 60px;
            transition: all .5s ease;
            -webkit-transition: all .5s ease; /* Safari */
            -moz-transition: all .5s ease;
            -o-transition: all .5s ease;
            &:hover {
              color: rgba(0, 0, 0, .95);
            }
          }

          input {
            width: 90%;
            font-size: 18px;
            margin-left: 25px;
            outline-style: none;
            border: 0px;
            background-color: rgba(0, 0, 0, 0);
          }

          div {
            cursor: pointer;
            font-size: 18px;
            line-height: 60px;
            transition: all .5s ease;
            -webkit-transition: all .5s ease; /* Safari */
            -moz-transition: all .5s ease;
            -o-transition: all .5s ease;
            font-weight: bold;
            width: 120px;
            text-align: center;
            &:hover {
              color: rgba(0, 0, 0, .95);
            }
          }
          #searchBtn1 {
            padding-left: 20px;
          }
          #searchBtn2 {
            padding-right: 20px;
          }
        }
      }
    }
  }

  @media screen and (min-width: 576px) and (max-width: 1139.98px) {
    .header {
      width: 100%;
      position: fixed;
      left: 0;
      top: 0;
      height: 1.1rem;
      z-index: 1000;
      .header-box {
        width: 100%;
        height: 100%;
        .top-banner-homepage, .top-banner-nav {
          width: 100%;
          height: 100%;
          overflow: hidden;
          display: flex;
          flex-wrap: nowrap;
          font-size: 0.5rem;
          color: rgba(250, 250, 250, .6);
          justify-content: space-between;
        }

        .top-banner-nav {
          background: rgba(10, 10, 10, 0.9);
          box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.4);

          .main-banner {
            left: 0;
            position: absolute;
            width: 2rem;
            height: 100%;
            .mobile-nav-expand-btn, .mobile-nav-expand-btn-select {
              padding-top: 10px;
              align-items: center;
              text-align: center;
              width: 2rem;
              display: block;
              font-size: 0.6rem;
              transition: color .5s ease;
              -webkit-transition: color .5s ease; /* Safari */
              -moz-transition: color .5s ease;
              -o-transition: color .5s ease;
            }

            .mobile-nav-expand-btn-select {
              color: rgba(255, 255, 255, 1.0);
            }

            .nav-list, .nav-list-expand {
              z-index: 1000;
              top: 1.1rem;
              font-size: 0.5rem;
              overflow: hidden;
              text-align: center;
              position: fixed;
              left: 0;
              width: 2rem;
              height: 100%;
              background: rgba(40, 40, 40, 1.0);
              box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.4);
              transition: all .25s ease;
              -webkit-transition: all .25s ease; /* Safari */
              -moz-transition: all .25s ease;
              -o-transition: all .25s ease;
              .nav-box {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                .nav-item-active, .nav-item {
                  width: 100%;
                  margin-top: 0.5rem;
                  list-style: none;
                  cursor: pointer;
                  display: flex;
                  flex-wrap: nowrap;
                  .nav-text {
                    width: 98%;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                  &:hover {
                    color: rgba(255, 255, 250, .75);
                  }
                }
                .nav-item-active {
                  color: rgba(255, 255, 250, .9);
                  font-weight: bold;
                  .select-line {
                    width: 2px;
                    display: block;
                    background: rgba(250, 250, 250, .6);
                    height: 100%;
                  }
                }
                .nav-item {
                  .select-line {
                    display: none;
                  }
                }
              }
            }

            .nav-list {
              width: 0;
            }

            .nav-list-expand-mask {
              background: rgba(20,20,20,0.5);
              position: absolute;
              width: 100vw;
              height: 100vh;
            }
          }

          .game-logo {
            position: relative;
            margin: 0px auto;
            align-items: center;
            img {
              width: 228px;
              height: 41px;
              position: relative;
              margin: 15px auto;
            }
          }

          .search-container {
            position: fixed;
            right: 40px;
            width: 20%;
            top: 15px;
          }
        }

        .top-banner-homepage {
          font-size: 24px;
          .search-container {
            right: 40px;
            top: 20px;
            width: 100%;
            height: 60px;
            position: absolute;
            align-items: right;
          }
        }

        .top-banner-search {
          width: 100%;
          height: 60px;
          color: rgba(20, 20, 20, 0.75);
          background: rgba(240, 240, 240, 1.0);
          box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
          i {
            cursor: pointer;
            font-weight: bold;
            font-size: 30px;
            line-height: 60px;
            transition: all .5s ease;
            -webkit-transition: all .5s ease; /* Safari */
            -moz-transition: all .5s ease;
            -o-transition: all .5s ease;
            &:hover {
              color: rgba(0, 0, 0, .95);
            }
          }

          input {
            width: 90%;
            font-size: 18px;
            margin-left: 25px;
            outline-style: none;
            border: 0px;
            background-color: rgba(0, 0, 0, 0);
          }

          div {
            cursor: pointer;
            font-size: 18px;
            line-height: 60px;
            transition: all .5s ease;
            -webkit-transition: all .5s ease; /* Safari */
            -moz-transition: all .5s ease;
            -o-transition: all .5s ease;
            font-weight: bold;
            width: 120px;
            text-align: center;
            &:hover {
              color: rgba(0, 0, 0, .95);
            }
          }
          #searchBtn1 {
            padding-left: 20px;
          }
          #searchBtn2 {
            padding-right: 20px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 575.98px) {
    .header {
      width: 100%;
      position: fixed;
      left: 0;
      top: 0;
      height: 60px;
      z-index: 1000;
      .header-box {
        width: 100%;
        height: 100%;
        .top-banner-homepage, .top-banner-nav {
          width: 100%;
          height: 100%;
          overflow: hidden;
          display: flex;
          flex-wrap: nowrap;
          font-size: 20px;
          color: rgba(250, 250, 250, .6);
          justify-content: space-between;
        }

        .top-banner-nav {
          background: rgba(10, 10, 10, 0.9);
          box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.4);

          .main-banner {
            left: 0;
            position: absolute;
            width: 60px;
            height: 60px;
            .mobile-nav-expand-btn, .mobile-nav-expand-btn-select {
              padding-top: 15px;
              align-items: center;
              text-align: center;
              width: 60px;
              display: block;
              font-size: 22px;
              transition: color .5s ease;
              -webkit-transition: color .5s ease; /* Safari */
              -moz-transition: color .5s ease;
              -o-transition: color .5s ease;
            }

            .mobile-nav-expand-btn-select {
              color: rgba(255, 255, 255, 1.0);
            }

            .nav-list, .nav-list-expand {
              z-index: 1000;
              top: 60px;
              font-size: 22px;
              overflow: hidden;
              text-align: center;
              position: fixed;
              left: 0;
              width: 60px;
              height: 100%;
              background: rgba(40, 40, 40, 1.0);
              box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
              transition: all .25s ease;
              -webkit-transition: all .25s ease; /* Safari */
              -moz-transition: all .25s ease;
              -o-transition: all .25s ease;
              .nav-box {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                .nav-item-active, .nav-item {
                  width: 100%;
                  margin-top: 20px;
                  list-style: none;
                  cursor: pointer;
                  display: flex;
                  flex-wrap: nowrap;
                  .nav-text {
                    width: 98%;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                  &:hover {
                    color: rgba(255, 255, 250, .75);
                  }
                }
                .nav-item-active {
                  color: rgba(255, 255, 250, .9);
                  font-weight: bold;
                  .select-line {
                    width: 2px;
                    display: block;
                    background: rgba(250, 250, 250, .6);
                    height: 100%;
                  }
                }
                .nav-item {
                  .select-line {
                    display: none;
                  }
                }
              }
            }

            .nav-list {
              width: 0;
            }

            .nav-list-expand-mask {
              background: rgba(20,20,20,0.5);
              position: absolute;
              width: 100vw;
              height: 100vh;
            }
          }

          .game-logo {
            position: relative;
            margin: 0 auto;
            align-items: center;
            img {
              width: 120px;
              height: auto;
              position: relative;
              margin: 22px auto;
            }
          }

          .search-container {
            position: fixed;
            right: 15px;
            width: 20%;
            top: 20px;
          }
        }

        .top-banner-homepage {
          width: 100%;
          font-size: 24px;
          .search-container {
            width: 100%;
            height: 60px;
            position: absolute;
            right: 0.3rem;
            top: 20px;
            align-items: right;
          }
        }

        .top-banner-search {
          width: 100%;
          height: 60px;
          color: rgba(20, 20, 20, 0.75);
          background: rgba(240, 240, 240, 1.0);
          box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
          i {
            cursor: pointer;
            font-weight: bold;
            font-size: 30px;
            line-height: 60px;
            transition: all .5s ease;
            -webkit-transition: all .5s ease; /* Safari */
            -moz-transition: all .5s ease;
            -o-transition: all .5s ease;
            &:hover {
              color: rgba(0, 0, 0, .95);
            }
          }

          input {
            width: 90%;
            font-size: 18px;
            margin-left: 25px;
            outline-style: none;
            border: 0px;
            background-color: rgba(0, 0, 0, 0);
          }

          div {
            cursor: pointer;
            font-size: 18px;
            line-height: 60px;
            transition: all .5s ease;
            -webkit-transition: all .5s ease; /* Safari */
            -moz-transition: all .5s ease;
            -o-transition: all .5s ease;
            font-weight: bold;
            width: 120px;
            text-align: center;
            &:hover {
              color: rgba(0, 0, 0, .95);
            }
          }
          #searchBtn1 {
            padding-left: 20px;
          }
          #searchBtn2 {
            padding-right: 20px;
          }
        }
      }
    }
  }
</style>

//修改子组件样式
<style lang="scss">
  .header-box * {
    font-family: 'Ipix';
  }
</style>
