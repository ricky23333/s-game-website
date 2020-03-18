<template>
  <div class="hot-list">
    <h1 class="hot-list-title">
      <i class="el-icon-menu el-iconfont"></i> 热门
    </h1>
    <ul class="hot-list-box" v-if="hotArticleList&&hotArticleList.length>0">
      <li v-for="(item, index) in hotArticleList"
          @click="toPathWithId(item)"
          class="hot-list-item"
          :key="index">
        <el-tooltip :content="item.title" placement="bottom" effect="dark" :open-delay="1000">
          <span>{{item.title}}</span>
        </el-tooltip>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      hotArticleList: {
        type: Array,
        required: true,
      },
    },

    methods: {
      toPathWithId(item) {
        this.$router.push('/' + item.main_type + '/' + item.id);
      },
    },
  }
</script>

<style lang="scss" scoped>

  @media screen and (min-width: 1140px) {
    .hot-list {
      width: 86%;
      margin-left: -17px;
      padding: 0 20px;
      background: rgba(245, 245, 245, 1.0);
      border-radius: 3px;

      .hot-list-title {
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
      .hot-list-box {
        margin-top: -10px;
        padding: 0px 0px 15px 0px;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        text-align: left;

        .hot-list-item {
          transition: all .5s ease;
          -webkit-transition: all .5s ease;
          -moz-transition: all .5s ease;
          -o-transition: all .5s ease;
          margin-left: 5px;
          margin-top: 5px;
          position: relative;
          padding-left: 5px;
          padding-right: 5px;
          height: 25px;
          width: 100%;
          overflow: hidden;
          cursor: pointer;
          font-size: 13px;
          line-height: 30px;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {

          }
          &:hover {
            color: rgba(0, 87, 160, 1.0);
          }
        }
      }
    }
  }

  @media screen and (min-width: 576px) and (max-width: 1139.98px) {
    .hot-list {
      width: 75%;
      margin-left: 8px;
      padding: 0 20px;
      background: rgba(245, 245, 245, 1.0);
      border-radius: 3px;

      .hot-list-title {
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
      .hot-list-box {
        margin-top: -10px;
        padding: 0px 0px 15px 0px;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        text-align: left;

        .hot-list-item {
          transition: all .5s ease;
          -webkit-transition: all .5s ease;
          -moz-transition: all .5s ease;
          -o-transition: all .5s ease;
          margin-left: 5px;
          margin-top: 5px;
          position: relative;
          padding-left: 5px;
          padding-right: 5px;
          height: 25px;
          width: 100%;
          overflow: hidden;
          cursor: pointer;
          font-size: 13px;
          line-height: 30px;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {

          }
          &:hover {
            color: rgba(0, 87, 160, 1.0);
          }
        }
      }
    }
  }

  @media screen and (max-width: 575.98px) {
    .hot-list {
      width: 75%;
      margin-left: 8px;
      padding: 0 20px;
      background: rgba(245, 245, 245, 1.0);
      border-radius: 3px;

      .hot-list-title {
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
      .hot-list-box {
        margin-top: -10px;
        padding: 0px 0px 15px 0px;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        text-align: left;

        .hot-list-item {
          transition: all .5s ease;
          -webkit-transition: all .5s ease;
          -moz-transition: all .5s ease;
          -o-transition: all .5s ease;
          margin-left: 5px;
          margin-top: 5px;
          position: relative;
          padding-left: 5px;
          padding-right: 5px;
          height: 25px;
          width: 100%;
          overflow: hidden;
          cursor: pointer;
          font-size: 13px;
          line-height: 30px;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {

          }
          &:hover {
            color: rgba(0, 87, 160, 1.0);
          }
        }
      }
    }
  }
</style>
