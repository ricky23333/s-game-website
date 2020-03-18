<template>
  <section class="slide-nav-banner-container">
    <div class="slide-nav-banner-box">
      <div class="audio-player-box">
        <audio-player/>
        <!--<audio controls>-->
        <!--<source src="/static/test-audio/am-boy - Seaward Classic.mp3" type="audio/mp3">-->
        <!--</audio>-->
      </div>
      <div :class="toTopBtnFlag?'nav-totop-box-active':'nav-totop-box'">
        <el-tooltip content="回到顶部" placement="left" effect="light" :open-delay="2000">
          <div class="go-top" @click="backTop"><i class="icon el-icon-arrow-up"></i></div>
        </el-tooltip>
      </div>
      <div class="nav-banner-container">
        <div class="nav-banner-box">
          <el-tooltip content="掷个骰子" placement="top" effect="light" :open-delay="500"
                      v-if="this.$route.matched[0].name === '首页'||documentWidth>=1140">
            <div class="switch-bg-btn" id="switchBgBtn"
                 @click.stop="handleClickPublic">
              <i id="switchBgIcon" class="icon el-icon-refresh-right"></i>
            </div>
          </el-tooltip>

          <el-tooltip content="无障碍浏览" placement="top" effect="light" :open-delay="500">
            <div :class="showHelpToolsFlag? 'disabled-people-box-select': 'disabled-people-box'"
                 id="disabled-people-btn"
                 @click.stop="handleClickPublic">
              <i class="iconwuzhangai el-iconfont" id="disabled-people-btn-img"></i>
            </div>
          </el-tooltip>

          <el-tooltip content="简/繁体切换" placement="top" effect="light" :open-delay="500">
            <div class="languge-box" @click.stop="handleClickSwitchLanguge">
              <span v-if="isSimplified">繁</span>
              <span v-else>簡</span>
            </div>
          </el-tooltip>

          <el-tooltip content="分享" placement="top" effect="light">
            <div :class="shareFlag? 'share-box-select': 'share-box'" id="share-box-btn"
                 @click.stop="handleClickPublic">
              <i class="iconfenxiang3 el-iconfont" id="share-box-btn-img"></i>
              <div class="share-btn-list" v-if="shareFlag">
                <li v-for="(item,index) in  shareButtonList">
                  <div class="button-container" @click.stop="handleClickShareButton(index)">
                    <img v-lazy="item"/>
                  </div>
                </li>
              </div>
            </div>
          </el-tooltip>
        </div>
      </div>
      <div class="article-nav-container" v-if="isArticlePage&&articleNavDate&&articleNavDate.length>1">
        <div class="article-nav-box">
          <li @click.stop="handleClickArticleNavBtn(item)"
              :class="index===selectArticleNavIndex?'nav-item-select':'nav-item'"
              v-for="(item,index) in  articleNavDate">
            <div class="nav-bar">
            </div>
            <span> {{item.navName}}</span>
          </li>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import AudioPlayer from '../components/audio-player';

  export default {
    name: "slide-nav-banner",

    components: {
      AudioPlayer,
    },

    data() {
      return {
        shareFlag: false,
        toTopBtnFlag: false,
        selectArticleNavIndex: -1,
        articleScrollYPos: 0,
        scrollSpeed: 300,
        scrollInterval: 5,
        checkScrollFlag: false,  //检测scroll防抖

        shareButtonList: [
          'static/images/homepage/share_qq.svg',
          'static/images/homepage/share_qzone.svg',
          'static/images/homepage/share_weibo.svg',
        ],
      }
    },

    watch: {
      scrollToCommentFlag(val) {
        if (this.scrollToCommentFlag && this.articleNavDate[this.articleNavDate.length - 1].navId === 'commentBox1') {
          this.cancleScrollToCommentFlag();
          this.handleClickArticleNavBtn(this.articleNavDate[this.articleNavDate.length - 1]);
        }
      },
      '$route'(to, from) {

      },
    },

    computed: {
      ...mapState({
        articleNavDate: state => state.articleNavBar.articleNavElementIdList,
        scrollToCommentFlag: state => state.articleNavBar.scrollToCommentFlag,
        showHelpToolsFlag: state => state.helpTools.showFlag,
        isSimplified: state => state.translateLanguge.isSimplified,
        audioListDate: state => state.audio.audioListDate,
      }),

      isArticlePage() {
        return ((this.$route.matched[0].name === "媒体内容" || this.$route.matched[0].name === "日志内容") && this.$route.params.id) || this.$route.matched[0].name === "关于" || this.$route.matched[0].name === "隐私政策" || this.$route.matched[0].name === "用户协议";
      },
      documentWidth() {
        return document.documentElement.clientHeight;
      },
    },

    mounted() {
      window.addEventListener('scroll', this.handleScrollChange);
      document.addEventListener('click', this.handleClickPublic);
      let _that = this;
      setInterval(() => {
        _that.checkCurrentScroll();
      }, 100);
    },

    destroyed() {
      window.removeEventListener('scroll', this.handleScrollChange);
      document.removeEventListener('click', this.handleClickPublic);
    },

    methods: {
      ...
        mapActions({
          switchLangugeFlag: 'translateLanguge/switchLangugeFlag',
          translateText: 'translateLanguge/translateText',
          switchHelpToolFlag: 'helpTools/switchFlag',
          hideHelpToolFlag: 'helpTools/switchHideFlag',
          cancleScrollToCommentFlag: 'articleNavBar/cancleScrollToCommentFlag',
          switchBackgroundStars: 'user/switchBackgroundStars',
        }),

      handleClickArticleNavBtn(navDate) {
        const that = this;
        that.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        that.articleScrollYPos = document.getElementById(navDate.navId).offsetTop;
        let timer = setInterval(() => {
          if (that.scrollTop >= that.articleScrollYPos) {
            document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop - that.scrollSpeed;
          }
          else {
            document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + that.scrollSpeed;
          }
          if (Math.abs(that.articleScrollYPos - that.scrollTop) <= that.scrollSpeed) {
            document.documentElement.scrollTop = document.body.scrollTop = that.articleScrollYPos;
            clearInterval(timer);
            that.checkScrollFlag = true;
          }
        }, that.scrollInterval);
      },

      handleScrollChange() {
        this.checkScrollFlag = true;
      },

      // 点击图片回到顶部方法，加计时器是为了过渡顺滑
      backTop() {
        const that = this;
        that.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let timer = setInterval(() => {
          // let ispeed = Math.floor(-that.scrollTop / 5);
          document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop - that.scrollSpeed;
          if (that.scrollTop === 0) {
            clearInterval(timer);
          }
        }, that.scrollInterval);
      },

      checkCurrentScroll() {
        const that = this;
        if (!that.checkScrollFlag) return;
        // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
        that.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (that.scrollTop > 60) {
          that.toTopBtnFlag = true;
        } else {
          that.toTopBtnFlag = false;
        }

        if (that.isArticlePage && that.articleNavDate && that.articleNavDate.length > 1) {
          that.selectArticleNavIndex = -1;
          let tempIndex = -1;
          for (let i = 0; i < that.articleNavDate.length; i++) {
            let ele = document.getElementById(that.articleNavDate[i].navId);
            if (ele) {
              let navScrollTop = ele.offsetTop;
              if (that.scrollTop < navScrollTop) {
                tempIndex = i;
                break;
              }
            }
          }
          if (tempIndex < 0) {
            that.selectArticleNavIndex = that.articleNavDate.length - 1;
          } else {
            that.selectArticleNavIndex = tempIndex - 1;
          }
        }

        that.checkScrollFlag = false;
      },

      handleClickPublic(e) {
        const that = this;
        // 判断被点击的元素是不是aaa元素，不是的话，就隐藏之
        if (e.target.id === 'switchBgBtn' || e.target.id === 'switchBgIcon') {
          that.handleClickSwitchBackgroud();
          that.shareFlag = false;
        }
        else if (e.target.id === 'disabled-people-btn-img' || e.target.id === 'disabled-people-btn') {
          // this.$message('此功能暂未开放，敬请期待');
          that.switchHelpToolFlag();
          that.webchatFlag = that.shareFlag = false;
        }
        else if (e.target.id === 'share-box-btn-img' || e.target.id === 'share-box-btn') {
          that.shareFlag = !that.shareFlag;
          that.webchatFlag = false;
        }
        else {
          that.shareFlag = that.webchatFlag = false;
        }
        if (e && e.stopPropagation) {
          //因此它支持W3C的stopPropagation()方法
          e.stopPropagation();
        } else {
          //否则，我们需要使用IE的方式来取消事件冒泡
          window.event.cancelBubble = true;
        }
      },

      handleClickSwitchBackgroud() {
        this.switchBackgroundStars();
      },

      async handleClickSwitchLanguge() {
        await this.translateAllText();
        this.switchLangugeFlag();
      },

      async translateAllText(obj) {
        let stopDOM = ["BR", "TIME", "IMG", "CANVAS", "SCRIPT"];
        let childObjs = (obj ? obj : document.body).childNodes;
        if (!childObjs) return;
        for (let i = 0; i < childObjs.length; i++) {
          if (childObjs[i].nodeType === 3 && /[\u4e00-\u9fa5]/g.test(childObjs[i].textContent)) {
            childObjs[i].textContent = await this.translateText(childObjs[i].textContent);
          } else if (childObjs[i].nodeType === 1 && !stopDOM.includes(childObjs[i].tagName)) {
            this.translateAllText(childObjs[i]);
          }
        }
      },

      handleClickShareButton(index) {
        if (index === 0) {
          this.shareToQQ();
        } else if (index === 1) {
          this.shareToQzone();
        } else {
          this.shareToMicroblog();
        }
      },
      //分享到QQ好友(PC端可用)
      shareToQQ() {
        //此处分享链接内无法携带图片
        const share = {
          title: document.title,
          desc: "",
          share_url: window.location.href
        };
        location.replace(
          "https://connect.qq.com/widget/shareqq/index.html?url=" +
          encodeURIComponent(share.share_url) +
          "&title=" +
          share.title +
          "&desc=" +
          share.desc
        );
      },
      //分享到QQ空间(可用)
      shareToQzone() {
        //自定义内容
        const share = {
          title: document.title,
          desc: "",
          image_url: ["https://xxx.jpeg"],
          share_url: window.location.href
        };
        let image_urls = share.image_url.map(function (image) {
          return encodeURIComponent(image);
        });
        //跳转地址
        location.replace(
          "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" +
          encodeURIComponent(share.share_url) +
          "&title=" +
          share.title +
          "&pics=" +
          image_urls.join("|") +
          "&summary=" +
          share.desc
        );
      },
      //分享到微博(可用)
      shareToMicroblog() {
        //自定义内容
        const share = {
          title: document.title,
          // image_url: ["https://xxx.jpeg"],
          share_url: window.location.href
        };
        //跳转地址
        location.replace(
          "https://service.weibo.com/share/share.php?url=" +
          encodeURIComponent(share.share_url) +
          "&title=" +
          share.title +
          "&pic=" +
          share.image_url +
          "&searchPic=true"
        );
      },
    }
  }
