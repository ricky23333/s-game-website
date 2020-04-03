<template>
  <section class="container">
    <transition name="fade" mode="out-in">
      <section v-if="showBoxFlag" class="wrap">
        <div class="box">
          <i @click.stop="handleClose" class="icon el-icon-close"></i>
          <div class="first-line">注意</div>

          <div class="second-line">本网站会自动播放音乐</div>

          <div class="third-line">请确保处于适合播放音乐的场合，或关闭音乐播放器</div>

          <div class="auto-play-option">
            <label class="container">
              <input type="checkbox" v-model="autoPlayOptionFlag">
              <span class="checkmark"></span>自动开始播放
            </label>
          </div>

          <div class="remember-option">
            <label class="container">
              <input type="checkbox" v-model="saveAudioPlayerOptionFlag">
              <span class="checkmark"></span>记住我的设置
            </label>
          </div>

          <div @click.stop="handleConfirm" class="confirm-btn">确认</div>
        </div>
      </section>
    </transition>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "message-box-audio",

    data() {
      return {
        saveAudioPlayerOptionFlag: true,
        autoPlayOptionFlag: true,
      }
    },

    computed: {
      ...mapState({
        showBoxFlag: state => state.audio.showAudioOptionBoxFlag,
      }),
    },

    created() {

    },

    mounted() {
      this.handleLocalOptionOnStart();
    },

    watch: {},

    methods: {
      ...
        mapActions({
          getLocalAudioPlayerOption: 'audio/getLocalAudioPlayerOption',
          saveLocalAudioPlayerOption: 'audio/saveLocalAudioPlayerOption',
          clearLocalAudioPlayerOption: 'audio/clearLocalAudioPlayerOption',
          saveTempCacheAudioPlayerOption: 'audio/saveTempCacheAudioPlayerOption',
          showAudioOptionBox: 'audio/showAudioOptionBox',
          hideAudioOptionBox: 'audio/hideAudioOptionBox',
        }),

      async handleLocalOptionOnStart() {
        let tempOption = await this.getLocalAudioPlayerOption();
        if (tempOption === null) {
          this.saveAudioPlayerOptionFlag = this.autoPlayOptionFlag = true;
          await this.showAudioOptionBox();
        } else {
          await this.hideAudioOptionBox();
          await this.saveTempCacheAudioPlayerOption(tempOption);
        }
      },

      async handleConfirm() {
        if (this.saveAudioPlayerOptionFlag) {
          await this.saveLocalAudioPlayerOption(this.autoPlayOptionFlag);
        }
        await this.saveTempCacheAudioPlayerOption(this.autoPlayOptionFlag);
        await this.hideAudioOptionBox();
      },

      async handleClose() {
        await this.saveTempCacheAudioPlayerOption(false);
        await this.hideAudioOptionBox();
      },
    },
  }
</script>

