<template>
  <section :class=" showFlag? 'help-tools-container':'help-tools-container-hide'">
    <div class="help-tools-wrap">
      <div class="help-tools-box" v-if="showFlag">
        <div class="scale-tool-container">
          <span class="title">页面缩放</span>
          <div class="button" @click.stop="handleChangeScaleNum(scaleNum+10)">
            <i class="icon el-icon-zoom-in"></i>
          </div>
          <div class="text">
            {{scaleNum+'%'}}
          </div>
          <div class="button" @click.stop="handleChangeScaleNum(scaleNum-10)">
            <i class="icon el-icon-zoom-out"></i>
          </div>
        </div>

        <div class="font-tool-container">
          <span class="title">配色</span>
          <li v-for="(item,index) in  fontConfig">
            <el-tooltip :content="item.tip" placement="bottom" effect="light">
              <div :class="index===fontStyle?'font-button-select':'font-button'"
                   :style="'color:'+item.fontColor+';'+'background:'+item.backgroundColor"
                   @click.stop="handleChangeFontStyle(index)">
                <span>{{item.name}}</span>
              </div>
            </el-tooltip>
          </li>
        </div>

        <div class="help-line-container">
          <span class="title">辅助线</span>
          <div class="help-line-switch">
            <el-switch
              v-model="helpLineFlag"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </div>
          <div class="lines" v-if="helpLineFlag">
            <div id="line-vertical" :style="'left:'+mouseX+'px'"></div>
            <div id="line-horizon" :style="'top:'+mouseY+'px'"></div>
          </div>
        </div>

        <div class="btn-container">
          <div class="reset-button-container" @click.stop="handleReset">
            <i class="icon el-icon-refresh-right"></i>
            <span>重置</span>
          </div>
          <div class="close-button-container" @click.stop="handleClose">
            <i class="icon el-icon-close"></i>
            <span>关闭</span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    components: {},

    data() {
      return {
        mouseX: 0,
        mouseY: 0,
      }
    },

    created() {
    },

    mounted() {
      document.addEventListener('mousemove', this.handleMoveHelpLine);
    },

    destroyed() {
      document.removeEventListener('mousemove', this.handleMoveHelpLine);
    },

    computed: {
      ...mapState({
        showFlag: state => state.helpTools.showFlag,
        fontStyle: state => state.helpTools.fontStyle,
        fontConfig: state => state.helpTools.fontConfig,
        scaleNum: state => state.helpTools.scaleNum,
      }),
      helpLineFlag: {
        get() {
          return this.$store.state.helpTools.helpLineFlag
        },
        set(val) {
          this.$store.state.helpTools.helpLineFlag = val
        }
      }
    },

    methods: {
      ...mapActions({
        switchShowHide: 'helpTools/switchShowFlag',
        switchHideFlag: 'helpTools/switchHideFlag',
        changeScaleNum: 'helpTools/changeScaleNum',
        changeFontStyle: 'helpTools/changeFontStyle',
        switchRefreshPageFlag: 'helpTools/switchRefreshPageFlag',
      }),

      handleChangeScaleNum(newNum) {
        this.changeScaleNum(newNum);
      },

      handleChangeFontStyle(newNum) {
        this.changeFontStyle(newNum);
        if (this.fontStyle === 0) {
          this.switchRefreshPageFlag();
        } else {
          this.changeDOMFontStyle();
        }
      },

      async changeDOMFontStyle(obj) {
        if (!this.fontConfig || !this.fontStyle) return;
        let ignoreDom = ["IMG"];
        let ignoreClass = ["other-item-box", "map-wrap", "help-tools-container", "slide-nav-banner-container"];
        let childObjs = (obj ? obj : document.body).childNodes;
        if (!childObjs) return;
        for (let i = 0; i < childObjs.length; i++) {
          if (childObjs[i].nodeType === 1) {
            if (ignoreDom.includes(childObjs[i].tagName) || ignoreClass.includes(childObjs[i].className)) continue;
            childObjs[i].style.color = this.fontConfig[this.fontStyle].fontColor;
            childObjs[i].style.backgroundImage = null;
            childObjs[i].style.backgroundColor = childObjs[i].style.backgound = this.fontConfig[this.fontStyle].backgroundColor;
          }
          this.changeDOMFontStyle(childObjs[i]);
        }
      },

      handleMoveHelpLine(e) {
        const that = this;
        if (that.helpLineFlag) {
          that.mouseX = e.clientX - 6;
          that.mouseY = e.clientY - 6;
        }
      },

      handleReset() {
        this.changeScaleNum(100);
        this.helpLineFlag = false;
        this.handleChangeFontStyle(0);
      },

      handleClose() {
        this.switchHideFlag();
      },
    },

    watch: {
      '$route'(to, from) {

      }
    },
  }
</script>

