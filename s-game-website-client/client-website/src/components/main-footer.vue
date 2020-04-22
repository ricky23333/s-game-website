<template>
  <section class="footer-container" :style="isMobile?'height:'+footerWrapInsideHeight+'px;':''">
    <div class="footer-wrap-float"
         :style="isMobile?'position:absolute;'+'top:'+(fullHeight-60)+'px;'+'height:'+(footerWrapInsideHeight+60)+'px;':'bottom:'+expandHeight+'px;'+'height:'+footerWrapInsideHeight+'px;'"
         v-if="styleType===0">
      <footer class="footer-inner">
        <main-footer-info/>
      </footer>
    </div>
    <div v-else class="footer-wrap-inside" :style="'height:'+footerWrapInsideHeight+'px;'">
      <footer class="footer-inner">
        <main-footer-info/>
      </footer>
    </div>
  </section>
</template>

<script>
  import {mapState, mapAction} from 'vuex';
  import MainFooterInfo from '../components/main-footer-info';

  export default {
    name: "main-footer",
    components: {
      MainFooterInfo,
    },

    data() {
      return {
        isMobile: false,
        footerWrapInsideHeight: 385,
        expandMaxHeight: -385,
        expandSpeed: 80,
        expandHeight: -385,
        styleType: 0,//指示显示折叠样式或者正常样式
        // touchStartX: 0,
        // touchStartY: 0,
        // touchEndX: 0,
        // touchEndY: 0,
        resizeHeightFlag: false,
        fullHeight: document.documentElement.clientHeight,
      }
    },

    computed: {
      ...mapState({
        windowResizeFlag: state => state.user.windowResizeFlag,
      }),
    },

    watch: {
      '$route'(to, from) {
        let that = this;
        setTimeout(() => {
          that.checkStyleType();
        }, 100)
      },

      windowResizeFlag() {
        let that = this;
        setTimeout(() => {
          that.checkStyleType();
        }, 100)
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

    created() {

    },

    mounted() {
      this.isMobile = this.$store.getters['user/checkIsMobile'];
      if (this.isMobile) {
        // document.addEventListener('touchstart', this.handleTouchStart, true);
        // document.addEventListener('touchmove', this.handleTouchMove, true);
      } else {
        document.addEventListener('mousewheel', this.handleScroll, true) || document.addEventListener("DOMMouseScroll", this.handleScroll, false)
      }

      let that = this;
      setTimeout(() => {
        that.checkStyleType();
      }, 500)
    },

    destroyed() {
      this.isMobile = this.$store.getters['user/checkIsMobile'];
      if (this.isMobile) {
        // document.removeEventListener('touchstart', this.handleTouchStart, true);
        // document.removeEventListener('touchmove', this.handleTouchMove, true);
      } else {
        document.removeEventListener('mousewheel', this.handleScroll) || document.removeEventListener("DOMMouseScroll", this.handleScroll, false);
      }
    },

    methods: {
      handleScroll(e) {
        const that = this;
        if (e.wheelDelta > 0) {
          that.expandHeight -= this.expandSpeed;
        } else if (e.wheelDelta < 0) {
          that.expandHeight += this.expandSpeed;
        }
        if (this.expandHeight < this.expandMaxHeight) this.expandHeight = this.expandMaxHeight;
        if (this.expandHeight > 0) this.expandHeight = 0;
      },

      // handleExpandWithMobile(e) {
      //   this.isMobile = this.$store.getters['user/checkIsMobile'];
      //   if (this.isMobile) {
      //     if (this.expandHeight < 0) {
      //       this.expandHeight = 0;
      //     } else {
      //       if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      //         this.expandHeight = this.expandMaxHeight;
      //       }
      //     }
      //   }
      // },

      // handleTouchStart(e) {
      //   e.preventDefault();
      //   this.touchStartX = e.touches[0].pageX;
      //   this.touchStartY = e.touches[0].pageY;
      // },

      // handleTouchMove(e) {
      //   e.preventDefault();
      //   this.touchEndX = e.changedTouches[0].pageX;
      //   this.touchEndY = e.changedTouches[0].pageY;
      //   let xDis = this.touchEndX - this.touchStartX;
      //   let yDis = this.touchEndY - this.touchStartY;
      //   if (Math.abs(yDis) > Math.abs(xDis) && yDis > 0) {
      //     this.expandHeight -= this.expandSpeed;
      //   }
      //   else if (Math.abs(yDis) > Math.abs(xDis) && yDis < 0) {
      //     this.expandHeight += this.expandSpeed;
      //   }
      //   if (this.expandHeight < this.expandMaxHeight) this.expandHeight = this.expandMaxHeight;
      //   if (this.expandHeight > 0) this.expandHeight = 0;
      // },

      toPath(path) {
        this.$router.push(path);
      },

      checkStyleType() {
        this.styleType = 0;
        this.isMobile = this.$store.getters['user/checkIsMobile'];
        let isSmallScreen = window.matchMedia("(max-width: 575.98px)").matches;
        if (isSmallScreen) this.expandMaxHeight = -630;
        else this.expandMaxHeight = -385;
        if (this.isMobile) {
          if (this.$route.matched.length > 0 && this.$route.matched[0].name !== "首页") {
            this.styleType = 1;
          }
        }
        else {
          if (this.$route.params.id || (this.$route.matched.length > 0 && (this.$route.matched[0].name === "关于" || this.$route.matched[0].name === "404" || this.$route.matched[0].name === "搜索" || this.$route.matched[0].name === "用户协议" || this.$route.matched[0].name === "隐私政策"))) {
            this.styleType = 1;
          }
        }
        this.footerWrapInsideHeight = Math.abs(this.expandMaxHeight) + 60;
        this.expandHeight = this.expandMaxHeight;
      },
    },
  }
</script>

<style lang="scss" scoped>
  .footer-container {
    height: 100%;
    .footer-wrap-float {
      position: fixed;
      left: 0px;
      z-index: 9999;
      width: 100%;
      background: rgba(80, 80, 80, 1.0);
      box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2);
      transition: all .5s ease;
      -webkit-transition: all .5s ease; /* Safari */
      -moz-transition: all .5s ease;
      -o-transition: all .5s ease;
      .footer-inner {

      }
    }

    .footer-wrap-inside {
      position: relative;
      width: 100%;
      margin: 0px auto;
      background: rgba(80, 80, 80, 1.0);
      box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2);
      .footer-inner {

      }
    }
  }
</style>
