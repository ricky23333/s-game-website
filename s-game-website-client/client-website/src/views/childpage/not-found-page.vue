<template>
  <section class="not-found-container">
    <div class="not-found-wrap">
      <div class="title-1">404</div>
      <div class="link-box">
        <div class="title-2">无法在这找到任何信息,在你面前唯有虚空...</div>
        <div class="link" @click.stop="toPath('/')">返回首页</div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        mouseOverNav: false,
      }
    },

    created() {

    },

    mounted() {
    },

    computed: {},

    methods: {
      toPath(path) {
        this.$router.push(path);
      },
      // createNotFoundScript() {
      //   var script = document.createElement('script');
      //   script.type = 'text/javascript';
      //   script.src = '//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js';
      //   script.charset = 'utf-8';
      //   script.homePageUrl = 'App.vue';
      //   script.homePageName = '返回首页';
      //   console.log(script);
      //   // document.head.appendChild('<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="http://yoursite.com/yourPage.html" homePageName="回到我的主页"><script>');
      //   document.head.appendChild(script);
      // },
    },
  }
</script>

<style lang="scss" scoped>
  @media screen and (min-width: 1140px) {
    .not-found-container {
      font-family: Open Sans, Helvetica Neue, Arial, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
      width: 100%;
      overflow: hidden;
      padding-top: 60px;
      margin: 0px auto;
      align-items: center;
      .not-found-wrap {
        margin: 0px auto;
        padding-top: 220px;
        display: flex;
        flex-wrap: nowrap;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2) inset;
        width: 1140px;
        height: 500px;
        background: rgba(244, 244, 244, 1);
        text-align: center;
        font-weight: bold;
        line-height: 200px;

        .title-1 {
          width: 45%;
          font-size: 200px;
          text-align: center;
          font-weight: bold;
          color: #b91d1f;
        }

        .link-box {
          width: 50%;
          display: flex;
          flex-wrap: wrap;

          .title-2 {
            margin-top: -50px;
            width: 100%;
            height: 40px;
            font-size: 26px;
          }

          .link {
            margin-left: 35px;
            margin-top: -100px;
            text-align: center;
            cursor: pointer;
            width: 100px;
            height: 30px;
            line-height: 30px;
            font-size: 16px;
            color: rgba(240, 240, 240, 1.0);
            background: #b91d1f;
            border-radius: 5px;
            transition: all .5s ease;
            -webkit-transition: all .5s ease; /* Safari */
            -moz-transition: all .5s ease;
            -o-transition: all .5s ease;
            &:hover {
              color: rgba(255, 255, 255, 1.0);
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1139.98px) {
    .not-found-container {
      font-family: Open Sans, Helvetica Neue, Arial, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
      width: 100%;
      overflow: hidden;
      padding-top: 60px;
      margin: 0px auto;
      align-items: center;
      .not-found-wrap {
        margin: 0px auto;

        display: flex;
        flex-wrap: wrap;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2) inset;
        width: 100%;
        height: 500px;
        background: rgba(244, 244, 244, 1);
        text-align: center;
        font-weight: bold;

        .title-1 {
          width: 100%;
          font-size: 150px;
          text-align: center;
          font-weight: bold;
          color: #b91d1f;
          line-height: 200px;
        }

        .link-box {
          margin-top: -120px;
          width: 100%;
          display: flex;
          flex-wrap: wrap;

          .title-2 {
            width: 100%;
            margin: 0 auto;
            font-size: 26px;
            text-align: center;
            padding-left: 15px;
            padding-right: 10px;
          }

          .link {
            margin: 0 auto;
            text-align: center;
            cursor: pointer;
            width: 120px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            color: rgba(240, 240, 240, 1.0);
            background: #b91d1f;
            border-radius: 5px;
            transition: all .5s ease;
            -webkit-transition: all .5s ease; /* Safari */
            -moz-transition: all .5s ease;
            -o-transition: all .5s ease;
            &:hover {
              color: rgba(255, 255, 255, 1.0);
            }
          }
        }
      }
    }
  }
</style>