<style lang="scss" scoped>
  @media screen and (min-width: 1140px) {
    .help-tools-container, .help-tools-container-hide {
      width: 100%;
      top: 0%;
      left: 0%;
      position: fixed;
      z-index: 1000;
      transition: all 0.5s ease;
      -webkit-transition: all 0.5s ease; /* Safari */
      -moz-transition: all 0.5s ease;
      -o-transition: all 0.5s ease;
      overflow: hidden;
    }

    .help-tools-container-hide {
      height: 0px;
    }

    .help-tools-container {
      background: rgba(250, 250, 250, 1.0);
      color: rgba(20, 20, 20, .9);
      box-shadow: 0 5px 12px 0 rgba(0, 0, 0, 0.4);
      height: 100px;
      .help-tools-wrap {
        width: 1100px;
        margin: 0px auto;

        .help-tools-box {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          margin: 25px auto;
          font-size: 28px;

          .scale-tool-container {
            display: flex;
            flex-wrap: nowrap;
            .button {
              margin-top: -8px;
              margin-left: 10px;
              width: 50px;
              height: 50px;
              font-size: 25px;
              cursor: pointer;
              background: rgba(250, 250, 250, 1.0);
              border-radius: 5px;
              /*box-shadow: 0 5px 12px 0 rgba(0, 0, 0, 0.2);*/
              border: 1px solid rgba(20, 20, 20, .3);
              text-align: center;
              line-height: 40px;
              &:hover {
                color: #b94041;
                border: 1px solid #b94041;
              }
            }
            .text {
              margin-left: 10px;
            }
          }

          .font-tool-container {
            margin-top: -8px;
            display: flex;
            flex-wrap: nowrap;
            list-style: none;
            margin-left: 20px;
            align-items: center;
            .font-button, .font-button-select {
              margin-left: 10px;
              width: 50px;
              height: 50px;
              font-size: 25px;
              cursor: pointer;
              background: rgba(250, 250, 250, 1.0);
              border-radius: 5px;
              text-align: center;
              line-height: 40px;
              &:hover {
                font-weight: bold;
                font-size: 27px;
              }
            }

            .font-button {
              border: 1px solid rgba(20, 20, 20, .3);
            }

            .font-button-select {
              border: 3px solid rgba(20, 20, 20, .7);
            }
          }

          .help-line-container {
            display: flex;
            flex-wrap: nowrap;
            margin-top: -8px;
            margin-left: 20px;
            .help-line-switch {
              margin-left: 10px;
            }
            .lines {
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
              z-index: -5000;
              #line-vertical {
                position: fixed;
                background: red;
                top: 0;
                width: 3px;
                height: 100%;
              }
              #line-horizon {
                position: fixed;
                background: red;
                left: 0;
                width: 100%;
                height: 3px;
              }
            }
          }

          .btn-container {
            margin-left: 20px;
            display: flex;
            flex-wrap: nowrap;
            .reset-button-container, .close-button-container {
              width: 70px;
              height: 40px;
              font-size: 18px;
              cursor: pointer;
              background: rgba(250, 250, 250, 1.0);
              border-radius: 5px;
              /*box-shadow: 0 5px 12px 0 rgba(0, 0, 0, 0.2);*/
              border: 1px solid rgba(20, 20, 20, .3);
              text-align: center;
              line-height: 40px;
              &:hover {
                color: #b94041;
                border: 1px solid #b94041;
              }
            }

            .close-button-container {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 770px) and (max-width: 1139.98px) {
    .help-tools-container, .help-tools-container-hide {
      width: 100%;
      top: 0%;
      left: 0%;
      position: fixed;
      z-index: 1000;
      transition: all 0.5s ease;
      -webkit-transition: all 0.5s ease; /* Safari */
      -moz-transition: all 0.5s ease;
      -o-transition: all 0.5s ease;
      overflow: hidden;
    }

    .help-tools-container-hide {
      height: 0px;
    }

    .help-tools-container {
      background: rgba(250, 250, 250, 1.0);
      color: rgba(20, 20, 20, .9);
      box-shadow: 0 5px 12px 0 rgba(0, 0, 0, 0.4);
      height: 70px;
      .help-tools-wrap {
        width: 100%;
        margin: 0px auto;

        .help-tools-box {
          display: flex;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: center;
          margin: 12px auto;
          font-size: 20px;
          font-weight: bold;
          padding-left: 10px;
          padding-right: 10px;
          .scale-tool-container {
            display: flex;
            flex-wrap: nowrap;
            .button {
              margin-top: -8px;
              margin-left: 10px;
              width: 40px;
              height: 40px;
              font-size: 25px;
              cursor: pointer;
              background: rgba(250, 250, 250, 1.0);
              border-radius: 5px;
              /*box-shadow: 0 5px 12px 0 rgba(0, 0, 0, 0.2);*/
              border: 1px solid rgba(20, 20, 20, .3);
              text-align: center;
              line-height: 40px;
              &:hover {
                color: #b94041;
                border: 1px solid #b94041;
              }
            }
            .text {
              margin-left: 10px;
            }
          }

          .font-tool-container {
            display: flex;
            flex-wrap: nowrap;
            list-style: none;
            margin-left: 20px;
            align-items: center;
            .font-button, .font-button-select {
              margin-left: 10px;
              width: 40px;
              height: 40px;
              font-size: 25px;
              cursor: pointer;
              background: rgba(250, 250, 250, 1.0);
              border-radius: 5px;
              text-align: center;
              line-height: 35px;
              &:hover {
                font-weight: bold;
                font-size: 27px;
              }
            }

            .font-button {
              border: 1px solid rgba(20, 20, 20, .3);
            }

            .font-button-select {
              border: 3px solid rgba(20, 20, 20, .7);
            }
          }

          .help-line-container {
            display: none;
            flex-wrap: nowrap;
            margin-top: -8px;
            margin-left: 20px;
            .help-line-switch {
              margin-left: 10px;
            }
            .lines {
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
              z-index: -5000;
              #line-vertical {
                position: fixed;
                background: red;
                top: 0;
                width: 3px;
                height: 100%;
              }
              #line-horizon {
                position: fixed;
                background: red;
                left: 0;
                width: 100%;
                height: 3px;
              }
            }
          }

          .btn-container {
            margin-left: 20px;
            display: flex;
            flex-wrap: nowrap;
            .reset-button-container, .close-button-container {
              width: 70px;
              height: 40px;
              font-size: 18px;
              cursor: pointer;
              background: rgba(250, 250, 250, 1.0);
              border-radius: 5px;
              /*box-shadow: 0 5px 12px 0 rgba(0, 0, 0, 0.2);*/
              border: 1px solid rgba(20, 20, 20, .3);
              text-align: center;
              line-height: 40px;
              &:hover {
                color: #b94041;
                border: 1px solid #b94041;
              }
            }

            .close-button-container {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 769.98px) {
    .help-tools-container, .help-tools-container-hide {
      width: 100%;
      top: 0%;
      left: 0%;
      position: fixed;
      z-index: 1000;
      transition: all 0.5s ease;
      -webkit-transition: all 0.5s ease; /* Safari */
      -moz-transition: all 0.5s ease;
      -o-transition: all 0.5s ease;
      overflow: hidden;
    }

    .help-tools-container-hide {
      height: 0px;
    }

    .help-tools-container {
      background: rgba(250, 250, 250, 1.0);
      color: rgba(20, 20, 20, .9);
      box-shadow: 0 5px 12px 0 rgba(0, 0, 0, 0.4);
      height: 200px;
      .help-tools-wrap {
        width: 100%;
        margin: 0px auto;

        .help-tools-box {
          display: flex;
          flex-wrap: wrap;
          font-size: 16px;
          font-weight: bold;
          width: 100%;
          .scale-tool-container {
            margin: 20px auto;
            display: flex;
            flex-wrap: nowrap;
            .title {
              width: 100px;
            }
            .button {
              margin-top: -8px;
              margin-left: 10px;
              width: 40px;
              height: 40px;
              font-size: 25px;
              cursor: pointer;
              background: rgba(250, 250, 250, 1.0);
              border-radius: 5px;
              /*box-shadow: 0 5px 12px 0 rgba(0, 0, 0, 0.2);*/
              border: 1px solid rgba(20, 20, 20, .3);
              text-align: center;
              line-height: 40px;
              &:hover {
                color: #b94041;
                border: 1px solid #b94041;
              }
            }
            .text {
              margin-left: 10px;
            }
          }

          .font-tool-container {
            margin: 0 auto;
            display: flex;
            flex-wrap: nowrap;
            list-style: none;
            align-items: center;

            .font-button, .font-button-select {
              margin-left: 10px;
              width: 40px;
              height: 40px;
              font-size: 25px;
              cursor: pointer;
              background: rgba(250, 250, 250, 1.0);
              border-radius: 5px;
              text-align: center;
              line-height: 35px;
              &:hover {
                font-weight: bold;
                font-size: 27px;
              }
            }

            .font-button {
              border: 1px solid rgba(20, 20, 20, .3);
            }

            .font-button-select {
              border: 3px solid rgba(20, 20, 20, .7);
            }
          }

          .help-line-container {
            display: none;
            flex-wrap: nowrap;
            margin-top: -8px;
            margin-left: 20px;
            .help-line-switch {
              margin-left: 10px;
            }
            .lines {
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
              z-index: -5000;
              #line-vertical {
                position: fixed;
                background: red;
                top: 0;
                width: 3px;
                height: 100%;
              }
              #line-horizon {
                position: fixed;
                background: red;
                left: 0;
                width: 100%;
                height: 3px;
              }
            }
          }

          .btn-container {
            display: flex;
            flex-wrap: nowrap;
            margin: 20px auto;
            .reset-button-container, .close-button-container {
              width: 70px;
              height: 40px;
              font-size: 18px;
              cursor: pointer;
              background: rgba(250, 250, 250, 1.0);
              border-radius: 5px;
              /*box-shadow: 0 5px 12px 0 rgba(0, 0, 0, 0.2);*/
              border: 1px solid rgba(20, 20, 20, .3);
              text-align: center;
              line-height: 40px;
              &:hover {
                color: #b94041;
                border: 1px solid #b94041;
              }
            }

            .close-button-container {
              margin-left: 20px;
            }
          }
        }
      }
    }
  }

</style>