<style lang="scss" scoped>
  @media screen and (min-width: 576px) {
    .container {
      .wrap {
        left: 0px;
        top: 0px;
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 6000;
        background-color: rgba(0, 0, 0, 0.75);

        .box {
          margin: 200px auto;
          width: 400px;
          height: 300px;
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          background: rgba(250, 250, 250, 1.0);
          border-radius: 5px;
          color: rgba(20, 20, 20, 0.8);
          padding-left: 15px;
          i {
            cursor: pointer;
            position: absolute;
            margin-left: 405px;
            font-size: 30px;
            font-weight: bold;
            color: rgba(200, 200, 200, 0.8);
            &:hover {
              color: rgba(200, 200, 200, 0.9);
            }
          }

          .first-line {
            padding-left: 10px;
            padding-top: 20px;
            line-height: 25px;
            width: 100%;
            font-size: 22px;
            font-weight: bold;
            height: 25px;
          }

          .second-line, .third-line {
            padding-left: 10px;
            padding-right: 10px;
            padding-top: 0px;
            line-height: 16px;
            width: 100%;
            font-size: 16px;
            height: 16px;
          }

          .auto-play-option, .remember-option {
            .container {
              margin-top: 10px;
              display: block;
              position: relative;
              padding-left: 35px;
              margin-bottom: 0px;
              cursor: pointer;
              font-size: 16px;
            }
            /* Hide the browser's default checkbox */
            .container input {
              position: absolute;
              height: 0;
              width: 0;
              opacity: 0;
              appearance: none; /*清除默认样式*/
              -webkit-appearance: none;
            }
            /* Create a custom checkbox */
            .checkmark {
              position: absolute;
              top: 0;
              left: 0;
              height: 20px;
              width: 20px;
              background-color: rgba(20, 20, 20, 0.2);
              border-radius: 2px;
              transition: all .25s ease;
              -webkit-transition: all .25s ease; /* Safari */
              -moz-transition: all .25s ease;
              -o-transition: all .25s ease;
            }
            .container input:checked + .checkmark {
              background-color: rgba(20, 20, 20, 1.0);
            }
            .container input:checked + .checkmark:after {
              content: "";
              position: absolute;
              left: 6px;
              top: 2px;
              width: 5px;
              height: 10px;
              border: solid white;
              border-width: 0 3px 3px 0;
              -webkit-transform: rotate(45deg);
              -ms-transform: rotate(45deg);
              -o-transform: rotate(45deg);
              transform: rotate(45deg);
            }
          }

          .auto-play-option {
            position: relative;
            margin-left: 10px;
          }
          .remember-option {
            position: relative;
            margin-left: 105px;
          }

          .confirm-btn {
            position: relative;
            cursor: pointer;
            text-align: center;
            margin-left: 240px;
            margin-top: 20px;
            width: 135px;
            height: 35px;
            border-radius: 4px;
            background-color: rgba(100, 100, 100, 1.0);
            font-size: 16px;
            font-weight: bold;
            line-height: 35px;
            color: rgba(240, 240, 240, 1.0);
            transition: all .25s ease;
            -webkit-transition: all .25s ease; /* Safari */
            -moz-transition: all .25s ease;
            -o-transition: all .25s ease;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            &:hover {
              background-color: rgba(20, 20, 20, 1.0);
              color: rgba(255, 255, 255, 1.0);
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 575.98px) {
    .container {
      .wrap {
        left: 0px;
        top: 0px;
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 6000;
        background-color: rgba(0, 0, 0, 0.75);

        .box {
          margin: 200px auto;
          width: 300px;
          height: 300px;
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          background: rgba(250, 250, 250, 1.0);
          border-radius: 5px;
          color: rgba(20, 20, 20, 0.8);
          i {
            cursor: pointer;
            position: absolute;
            margin-left: 275px;
            margin-top: -30px;
            font-size: 30px;
            font-weight: bold;
            color: rgba(200, 200, 200, 0.8);
            &:hover {
              color: rgba(200, 200, 200, 0.9);
            }
          }

          .first-line {
            padding-left: 15px;
            padding-top: 20px;
            line-height: 25px;
            width: 100%;
            font-size: 22px;
            font-weight: bold;
            height: 25px;
          }

          .second-line, .third-line {
            padding-left: 15px;
            padding-right: 15px;
            padding-top: 0px;
            line-height: 16px;
            width: 100%;
            font-size: 16px;
            height: 16px;
          }

          .auto-play-option, .remember-option {
            width: 100%;
            padding-left: 15px;
            margin-top: 5px;
            .container {
              margin-top: 10px;
              display: block;
              position: relative;
              padding-left: 35px;
              margin-bottom: 0px;
              cursor: pointer;
              font-size: 16px;
            }
            /* Hide the browser's default checkbox */
            .container input {
              position: absolute;
              height: 0;
              width: 0;
              opacity: 0;
              appearance: none; /*清除默认样式*/
              -webkit-appearance: none;
            }
            /* Create a custom checkbox */
            .checkmark {
              position: absolute;
              top: 0;
              left: 0;
              height: 20px;
              width: 20px;
              background-color: rgba(20, 20, 20, 0.2);
              border-radius: 2px;
              transition: all .25s ease;
              -webkit-transition: all .25s ease; /* Safari */
              -moz-transition: all .25s ease;
              -o-transition: all .25s ease;
            }
            .container input:checked + .checkmark {
              background-color: rgba(20, 20, 20, 1.0);
            }
            .container input:checked + .checkmark:after {
              content: "";
              position: absolute;
              left: 6px;
              top: 2px;
              width: 5px;
              height: 10px;
              border: solid white;
              border-width: 0 3px 3px 0;
              -webkit-transform: rotate(45deg);
              -ms-transform: rotate(45deg);
              -o-transform: rotate(45deg);
              transform: rotate(45deg);
            }
          }

          .confirm-btn {
            position: relative;
            cursor: pointer;
            text-align: center;
            margin: 10px auto;
            width: 105px;
            height: 35px;
            border-radius: 4px;
            background-color: rgba(100, 100, 100, 1.0);
            font-size: 16px;
            font-weight: bold;
            line-height: 35px;
            color: rgba(240, 240, 240, 1.0);
            transition: all .25s ease;
            -webkit-transition: all .25s ease; /* Safari */
            -moz-transition: all .25s ease;
            -o-transition: all .25s ease;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            &:hover {
              background-color: rgba(20, 20, 20, 1.0);
              color: rgba(255, 255, 255, 1.0);
            }
          }
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .fade-enter-active {
    transition: all .3s ease;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
