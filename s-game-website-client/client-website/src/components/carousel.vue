//图片轮播图组件
<template>
  <section class="carousel-wrap">
    <div class="carousel-box" v-if="img_date_ary&&img_date_ary.length>0" @mouseenter.stop="onMouseEnterBox"
         @mouseleave.stop="onMouseLeaveBox">
      <div class="img-box">
        <img v-lazy="img_date_ary[currentImgIndex].image_url"
             :key="img_date_ary[currentImgIndex].image_url"
        />
      </div>
      <div class="other-item-box">
        <div class="btn-box"
             @click.stop="clickOnImg()">
          <div v-if="img_date_ary.length>1" :class="(this.$store.getters['user/checkIsMobile']||isMouseOver)?'prepage-btn':'prepage-btn--hide'"
               @click.stop="goPrePage">
            &lt;
          </div>
          <div v-if="img_date_ary.length>1" :class="(this.$store.getters['user/checkIsMobile']||isMouseOver)?'nextpage-btn':'nextpage-btn--hide'"
               @click.stop="goNextPage">
            &gt;
          </div>
        </div>

        <div class="bottom-banner">
          <span
            class="bottom-banner-text-normal"
            @click.stop="clickOnImg()">
            {{img_date_ary[currentImgIndex].image_describe}}</span>
          <ul class="bottom-banner-buttons">
            <li v-for="(item,index) in img_date_ary" :class="currentImgIndex===index?'button--active':'button'"
                @click.stop="switchPage(index)" :key="index">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "carousel",
    data() {
      return {
        currentImgIndex: 0,//当前显示图片索引
        timer: null,//定时器
        isMouseOver: false,//鼠标是否经过轮播图区域
        activePrePageButtonStyle: '',//鼠标经过时换页按钮样式
        activeNextPageButtonStyle: '',//鼠标经过时换页按钮样式
        timerInteval: 5000,
      }
    },

    props: {
      img_date_ary: {
        type: Array,
        required: true,
      }
    },

    mounted() {
      this.startAutoPlay();
    },

    computed: {

    },

    created() {

    },

    updated: function () {

    },

    methods: {
      onMouseEnterBox: function () {
        let that = this;
        that.isMouseOver = true;
        if (that.timer) {
          clearInterval(that.timer);
        }
      },

      onMouseLeaveBox: function (evt) {
        let that = this;
        //解决快速点击偶现无法判断是否鼠标在元素上的bug
        if (evt.relatedTarget == null) return;
        that.isMouseOver = false;
        that.timer = setInterval(() => {
          that.goNextPage();
        }, that.timerInteval);
      },

      goPrePage() {
        this.switchPage(this.currentImgIndex + 1);//由于按钮元素是倒序排列的，这里需要+1
      },

      goNextPage() {
        this.switchPage(this.currentImgIndex - 1);
      },

      switchPage(newIndex) {
        if (!this.img_date_ary) return;
        if (newIndex < 0) newIndex = this.img_date_ary.length - 1;
        if (newIndex >= this.img_date_ary.length) newIndex = 0;
        if (newIndex === this.currentImgIndex) return;
        this.currentImgIndex = newIndex;
      },

      startAutoPlay() {
        this.currentImgIndex = this.img_date_ary.length - 1;
        this.timer = setInterval(() => {
          this.goNextPage();
        }, this.timerInteval);
      },

      clickOnImg(mainType, childType, id) {
        if (!mainType || !childType || !id) return;
        this.$emit('clickOnImg', mainType, childType, id);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .carousel-wrap {
    display: flex;
    overflow: hidden;
    width: 100%;
    height: 100%;
    .carousel-box {
      background: rgba(255, 255, 255, 1);
      width: 100%;
      height: 100%;
      position: relative;
      .img-box {
        width: 100%;
        height: 100%;
        text-align: center;
        img {
          width: 100%;
          height: 100%;
          margin: 0px auto;
          cursor: pointer;
        }
      }

      .other-item-box {
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: auto;
        .btn-box {
          width: 100%;
          height: 92%;
          margin: 0px auto;
          display: flex;
          flex: 2;
          justify-content: space-between;
          align-items: center;
          text-align: center;

          .nextpage-btn, .prepage-btn {
            font-weight: bold;
            cursor: pointer;
            border-radius: 50%;
            background-color: rgba(240, 240, 240, 0.85);;
            color: rgba(20, 20, 20, 0.85);
            font-family: "SimHei" !important;
            -webkit-user-select: none; /*webkit浏览器 文本无法选中*/
            -khtml-user-select: none; /*早期浏览器*/
            -moz-user-select: none; /*火狐*/
            -ms-user-select: none; /*IE10*/
            user-select: none;
            transition: all .5s ease;
            -webkit-transition: all .5s ease; /* Safari */
            -moz-transition: all .5s ease;
            -o-transition: all .5s ease;
            &:hover {
              background-color: rgba(240, 240, 240, 1.0);;
              color: rgba(20, 20, 20, 0.95);
            }
          }
        }

        .bottom-banner {
          background: rgba(240, 240, 240, 1.0);
          overflow: hidden;
          width: 100%;
          height: 8%;
          display: flex;
          flex: 2;
          justify-content: space-between;
          align-items: center;
          padding: 0px;

          .bottom-banner-text-normal {
            width: 75%;
            height: 100%;
            text-align: left;
            color: rgba(20, 20, 20, .9);
            text-indent: 1em;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-decoration: none;
          }

          .bottom-banner-buttons {
            width: 25%;
            height: 100%;
            display: flex;
            flex-direction: row-reverse;
            margin-right: 1%;

            .button, .button--active {
              list-style: none;
              cursor: pointer;
              border-radius: 50%;
            }

            .button {
              background-color: rgba(20, 20, 20, 0.2);

              &:hover {
                background: rgba(20, 20, 20, 0.9);
              }
            }

            .button--active {
              background: rgba(0, 0, 0, 1.0);
            }
          }
        }
      }
    }
  }

  .nextpage-btn {
    -moz-animation: showNextPageBtn 0.4s ease-in-out 0s 1 alternate forwards;
    -o-animation: showNextPageBtn 0.4s ease-in-out 0s 1 alternate forwards;
    -webkit-animation: showNextPageBtn 0.4s ease-in-out 0s 1 alternate forwards; /*Safari and Chrome*/
    animation: showNextPageBtn 0.4s ease-in-out 0s 1 alternate forwards;
  }

  .prepage-btn {
    -moz-animation: showNextPageBtn 0.4s ease-in-out 0s 1 alternate forwards;
    -o-animation: showNextPageBtn 0.4s ease-in-out 0s 1 alternate forwards;
    -webkit-animation: showPrePageBtn 0.4s ease-in-out 0s 1 alternate forwards; /*Safari and Chrome*/
    animation: showPrePageBtn 0.4s ease-in-out 0s 1 alternate forwards;
  }

  .nextpage-btn--hide, .prepage-btn--hide {
    display: none;
  }

  @keyframes showPrePageBtn {
    0% {
      margin-left: -10%;
      -webkit-margin-start: -10%;
      opacity: 0;
      -webkit-opacity: 0;
    }
    100% {
      margin-left: 3%;
      -webkit-margin-end: 3%;
      opacity: 1;
      -webkit-opacity: 1;
    }
  }

  @keyframes showNextPageBtn {
    0% {
      margin-right: -10%;
      -webkit-margin-end: -10%;
      opacity: 0;
      -webkit-opacity: 0;
    }
    100% {
      margin-right: 3%;
      -webkit-margin-start: 3%;
      opacity: 1;
      -webkit-opacity: 1;
    }
  }
</style>

<style lang="scss">
  .carousel-wrap {

  }
</style>