</script>

<style lang="scss" scoped>
  @media screen and (min-width: 1140px) {
    .slide-nav-banner-box {
      position: fixed;
      right: 0.8rem;
      bottom: 1.3rem;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column-reverse;
      align-items: right;

      .audio-player-box {
        z-index: 5001;
        align-items: right;
        transition: all .5s ease;
        -webkit-transition: all .5s ease; /* Safari */
        -moz-transition: all .5s ease;
        -o-transition: all .5s ease;
      }

      .nav-totop-box, .nav-totop-box-active {
        opacity: 1;
        transition: all .5s ease;
        -webkit-transition: all .5s ease; /* Safari */
        -moz-transition: all .5s ease;
        -o-transition: all .5s ease;
        .go-top {
          float: right;
          margin-bottom: 20px;
          cursor: pointer;
          background-color: rgba(230, 230, 230, 1.0);
          color: rgba(100, 100, 100, .9);
          font-size: 30px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.4);
          border: 1px solid #EBEEF5;
          text-align: center;
          line-height: 50px;
          transition: all .5s ease;
          -webkit-transition: all .5s ease; /* Safari */
          -moz-transition: all .5s ease;
          -o-transition: all .5s ease;
          i {
            transition: all .5s ease;
            -webkit-transition: all .5s ease; /* Safari */
            -moz-transition: all .5s ease;
            -o-transition: all .5s ease;
          }
          &:hover {
            background-color: rgba(250, 250, 250, 1.0);
            color: rgba(20, 20, 20, .9);
          }
        }
      }

      .nav-totop-box {
        opacity: 0;
      }

      .nav-banner-container {
        width: 100%;
        .nav-banner-box {
          display: flex;
          flex-wrap: wrap;
          width: 50px;
          float: right;
          .switch-bg-btn, .disabled-people-box, .languge-box, .share-box, .disabled-people-box-select, .share-box-select {
            z-index: 5001;
            cursor: pointer;
            margin-bottom: 20px;
            background-color: rgba(230, 230, 230, 1.0);
            color: rgba(100, 100, 100, .9);
            font-size: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.4);
            border: 1px solid #EBEEF5;
            text-align: center;
            line-height: 50px;
            transition: all .5s ease;
            -webkit-transition: all .5s ease; /* Safari */
            -moz-transition: all .5s ease;
            -o-transition: all .5s ease;
            i {
              transition: all .5s ease;
              -webkit-transition: all .5s ease; /* Safari */
              -moz-transition: all .5s ease;
              -o-transition: all .5s ease;
            }
          }

          .switch-bg-btn, .disabled-people-box, .languge-box, .share-box {
            &:hover {
              background-color: rgba(250, 250, 250, 1.0);
              color: rgba(20, 20, 20, .9);
            }
          }

          .disabled-people-box-select, .share-box-select {
            background-color: rgba(255, 255, 255, 1.0);
            color: rgba(20, 20, 20, .9);
          }

          .disabled-people-box, .disabled-people-box-select {
            i {
              margin-left: -5px;
            }
          }

          .languge-box {
            font-size: 20px;
          }

          .share-box, .share-box-select {
            .share-btn-list {
              display: flex;
              flex-wrap: nowrap;
              list-style: none;
              background: rgba(250, 250, 250, 1.0);
              box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.2);
              width: 175px;
              height: 60px;
              margin-left: -185px;
              margin-top: -50px;
              align-items: center;
              .button-container {
                border-radius: 4px;
                background: rgba(220, 220, 220, 1.0);
                width: 45px;
                height: 45px;
                margin-left: 10px;
                &:hover {
                  background: rgba(230, 230, 230, 1.0);
                }
                img {
                  margin-top: 2px;
                  margin-left: 2px;
                  width: 40px;
                  height: 40px;
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;
                }
              }
            }
          }
        }
      }

      .article-nav-container {
        width: 100%;
        margin-bottom: 50px;
        .article-nav-box {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          .nav-item-select, .nav-item {
            width: 100%;
            color: rgba(230, 230, 230, 1.0);
            cursor: pointer;
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row-reverse;
            margin-top: 10px;
            padding-right: 15px;
            .nav-bar {
              border-radius: 50%;
              width: 15px;
              height: 15px;
              background: rgba(250, 250, 250, 0.5);
            }
            span {
              text-align: right;
              opacity: 0;
              width: 80%;
              margin-right: 10px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              transition: all .5s ease;
              -webkit-transition: all .5s ease;
              -moz-transition: all .5s ease;
              -o-transition: all .5s ease;
            }
            &:hover {
              span {
                opacity: 1;
              }
            }
          }

          .nav-item-select {
            .nav-bar {
              background: rgba(210, 230, 250, 1.0);
            }
          }
        }
      }

    }
  }

  @media screen and (min-width: 576px) and (max-width: 1139.98px) {
    .slide-nav-banner-box {
      position: fixed;
      right: 0.5rem;
      bottom: 1.3rem;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column-reverse;
      align-items: right;

      .audio-player-box {
        z-index: 5001;
        align-items: right;
        margin-left: 40px;
        transition: all .5s ease;
        -webkit-transition: all .5s ease; /* Safari */
        -moz-transition: all .5s ease;
        -o-transition: all .5s ease;
      }

      .nav-totop-box, .nav-totop-box-active {
        opacity: 1;
        transition: all .5s ease;
        -webkit-transition: all .5s ease; /* Safari */
        -moz-transition: all .5s ease;
        -o-transition: all .5s ease;
        .go-top {
          float: right;
          margin-bottom: 15px;
          cursor: pointer;
          background-color: rgba(230, 230, 230, 1.0);
          color: rgba(100, 100, 100, .9);
          font-size: 30px;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.4);
          border: 1px solid #EBEEF5;
          text-align: center;
          line-height: 45px;
          transition: all .5s ease;
          -webkit-transition: all .5s ease; /* Safari */
          -moz-transition: all .5s ease;
          -o-transition: all .5s ease;
          i {
            transition: all .5s ease;
            -webkit-transition: all .5s ease; /* Safari */
            -moz-transition: all .5s ease;
            -o-transition: all .5s ease;
          }
          &:hover {
            background-color: rgba(250, 250, 250, 1.0);
            color: rgba(20, 20, 20, .9);
          }
        }
      }

      .nav-totop-box {
        opacity: 0;
      }
      .nav-banner-container {
        width: 100%;
        .nav-banner-box {
          display: flex;
          flex-wrap: wrap;
          width: 45px;
          float: right;
          .switch-bg-btn, .disabled-people-box, .languge-box, .share-box, .disabled-people-box-select, .share-box-select {
            z-index: 5001;
            cursor: pointer;
            margin-bottom: 15px;
            background-color: rgba(230, 230, 230, 1.0);
            color: rgba(100, 100, 100, .9);
            font-size: 30px;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.4);
            border: 1px solid #EBEEF5;
            text-align: center;
            line-height: 45px;
            transition: all .5s ease;
            -webkit-transition: all .5s ease; /* Safari */
            -moz-transition: all .5s ease;
            -o-transition: all .5s ease;
            i {
              transition: all .5s ease;
              -webkit-transition: all .5s ease; /* Safari */
              -moz-transition: all .5s ease;
              -o-transition: all .5s ease;
            }
          }

          .switch-bg-btn, .disabled-people-box, .languge-box, .share-box {
            &:hover {
              background-color: rgba(250, 250, 250, 1.0);
              color: rgba(20, 20, 20, .9);
            }
          }

          .disabled-people-box-select, .share-box-select {
            background-color: rgba(255, 255, 255, 1.0);
            color: rgba(20, 20, 20, .9);
          }

          .disabled-people-box, .disabled-people-box-select {
            i {
              margin-left: -8px;
            }
          }

          .languge-box {
            font-size: 20px;
          }

          .share-box, .share-box-select {
            .share-btn-list {
              display: flex;
              flex-wrap: nowrap;
              list-style: none;
              background: rgba(250, 250, 250, 1.0);
              box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.2);
              width: 175px;
              height: 60px;
              margin-left: -185px;
              margin-top: -50px;
              align-items: center;
              .button-container {
                border-radius: 4px;
                background: rgba(220, 220, 220, 1.0);
                width: 45px;
                height: 45px;
                margin-left: 10px;
                &:hover {
                  background: rgba(230, 230, 230, 1.0);
                }
                img {
                  margin-top: 2px;
                  margin-left: 2px;
                  width: 40px;
                  height: 40px;
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;
                }
              }
            }
          }
        }
      }

      .article-nav-container {
        display: none;
      }

    }
  }

  @media screen and (max-width: 575.98px) {
    .slide-nav-banner-box {
      position: fixed;
      right: 0.2rem;
      bottom: 65px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column-reverse;
      align-items: right;

      .audio-player-box {
        z-index: 5001;
        align-items: right;
        margin-left: 50px;
        transition: all .5s ease;
        -webkit-transition: all .5s ease; /* Safari */
        -moz-transition: all .5s ease;
        -o-transition: all .5s ease;
      }

      .nav-totop-box, .nav-totop-box-active {
        opacity: 1;
        transition: all .5s ease;
        -webkit-transition: all .5s ease; /* Safari */
        -moz-transition: all .5s ease;
        -o-transition: all .5s ease;
        padding-right: 0px;
        .go-top {
          float: right;
          margin-bottom: 15px;
          cursor: pointer;
          background-color: rgba(230, 230, 230, 1.0);
          color: rgba(100, 100, 100, .9);
          font-size: 25px;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.4);
          border: 1px solid #EBEEF5;
          text-align: center;
          line-height: 35px;
          transition: all .5s ease;
          -webkit-transition: all .5s ease; /* Safari */
          -moz-transition: all .5s ease;
          -o-transition: all .5s ease;
          i {
            transition: all .5s ease;
            -webkit-transition: all .5s ease; /* Safari */
            -moz-transition: all .5s ease;
            -o-transition: all .5s ease;
          }
          &:hover {
            background-color: rgba(250, 250, 250, 1.0);
            color: rgba(20, 20, 20, .9);
          }
        }
      }

      .nav-totop-box {
        opacity: 0;
      }
      .nav-banner-container {
        width: 100%;
        .nav-banner-box {
          display: flex;
          flex-wrap: wrap;
          width: 35px;
          float: right;
          .switch-bg-btn, .disabled-people-box, .languge-box, .share-box, .disabled-people-box-select, .share-box-select {
            z-index: 5001;
            cursor: pointer;
            margin-bottom: 15px;
            background-color: rgba(230, 230, 230, 1.0);
            color: rgba(100, 100, 100, .9);
            font-size: 25px;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.4);
            border: 1px solid #EBEEF5;
            text-align: center;
            line-height: 35px;
            transition: all .5s ease;
            -webkit-transition: all .5s ease; /* Safari */
            -moz-transition: all .5s ease;
            -o-transition: all .5s ease;
            i {
              transition: all .5s ease;
              -webkit-transition: all .5s ease; /* Safari */
              -moz-transition: all .5s ease;
              -o-transition: all .5s ease;
            }
          }

          .switch-bg-btn, .disabled-people-box, .languge-box, .share-box {
            &:hover {
              background-color: rgba(250, 250, 250, 1.0);
              color: rgba(20, 20, 20, .9);
            }
          }

          .disabled-people-box-select, .share-box-select {
            background-color: rgba(255, 255, 255, 1.0);
            color: rgba(20, 20, 20, .9);
          }

          .disabled-people-box, .disabled-people-box-select {
            i {
              margin-left: -8px;
            }
          }

          .languge-box {
            font-size: 20px;
          }

          .share-box, .share-box-select {
            .share-btn-list {
              display: flex;
              flex-wrap: nowrap;
              list-style: none;
              background: rgba(250, 250, 250, 1.0);
              box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.2);
              width: 175px;
              height: 60px;
              margin-left: -185px;
              margin-top: -50px;
              align-items: center;
              .button-container {
                border-radius: 4px;
                background: rgba(220, 220, 220, 1.0);
                width: 45px;
                height: 45px;
                margin-left: 10px;
                &:hover {
                  background: rgba(230, 230, 230, 1.0);
                }
                img {
                  margin-top: 2px;
                  margin-left: 2px;
                  width: 40px;
                  height: 40px;
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;
                }
              }
            }
          }
        }
      }

      .article-nav-container {
        display: none;
      }

    }
  }
</style>
