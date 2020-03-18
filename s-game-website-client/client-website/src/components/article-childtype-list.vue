<template>
  <div class="child-type">
    <h1 class="child-type-title">
      <i class="iconjurassic_label el-iconfont"></i> 分类
    </h1>
    <div class="child-type-box" v-if="guestDate">
      <!--<li class="child-type-item" @click="toPath('/' + this.guestDate.router_type[index].router_name)"><i class="icon el-icon-collection-tag"></i> 全部-->
      <!--</li>-->
      <li v-for="(item, index) in guestDate.router_type[mainRouterIndex].navInfo"
          @click="searchArticleWithChildType(item.titleName)"
          class="child-type-item"
          :key="index">
        <i class="icon el-icon-collection-tag"></i>
        {{item.titleName}}
      </li>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex';
  import merge from 'webpack-merge';

  export default {
    data() {
      return {
        list: []
      }
    },
    computed: {
      ...mapState({
        guestDate: state => state.user.guestDate,
      }),

      currentMainRouter() {
        return this.$route.path.split('/')[1];
      },

      mainRouterIndex() {
        return this.$store.getters['user/mainRouterIndex'](this.currentMainRouter);
      },
    },
    created() {

    },
    methods: {
      ...mapActions({
        getArticleList: 'article/getArticleList',
        setSearchHistoryDate: 'user/setSearchHistoryDate',
      }),

      async searchArticleWithChildType(newType) {
        await this.setSearchHistoryDate(newType);
        this.$router.push({
          path: '/search',
          query:
            {
              keyword: newType,
              historyPathInfo: this.$route.path,
            }
        });
      },

      // 路由跳转
      toPath(path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style scoped lang="scss">
  @media screen and (min-width: 1140px) {
    .child-type {
      width: 86%;
      padding: 0 20px;
      margin-left: -17px;
      background: rgba(245, 245, 245, 1.0);
      border-radius: 3px;

      .child-type-title {
        display: flex;
        align-items: center;
        color: #464c5b;
        font-size: 15px;
        padding: 10px 0;
        border-bottom: 1px solid rgba(20, 20, 20, 0.1);
        i {
          color: rgba(0, 87, 160, 1.0);
          margin-right: 8px;
          font-size: 22px;
        }
      }
      .child-type-box {
        margin-top: -10px;
        padding: 0px 0px 15px 0px;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        text-align: center;

        .child-type-item {
          transition: all .5s ease;
          -webkit-transition: all .5s ease;
          -moz-transition: all .5s ease;
          -o-transition: all .5s ease;
          margin-left: 5px;
          margin-top: 5px;
          position: relative;
          cursor: pointer;
          font-size: 13px;
          padding-left: 5px;
          padding-right: 5px;
          height: 25px;
          line-height: 25px;
          color: rgba(250, 250, 250, 1.0);
          background: rgba(0, 87, 160, 1.0);
          border-radius: 2px;
          &:hover {
            background: #409EFF;
          }
        }
      }
    }
  }

  @media screen and (min-width: 576px) and (max-width: 1139.98px) {
    .child-type {
      width: 100%;
      padding: 0 20px;
      margin-left: 8px;
      background: rgba(245, 245, 245, 1.0);
      border-radius: 3px;

      .child-type-title {
        display: flex;
        align-items: center;
        color: #464c5b;
        font-size: 15px;
        padding: 10px 0;
        border-bottom: 1px solid rgba(20, 20, 20, 0.1);
        i {
          color: rgba(0, 87, 160, 1.0);
          margin-right: 8px;
          font-size: 22px;
        }
      }
      .child-type-box {
        margin-top: -10px;
        padding: 0px 0px 15px 0px;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        text-align: center;

        .child-type-item {
          transition: all .5s ease;
          -webkit-transition: all .5s ease;
          -moz-transition: all .5s ease;
          -o-transition: all .5s ease;
          margin-left: 5px;
          margin-top: 5px;
          position: relative;
          cursor: pointer;
          font-size: 13px;
          padding-left: 5px;
          padding-right: 5px;
          height: 25px;
          line-height: 25px;
          color: rgba(250, 250, 250, 1.0);
          background: rgba(0, 87, 160, 1.0);
          border-radius: 2px;
          &:hover {
            background: #409EFF;
          }
        }
      }
    }
  }

  @media screen and (max-width: 575.98px) {
    .child-type {
      width: 100%;
      padding: 0 20px;
      margin-left: 8px;
      background: rgba(245, 245, 245, 1.0);
      border-radius: 3px;

      .child-type-title {
        display: flex;
        align-items: center;
        color: #464c5b;
        font-size: 15px;
        padding: 10px 0;
        border-bottom: 1px solid rgba(20, 20, 20, 0.1);
        i {
          color: rgba(0, 87, 160, 1.0);
          margin-right: 8px;
          font-size: 22px;
        }
      }
      .child-type-box {
        margin-top: -10px;
        padding: 0px 0px 15px 0px;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        text-align: center;

        .child-type-item {
          transition: all .5s ease;
          -webkit-transition: all .5s ease;
          -moz-transition: all .5s ease;
          -o-transition: all .5s ease;
          margin-left: 5px;
          margin-top: 5px;
          position: relative;
          cursor: pointer;
          font-size: 13px;
          padding-left: 5px;
          padding-right: 5px;
          height: 25px;
          line-height: 25px;
          color: rgba(250, 250, 250, 1.0);
          background: rgba(0, 87, 160, 1.0);
          border-radius: 2px;
          &:hover {
            background: #409EFF;
          }
        }
      }
    }
  }
</style>
