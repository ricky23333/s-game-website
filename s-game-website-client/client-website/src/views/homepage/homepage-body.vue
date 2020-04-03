<template>
  <section class="main">
    <section class="container" v-if="homepageDate" :style="'height:'+fullHeight+'px;'">
      <section class="container-wrap">
        <div class="game-logo"><img src="static/images/homepage/game-logo.png" alt="LOGO"/></div>
        <div class="options-container">
          <li v-for="(item,index) in  optionsConfig">
            <img v-if="index===selectOptionIndex" class="select-icon" src="static/images/homepage/select-icon.png"
                 alt="ICON">
            <span @mouseover="handleMouseOverOption(index)"
                  @mouseout="handleMouseOutOption(index)"
                  :class="index===selectOptionIndex?'option-text-select':'option-text'"
                  @click.stop="toPathWithIndex(index)"> {{item.name}}</span>
          </li>
        </div>
      </section>

    </section>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "homepage-body",
    components: {},
    data() {
      return {
        selectOptionIndex: null,
        fullHeight: document.documentElement.clientHeight,
        resizeHeightFlag:false,
        optionsConfig: [
          {
            name: '首页',
          },
          {
            name: '日志',
          },
          {
            name: '媒体',
          },
          {
            name: '关于',
          },
        ],
      }
    },

    created() {
      this.getHomepageInfo();
      document.title = "s-game";//收藏夹网页标题

    },

    mounted() {
      document.addEventListener('keydown', this.handleKeyDown);
      this.getBodyFullHeight();
    },

    destroyed() {
      document.removeEventListener('keydown', this.handleKeyDown);
    },

    computed: {
      ...mapState({
        homepageDate: state => state.homepage.homepageDate,
        guestDate: state => state.user.guestDate,
        windowResizeFlag: state => state.user.windowResizeFlag,
      }),
    },

    watch: {
      windowResizeFlag() {
        this.getBodyFullHeight();
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

    methods: {
      ...
        mapActions({
          getHomepageDate: 'homepage/getHomepageDate',
          searchArticle: 'homepage/searchArticle'
        }),

      //通过vuex内的全局方法 访问api 获取主页上要显示的所有信息
      async getHomepageInfo() {
        await this.getHomepageDate();
      },

      getBodyFullHeight() {
        this.fullHeight = window.fullHeight = document.documentElement.clientHeight;
      },

      handleMouseOverOption(newIndex) {
        this.selectOptionIndex = newIndex;
      },

      handleMouseOutOption() {
        this.selectOptionIndex = null;
      },

      handleKeyDown(e) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          //左、上、下、右、回车
          if (e.keyCode === 65 || e.keyCode === 37) {
            this.lastIndex();
            e.preventDefault();
          } else if (e.keyCode === 87 || e.keyCode === 38) {
            this.lastIndex();
            e.preventDefault();
          } else if (e.keyCode === 68 || e.keyCode === 39) {
            this.nextIndex();
            e.preventDefault();
          } else if (e.keyCode === 83 || e.keyCode === 40) {
            this.nextIndex();
            e.preventDefault();
          } else if (e.keyCode === 13) {
            if (this.selectOptionIndex) {
              e.preventDefault();
              this.toPathWithIndex(this.selectOptionIndex);
            }
          }

          if (e && e.stopPropagation) {
            //因此它支持W3C的stopPropagation()方法
            e.stopPropagation();
          } else {
            //否则，我们需要使用IE的方式来取消事件冒泡
            window.event.cancelBubble = true;
          }
        }
      },

      nextIndex() {
        if (this.selectOptionIndex !== null) {
          this.selectOptionIndex++;

          if (this.selectOptionIndex >= this.optionsConfig.length) {
            this.selectOptionIndex = 0;
          }
        } else {
          this.selectOptionIndex = 0;
        }
      },

      lastIndex() {
        if (this.selectOptionIndex !== null) {
          this.selectOptionIndex--;
          if (this.selectOptionIndex < 0) {
            this.selectOptionIndex = this.optionsConfig.length - 1;
          }
        } else {
          this.selectOptionIndex = 0;
        }
      },

      toPath(path) {
        this.$router.push(path);
      },

      toPathWithIndex(index) {
        if (!this.guestDate) return;
        this.toPath('/' + this.guestDate.router_type[index].router_name);
      },

      toPathWithId(mainType, childType, id) {
        this.$router.push('/' + mainType + '/' + childType + '/' + id);
      },
    }
  }
</script>

<style lang="scss" scoped>
  @media screen and (min-width: 576px) {
    .main {
      position: relative;
      margin: 0px auto;
      width: 100%;
      height: 100%;
      .container {
        position: relative;
        top: 120px;
        .container-wrap {
          display: flex;
          flex-wrap: wrap;
          .game-logo {
            position: relative;
            margin: 0px auto;
            width: 40%;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: auto;
              height: auto;
              max-width: 100%;
              max-height: 100%;
            }
          }
          .options-container {
            width: 100%;
            list-style: none;
            text-align: center;
            li {
              width: 100px;
              margin: 20px auto;
              cursor: pointer;

              .option-text, .option-text-select {
                font-size: 0.7rem;
                font-weight: bold;
                letter-spacing: 0.2rem;
              }
              .option-text {
                color: rgba(210, 210, 210, 1.0);
              }
              .option-text-select {
                color: rgba(240, 240, 240, 1.0);
              }

              .select-icon {
                position: absolute;
                margin-top: 8px;
                margin-left: -30px;
                width: 20px;
                height: 20px;
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 575.98px) {
    .main {
      width: 100%;
      height: 100%;
      .container {
        position: relative;
        top: 120px;
        .container-wrap {
          display: flex;
          flex-wrap: wrap;
          .game-logo {
            margin: 0px auto;
            width: 60%;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: auto;
              height: auto;
              max-width: 100%;
              max-height: 100%;
            }
          }
          .options-container {
            width: 100%;
            list-style: none;
            text-align: center;
            position: relative;

            li {
              width: 100px;
              margin: 30px auto;
              cursor: pointer;

              .option-text, .option-text-select {
                font-size: 0.7rem;
                font-weight: bold;
                letter-spacing: 0.2rem;
              }
              .option-text {
                color: rgba(210, 210, 210, 1.0);
              }
              .option-text-select {
                color: rgba(240, 240, 240, 1.0);
              }

              .select-icon {
                position: absolute;
                margin-top: 8px;
                margin-left: -30px;
                width: 20px;
                height: 20px;
              }
            }
          }
        }
      }
    }
  }
</style>

//修改子组件样式
<style lang="scss">
  .options-container * {
    font-family: 'Ipix';
  }
</style>
