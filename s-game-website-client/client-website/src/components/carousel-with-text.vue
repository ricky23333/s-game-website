//图片轮播图组件
<template>
  <section class="carousel-wrap">
    <div class="carousel-box" v-if="img_date_ary&&img_date_ary.length>0" @mouseenter.stop="onMouseEnterBox"
         @mouseleave.stop="onMouseLeaveBox">
      <div v-if="img_date_ary.length>1" class="prepage-btn"
           @click.stop="goPrePage">
        &lt;
      </div>
      <div class="img-box" id="img-box">
        <img v-lazy="img_date_ary[currentImgIndex].image_url"
             :key="img_date_ary[currentImgIndex].image_url"
             @click="clickOnImg(img_date_ary[currentImgIndex].article_main_type,img_date_ary[currentImgIndex].article_child_type,img_date_ary[currentImgIndex].article_id)"/>
      </div>
      <div class="text-box" @click.stop="clickOnBox">
        <span class="text-content">{{img_date_ary[currentImgIndex].image_describe?img_date_ary[currentImgIndex].image_describe:img_date_ary[currentImgIndex].article_title}}
          <span class="text-next">
            >>>
          </span>
        </span>
      </div>
      <div v-if="img_date_ary.length>1" class="nextpage-btn"
           @click.stop="goNextPage">
        &gt;
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "carousel-with-text",
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

    computed: {},

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
        if (!that.timer) {
          that.timer = setInterval(() => {
            that.goNextPage();
          }, that.timerInteval);
        }
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

      clickOnBox(mainType, childType, id) {
        this.$emit('clickOnBox', mainType, childType, id);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .carousel-wrap {

    .carousel-box {
      display: flex;
      flex: 4;
      /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);*/
      border-radius: 2px;
      border: 1px solid #EBEEF5;
      overflow: hidden;
      .img-box {
        width: 36%;
        box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, .3);
      }

      .nextpage-btn, .prepage-btn {
        width: 7%;
        background-color: rgba(250, 250, 250, 1.0);
        border: 1px solid #EBEEF5;
        color: rgba(100, 100, 100, 1.0);
        text-align: center;
        font-family: "SimHei" !important;
        font-weight: bold;
        -webkit-user-select: none; /*webkit浏览器 文本无法选中*/
        -khtml-user-select: none; /*早期浏览器*/
        -moz-user-select: none; /*火狐*/
        -ms-user-select: none; /*IE10*/
        user-select: none;
        cursor: pointer;

        &:hover {
          background-color: #b94041;
          color: rgba(255, 255, 255, 1.0);
        }
      }

      .text-box {
        width: 47%;
        overflow: hidden;
        padding-right: 2px;
        font-size: 14px;
        line-height: 25px;
        cursor: pointer;
        &:hover {
          font-weight: bold;
        }
        .text-content {
          white-space: normal;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 7;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
        .text-next {
          color: #0086b3;
        }
      }
    }
  }
</style>

<style>
  /*懒加载样式*/
  #img-box img[lazy=loading] {
    left: 0%;
    top:-25%;
    /*width: 25px;*/
    /*height: 25px;*/
  }

  #img-box img[lazy=error] {
    left: 0%;
    top: -10%;
    /*width: 25px;*/
    /*height: 25px;*/
  }
</style>
