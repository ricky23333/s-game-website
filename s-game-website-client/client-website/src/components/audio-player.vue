<template>
  <div class="container" v-if="showAudioPlayerFlag">
    <div :class="expandFlag?'audio-box-expand':'audio-box'">
      <el-tooltip :content="audioName" placement="top" effect="light" :open-delay="500">
        <div class="cover-img-box" @click.stop="handleClickCoverImg">
          <img
            v-if="(currentPlayIndex>=0&&audioListDate[currentPlayIndex].cover_url)||currentPlayingArticleAudioCoverUrl!==null"
            :class="isPlayingFlag?'rotate-img':'normal-img'"
            :src="currentPlayingArticleAudioCoverUrl!==null?currentPlayingArticleAudioCoverUrl:audioListDate[currentPlayIndex].cover_url">
        </div>
      </el-tooltip>

      <div class="progress-box">
        <div class="progress-bar" @click="playMusic" ref="runfatbar">
          <div class="current-bar" ref="runbar" :style="{width:indicatorPosition}">
          </div>
          <div
            class="current-point"
            ref="tag"
            @mousedown.prevent="barDown"
            @touchstart.prevent="barDown">
            <div class="tag_inner">
              <i v-if="loading" class="icon el-icon-loading"></i>
            </div>
          </div>
        </div>

        <div class="audio-time-box">
          <span class="curTime">{{ currentTime }}/</span>
          <span class="durTime">{{ durationTime }}</span>
        </div>
      </div>

      <div class="audio-controls">
        <div class="option-btn" @click.stop="handleClickOptionBtn"><i class="icon el-icon-setting"></i></div>
        <div class="play-btn" @click.stop="handleClickPlayBtn" v-if="!isPlayingFlag"><i
          class="iconbofang el-iconfont"></i></div>
        <div class="pause-btn" @click.stop="handleClickPauseBtn" v-else><i
          class="iconweibiaoti519 el-iconfont"></i></div>
        <div v-else class="loading-btn">

        </div>
        <div class="next-btn" @click.stop="handleClickNextBtn"><i class="iconzxiayishou el-iconfont"></i></div>
        <div class="close-btn" @click.stop="handleClickCloseBtn"><i class="icon el-icon-close"></i></div>
      </div>

      <!-- 播放器资源 -->
      <audio v-if="currentPlayIndex>=0||currentPlayingArticleAudioUrl!==null"
             @ended="handleAudioPlayEnded"
             @timeupdate="handleAudioTimeUpdated"
             @canplaythrough="hideLoading"
             preload
             @error="loadError"
             ref="audioPlayerDiv">
        <source
          :src="currentPlayingArticleAudioUrl!==null?currentPlayingArticleAudioUrl:audioListDate[currentPlayIndex].audio_url"
          type="audio/mp3"/>
      </audio>
    </div>

    <transition name="fade" mode="out-in">
      <div class="close-confirm-box" v-if="showConfirmCloseBoxFlag">
        <div class="container">
          <div class="first-line">关闭音乐播放器</div>
          <div class="second-line">
            <div class="cancle-btn" @click.stop="handleClickCancleCloseBtn">取消</div>
            <div class="confirm-btn" @click.stop="handleClickConfirmCloseBtn">确定</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: 'audio-player',

    props: {},

    computed: {
      ...mapState({
        audioListDate: state => state.audio.audioListDate,
        autoPlayOnStartFlag: state => state.audio.tempAutoPlayOption,
        showAudioPlayerFlag: state => state.audio.showAudioPlayerFlag,
        showAudioOptionBoxFlag: state => state.audio.showAudioOptionBoxFlag,
        isPlayingFlag: state => state.audio.isPlayingFlag,
        currentPlayingArticleAudioUrl: state => state.audio.currentPlayingArticleAudioUrl,
        currentPlayingArticleAudioCoverUrl: state => state.audio.currentPlayingArticleAudioCoverUrl,
      }),

      audioName: {
        get() {
          let tempTitle = '正在播放：'
          let tempName = '无';
          if (this.currentPlayIndex >= 0 && this.audioListDate) {
            if (this.audioListDate[this.currentPlayIndex].audio_name) {
              tempName = this.audioListDate[this.currentPlayIndex].audio_name;
            } else if (this.audioListDate[this.currentPlayIndex].audio_url) {
              let tempUrlArray = this.audioListDate[this.currentPlayIndex].audio_url.split('/');
              tempName = tempUrlArray[tempUrlArray.length - 1];
            }
          } else if (this.currentPlayingArticleAudioUrl) {
            let tempUrlArray = this.currentPlayingArticleAudioUrl.split('/');
            tempName = tempUrlArray[tempUrlArray.length - 1];
          }
          return tempTitle + tempName;
        },
      }
    },

    data() {
      return {
        expandFlag: false,
        currentTime: '00:00', // 已播放时间
        durationTime: '00:00', // 总播放时间,
        indicatorPosition: '0%',
        currentPlayIndex: -1,
        historyAudioIndexList: [],//历史播放记录，数量为全部音乐的1/3，每次随机下一首时检查与列表内是否重复，重复则重新随机
        showConfirmCloseBoxFlag: false,
        move: {
          status: false, // 是否可拖动
          startX: 0, // 记录最开始点击的X坐标
          left: 0 // 记录当前已经移动的距离
        },
        loading: true
      }
    },

    mounted() {
      this.handleInitAudioPlayer()
    },

    watch: {
      // "$route": 'handleRouterChange',
      "isPlayingFlag"(newVal) {
        if (newVal) this.$refs.audioPlayerDiv.play();
        else this.$refs.audioPlayerDiv.pause();
      },
      "showAudioOptionBoxFlag"(newVal) {
        let that = this;
        setTimeout(function () {
          if (!newVal && that.autoPlayOnStartFlag && !that.isPlayingFlag) {
            that.handleLoadAudio();
          }
        }, 100);
      },
      "currentPlayingArticleAudioUrl"(newVal) {
        let that = this;
        if (newVal !== null) {
          setTimeout(function () {
            that.handleLoadAudio();
          }, 100);
        }
      }
    },

    methods: {
      ...
        mapActions({
          getLocalAudioPlayerOption: 'audio/getLocalAudioPlayerOption',
          saveLocalAudioPlayerOption: 'audio/saveLocalAudioPlayerOption',
          clearLocalAudioPlayerOption: 'audio/clearLocalAudioPlayerOption',
          saveTempCacheAudioPlayerOption: 'audio/saveTempCacheAudioPlayerOption',
          getAudioList: 'audio/getAudioList',
          hideAudioPlayer: 'audio/hideAudioPlayer',
          showAudioOptionBox: 'audio/showAudioOptionBox',
        }),

      async handleInitAudioPlayer() {
        await this.getAudioList();
        await this.handleLoadAudio();
      },

      // 加载
      async handleLoadAudio() {
        this.$store.state.audio.isPlayingFlag = false;
        this.initialAudio(0, 0);
        this.indicatorPosition = `${0}%`;
        if (this.currentPlayingArticleAudioUrl === null) {
          this.getCurrentAudioIndex();
        } else this.currentPlayIndex = -1;

        this.$nextTick(() => {
          let audioPlayerDiv = this.$refs.audioPlayerDiv;
          if (!audioPlayerDiv) return;
          if (this.currentPlayIndex < 0 && this.currentPlayingArticleAudioUrl === null) return;
          let audioSrc;
          if (this.currentPlayingArticleAudioUrl === null) audioSrc = this.audioListDate[this.currentPlayIndex].audio_url;
          else audioSrc = this.currentPlayingArticleAudioUrl;
          this.loading = true;
          if (audioSrc.indexOf('.mp3') === -1) {
            this.durationTime = this.getAudioTimeFormat(0)
            this.indicatorPosition = `${0}%`
            this.currentPlayIndex = -1;
            return false
          }
          this.bindEvents();
          audioPlayerDiv.load();
          if (this.autoPlayOnStartFlag) this.$store.state.audio.isPlayingFlag = true;
          audioPlayerDiv.oncanplay = (e) => {
            // console.log('ready to play', e);
            // this.durationTime = this.getAudioTimeFormat(audio.duration)
            this.initialAudio(audioPlayerDiv.currentTime, audioPlayerDiv.duration)
            // if (this.autoPlayOnStartFlag) audioPlayerDiv.play();
            // let audioCoverDate = jsmediatags.read('./static/test-audio/2.mp3', {
            //   onSuccess: function (tag) {
            //     console.log(tag);
            //   },
            //   onError: function (error) {
            //     console.log(':(', error.type, error.info);
            //   }
            // });
            // console.log(1111, audioCoverDate);

          }
        })
      },

      getCurrentAudioIndex() {
        if (!this.audioListDate || this.audioListDate.length <= 0) {
          this.saveTempCacheAudioPlayerOption(false);
          this.currentPlayIndex = -1;
        } else {
          let randomIndex = 0;
          for (let i = 0; i < 20; i++) {
            randomIndex = Math.ceil(Math.random() * this.audioListDate.length) - 1;
            if (!this.audioListDate[randomIndex] || !this.audioListDate[randomIndex].audio_url) continue;
            if (!this.historyAudioIndexList.includes(randomIndex)) {
              break;
            }
          }
          let overNum = Math.ceil(this.historyAudioIndexList.length - this.audioListDate.length / 3);
          if (overNum > 0) {
            this.historyAudioIndexList.splice(0, overNum);
          }
          this.historyAudioIndexList.push(randomIndex);
          this.currentPlayIndex = randomIndex;
        }
      },

      handleClickCoverImg() {
        this.expandFlag = !this.expandFlag;
      },

      handleClickPlayBtn() {
        this.switchPlayAndPause();
      },
      handleClickPauseBtn() {
        this.switchPlayAndPause();
      },
      // 播放/暂停
      switchPlayAndPause() {
        if (this.currentPlayIndex < 0 && this.currentPlayingArticleAudioUrl === null) return;
        if (this.isPlayingFlag) {
          this.$store.state.audio.isPlayingFlag = false
        } else {
          this.$store.state.audio.isPlayingFlag = true
        }
      },

      handleClickOptionBtn() {
        this.showAudioOptionBox();
      },

      handleClickCloseBtn() {
        this.showConfirmCloseBoxFlag = !this.showConfirmCloseBoxFlag;
      },

      handleClickCancleCloseBtn() {
        this.showConfirmCloseBoxFlag = false;
      },

      handleClickConfirmCloseBtn() {
        this.showConfirmCloseBoxFlag = false;
        this.currentPlayIndex = -1;
        this.$store.state.audio.currentPlayingArticleAudioUrl = null;
        this.$store.state.audio.currentPlayingArticleAudioCoverUrl = null;
        this.hideAudioPlayer();
      },

      async handleClickNextBtn() {
        if (!this.autoPlayOnStartFlag) {
          await this.saveTempCacheAudioPlayerOption(true);
        }
        this.$store.state.audio.currentPlayingArticleAudioUrl = null;
        this.$store.state.audio.currentPlayingArticleAudioCoverUrl = null;
        await this.handleLoadAudio();
      },

      // 播放结束
      async handleAudioPlayEnded() {
        if (!this.autoPlayOnStartFlag) {
          await this.saveTempCacheAudioPlayerOption(true);
        }
        if (this.$store.state.audio.currentPlayingArticleAudioUrl !== null) {
          this.$store.state.audio.currentPlayingArticleAudioUrl = null;
          this.$store.state.audio.currentPlayingArticleAudioCoverUrl = null;
        } else {
          await this.handleLoadAudio();
        }
      },
      // 播放时间格式化
      handleAudioTimeUpdated(e) {
        const {currentTime, duration} = e.target
        this.initialAudio(currentTime, duration)
      },
      //计算播放进度条进度
      initialAudio(currentTime, duration) {
        this.currentTime = this.getAudioTimeFormat(currentTime)
        this.durationTime = this.getAudioTimeFormat(duration)
        this.indicatorPosition = `${(currentTime / duration) * 100}%`
        let listenLoad = (currentTime / duration) * 100
        if (listenLoad > 0.1) {
          this.loading = false;
        }
      },

      // 拖拽
      // 添加绑定事件
      bindEvents() {
        const tag = this.$refs.tag
        tag.addEventListener('mousemove', this.barMove)
        tag.addEventListener('mouseup', this.barUp)

        tag.addEventListener('touchmove', this.barMove)
        tag.addEventListener('touchend', this.barUp)
      },
      // 移除绑定事件
      unbindEvents() {
        const tag = this.$refs.tag
        tag.addEventListener('mousemove', this.barMove)
        tag.addEventListener('mouseup', this.barUp)

        tag.removeEventListener('touchmove', this.barMove)
        tag.removeEventListener('touchend', this.barUp)
      },
      // 点击事件
      playMusic(e) {
        let rect = this.$refs.runfatbar.getBoundingClientRect()
        let offsetWidth = Math.min(
          this.$refs.runfatbar.clientWidth,
          Math.max(0, e.clientX - rect.left)
        )
        if (this.currentPlayIndex >= 0 || this.currentPlayingArticleAudioUrl !== null) {
          this.$store.state.audio.isPlayingFlag = true
          this.moveSilde(offsetWidth)
          this.commitPercent()
        }
      },
      // 鼠标按下事件
      barDown(e) {
        this.move.status = true;
        this.move.startX = e.clientX || e.touches[0].pageX;
        this.move.left = this.$refs.runbar.clientWidth;
      },
      // 鼠标/触摸移动事件
      barMove(e) {
        if (!this.move.status) {
          return false
        }
        let endX = e.clientX || e.targetTouches[0].pageX // 获得触摸拖动的坐标
        let dist = endX - this.move.startX // 触摸拖动的距离
        let offsetWidth = Math.min(
          this.$refs.runfatbar.clientWidth,
          Math.max(0, this.move.left + dist)
        )
        this.moveSilde(offsetWidth)
        this.commitPercent()
        this.$store.state.audio.isPlayingFlag = true
      },
      // 鼠标/触摸释放事件
      barUp(e) {
        e.stopPropagation()
        this.move.status = false
        this.commitPercent()
        this.$store.state.audio.isPlayingFlag = true // 根据播放时间开始播放
      },
      // 进度
      moveSilde(offsetWidth) {
        if (this.$refs.runbar) {
          this.$refs.runbar.style.width = `${offsetWidth}px`
        }
      },

      // 修改播放时间
      commitPercent() {
        const audioPlayerDiv = this.$refs.audioPlayerDiv // 音频所在对象
        if (audioPlayerDiv) {
          if (!audioPlayerDiv.duration || audioPlayerDiv.duration === 0) return;
          let lineWidth = this.$refs.runfatbar.clientWidth// 底部进度条总宽
          let percent = this.$refs.runbar.clientWidth / lineWidth// 计算进度条所在比例宽度
          let changeTime = audioPlayerDiv.duration * percent
          audioPlayerDiv.currentTime = changeTime
        }
      },

      loadError(e) {
        console.log("加载错误");
      },
      hideLoading(e) {
        // this.$refs.audio.play()
      },

      getAudioTimeFormat(time) {
        if (!time) return '00:00';
        let minute = Math.floor(time / 60);
        if (minute < 10) minute = '0' + minute;
        let second = Math.floor(time % 60);
        if (second < 10) second = '0' + second;
        return minute + ':' + second;
      },
    }
  }
</script>

<style lang="scss" scoped>
  @media screen and (min-width: 1140px) {
    .container {
      .audio-box-expand, .audio-box {
        display: flex;
        flex-wrap: nowrap;
        background: rgba(250, 250, 250, 1.0);
        border-radius: 70px;
        height: 70px;
        width: 530px;
        box-shadow: 0px 0px 3px 2px rgba(180, 180, 180, 0.6);
        align-items: center;
        overflow: hidden;
        transition: all .5s ease;
        -webkit-transition: all .5s ease; /* Safari */
        -moz-transition: all .5s ease;
        -o-transition: all .5s ease;

        .cover-img-box {
          cursor: pointer;
          margin-left: 7px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(150, 150, 150, 1.0);
          overflow: hidden;
          box-shadow: 0px 4px 8px rgba(100, 100, 100, 0.2);
          img {
            cursor: pointer;
            width: 56px;
            height: 56px;
          }

          .rotate-img {
            -webkit-animation: loader 10s linear infinite; /*Safari and Chrome*/
            animation: loader 10s linear infinite; /*IE9以上支持*/
            -o-animation: loader 10s linear infinite;
            -moz-animation: loader 10s linear infinite;
          }
        }

        .progress-box {
          margin-left: 20px;
          margin-top: 8px;
          display: flex;
          flex-wrap: nowrap;
          .progress-bar {
            cursor: pointer;
            width: 150px;
            height: 5px;
            background: rgba(20, 20, 20, 0.2);
            border-radius: 5px;
            display: flex;
            flex-wrap: nowrap;
            .current-bar {
              height: 5px;
              margin-right: 0px;
              background: rgba(20, 20, 20, 0.4);
              border-radius: 1px;
              transition: background-color .5s ease;
              -webkit-transition: background-color .5s ease; /* Safari */
              -moz-transition: background-color .5s ease;
              -o-transition: background-color .5s ease;
            }
            .current-point {
              margin-left: -6.5px;
              margin-top: -4px;
              width: 13px;
              height: 13px;
              .tag_inner {
                background: rgba(100, 100, 100, 1.0);
                border-radius: 50%;
                width: 13px;
                height: 13px;
                transition: background-color .5s ease;
                -webkit-transition: background-color .5s ease; /* Safari */
                -moz-transition: background-color .5s ease;
                -o-transition: background-color .5s ease;
                text-align: center;

                i {
                  font-size: 13px;
                  position: relative;
                  top: -2px;
                  color: rgba(250, 250, 250, 1.0);

                }
              }
            }
            &:hover {
              .current-bar {
                background: rgba(20, 20, 20, 1.0);
              }
              .current-point {
                .tag_inner {
                  background: rgba(20, 20, 20, 1.0);
                }
              }
            }
          }

          .audio-time-box {
            margin-left: 10px;
            margin-top: -5px;
            display: flex;
            flex-wrap: nowrap;
            font-size: 14px;
            font-weight: bold;
            line-height: 14px;
          }
        }

        .audio-controls {
          display: flex;
          text-align: center;
          margin-left: 0px;
          .option-btn, .next-btn, .play-btn, .pause-btn, .loading-btn, .close-btn {
            cursor: pointer;
            font-weight: bold;
            color: rgba(20, 20, 20, 0.7);
            transition: color .5s ease;
            -webkit-transition: color .5s ease; /* Safari */
            -moz-transition: color .5s ease;
            -o-transition: color .5s ease;
            &:hover {
              color: rgba(20, 20, 20, 0.95);
            }
          }
          .next-btn {
            margin-left: 15px;
            font-size: 35px;
            line-height: 35px;
          }

          .option-btn {
            font-size: 18px;
            margin-left: 10px;
            line-height: 40px;
          }
          .play-btn, .pause-btn {
            margin-left: 25px;
            font-size: 30px;
            line-height: 35px;
          }

          .close-btn {
            margin-left: 15px;
            font-size: 35px;
            line-height: 35px;
          }
        }
      }

      .audio-box {
        width: 200px;
        .progress-box {
          display: none;
        }

        .audio-controls {
          .option-btn, .next-btn {
            display: none;
          }
        }
      }

      .close-confirm-box {
        top: -72px;
        right: 0px;
        position: absolute;
        width: 130px;
        height: 70px;
        display: flex;
        flex-wrap: wrap;
        background: rgba(250, 250, 250, 1.0);
        box-shadow: 0px 0px 3px 2px rgba(180, 180, 180, 0.4);
        font-size: 14px;
        border-radius: 5px;
        .container {
          .first-line {
            padding-top: 10px;
            padding-left: 10px;
            padding-right: 7px;
          }
          .second-line {
            margin-top: 10px;
            display: flex;
            flex-wrap: nowrap;
            .cancle-btn, .confirm-btn {
              cursor: pointer;
              margin-left: 10px;
            }
            .confirm-btn {
              border-radius: 2px;
              padding-left: 5px;
              padding-right: 5px;
              line-height: 20px;
              background-color: rgba(100, 100, 100, 1.0);
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
  }

  @media screen and (min-width: 576px) and (max-width: 1139.98px) {
    .container {
      .audio-box-expand, .audio-box {
        display: flex;
        flex-wrap: nowrap;
        background: rgba(250, 250, 250, 1.0);
        border-radius: 60px;
        height: 60px;
        width: 460px;
        box-shadow: 0px 0px 3px 2px rgba(180, 180, 180, 0.6);
        align-items: center;
        overflow: hidden;
        transition: all .5s ease;
        -webkit-transition: all .5s ease; /* Safari */
        -moz-transition: all .5s ease;
        -o-transition: all .5s ease;

        .cover-img-box {
          cursor: pointer;
          margin-left: 7px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(150, 150, 150, 1.0);
          overflow: hidden;
          box-shadow: 0px 4px 8px rgba(100, 100, 100, 0.2);
          img {
            cursor: pointer;
            width: 50px;
            height: 50px;
          }

          .rotate-img {
            -webkit-animation: loader 10s linear infinite; /*Safari and Chrome*/
            animation: loader 10s linear infinite; /*IE9以上支持*/
            -o-animation: loader 10s linear infinite;
            -moz-animation: loader 10s linear infinite;
          }
        }

        .progress-box {
          margin-left: 15px;
          margin-top: 8px;
          display: flex;
          flex-wrap: nowrap;
          .progress-bar {
            cursor: pointer;
            width: 120px;
            height: 5px;
            background: rgba(20, 20, 20, 0.2);
            border-radius: 5px;
            display: flex;
            flex-wrap: nowrap;
            .current-bar {
              height: 5px;
              margin-right: 0px;
              background: rgba(20, 20, 20, 0.4);
              border-radius: 1px;
              transition: background-color .5s ease;
              -webkit-transition: background-color .5s ease; /* Safari */
              -moz-transition: background-color .5s ease;
              -o-transition: background-color .5s ease;
            }
            .current-point {
              margin-left: -6.5px;
              margin-top: -4px;
              width: 13px;
              height: 13px;
              .tag_inner {
                background: rgba(100, 100, 100, 1.0);
                border-radius: 50%;
                width: 13px;
                height: 13px;
                transition: background-color .5s ease;
                -webkit-transition: background-color .5s ease; /* Safari */
                -moz-transition: background-color .5s ease;
                -o-transition: background-color .5s ease;
                text-align: center;

                i {
                  font-size: 13px;
                  position: relative;
                  top: -2px;
                  color: rgba(250, 250, 250, 1.0);

                }
              }
            }
            &:hover {
              .current-bar {
                background: rgba(20, 20, 20, 1.0);
              }
              .current-point {
                .tag_inner {
                  background: rgba(20, 20, 20, 1.0);
                }
              }
            }
          }

          .audio-time-box {
            margin-left: 10px;
            margin-top: -5px;
            display: flex;
            flex-wrap: nowrap;
            font-size: 14px;
            font-weight: bold;
            line-height: 14px;
          }
        }

        .audio-controls {
          display: flex;
          text-align: center;
          margin-left: 0px;
          .option-btn, .next-btn, .play-btn, .pause-btn, .loading-btn, .close-btn {
            cursor: pointer;
            font-weight: bold;
            color: rgba(20, 20, 20, 0.7);
            transition: color .5s ease;
            -webkit-transition: color .5s ease; /* Safari */
            -moz-transition: color .5s ease;
            -o-transition: color .5s ease;
            &:hover {
              color: rgba(20, 20, 20, 0.95);
            }
          }
          .next-btn {
            margin-left: 10px;
            font-size: 30px;
            line-height: 40px;
          }

          .option-btn {
            font-size: 15px;
            margin-left: 10px;
            line-height: 40px;
          }
          .play-btn, .pause-btn {
            margin-left: 20px;
            font-size: 30px;
            line-height: 40px;
          }

          .close-btn {
            margin-left: 10px;
            font-size: 35px;
            line-height: 35px;
          }
        }
      }

      .audio-box {
        width: 160px;
        .progress-box {
          display: none;
        }

        .audio-controls {
          .option-btn, .next-btn {
            display: none;
          }
        }
      }

      .close-confirm-box {
        top: -75px;
        right: 0px;
        position: absolute;
        width: 120px;
        height: 70px;
        display: flex;
        flex-wrap: wrap;
        background: rgba(250, 250, 250, 1.0);
        box-shadow: 0px 0px 3px 2px rgba(180, 180, 180, 0.4);
        font-size: 14px;
        border-radius: 5px;
        .container {
          .first-line {
            padding-top: 10px;
            padding-left: 10px;
            padding-right: 7px;
          }
          .second-line {
            margin-top: 10px;
            display: flex;
            flex-wrap: nowrap;
            .cancle-btn, .confirm-btn {
              cursor: pointer;
              margin-left: 10px;
            }
            .confirm-btn {
              border-radius: 2px;
              padding-left: 5px;
              padding-right: 5px;
              line-height: 20px;
              background-color: rgba(100, 100, 100, 1.0);
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
  }

  @media screen and (max-width: 575.98px) {
    .container {
      .audio-box-expand, .audio-box {
        display: flex;
        flex-wrap: nowrap;
        background: rgba(250, 250, 250, 1.0);
        border-radius: 53px;
        height: 53px;
        width: 380px;
        box-shadow: 0px 0px 3px 2px rgba(180, 180, 180, 0.6);
        align-items: center;
        overflow: hidden;
        transition: all .5s ease;
        -webkit-transition: all .5s ease; /* Safari */
        -moz-transition: all .5s ease;
        -o-transition: all .5s ease;

        .cover-img-box {
          cursor: pointer;
          margin-left: 4px;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: rgba(150, 150, 150, 1.0);
          overflow: hidden;
          box-shadow: 0px 4px 8px rgba(100, 100, 100, 0.2);
          img {
            cursor: pointer;
            width: 45px;
            height: 45px;
          }

          .rotate-img {
            -webkit-animation: loader 10s linear infinite; /*Safari and Chrome*/
            animation: loader 10s linear infinite; /*IE9以上支持*/
            -o-animation: loader 10s linear infinite;
            -moz-animation: loader 10s linear infinite;
          }
        }

        .progress-box {
          margin-left: 15px;
          margin-top: 8px;
          display: flex;
          flex-wrap: nowrap;
          .progress-bar {
            cursor: pointer;
            width: 80px;
            height: 5px;
            background: rgba(20, 20, 20, 0.2);
            border-radius: 5px;
            display: flex;
            flex-wrap: nowrap;
            .current-bar {
              height: 5px;
              margin-right: 0px;
              background: rgba(20, 20, 20, 0.4);
              border-radius: 1px;
              transition: background-color .5s ease;
              -webkit-transition: background-color .5s ease; /* Safari */
              -moz-transition: background-color .5s ease;
              -o-transition: background-color .5s ease;
            }
            .current-point {
              margin-left: -6.5px;
              margin-top: -4px;
              width: 13px;
              height: 13px;
              .tag_inner {
                background: rgba(100, 100, 100, 1.0);
                border-radius: 50%;
                width: 13px;
                height: 13px;
                transition: background-color .5s ease;
                -webkit-transition: background-color .5s ease; /* Safari */
                -moz-transition: background-color .5s ease;
                -o-transition: background-color .5s ease;
                text-align: center;

                i {
                  font-size: 13px;
                  position: relative;
                  top: -2px;
                  color: rgba(250, 250, 250, 1.0);

                }
              }
            }
            &:hover {
              .current-bar {
                background: rgba(20, 20, 20, 1.0);
              }
              .current-point {
                .tag_inner {
                  background: rgba(20, 20, 20, 1.0);
                }
              }
            }
          }

          .audio-time-box {
            margin-left: 5px;
            margin-top: -5px;
            display: flex;
            flex-wrap: nowrap;
            font-size: 12px;
            font-weight: bold;
            line-height: 14px;
          }
        }

        .audio-controls {
          display: flex;
          text-align: center;
          margin-left: 0px;
          .option-btn, .next-btn, .play-btn, .pause-btn, .loading-btn, .close-btn {
            cursor: pointer;
            font-weight: bold;
            color: rgba(20, 20, 20, 0.7);
            transition: color .5s ease;
            -webkit-transition: color .5s ease; /* Safari */
            -moz-transition: color .5s ease;
            -o-transition: color .5s ease;
            &:hover {
              color: rgba(20, 20, 20, 0.95);
            }
          }

          .option-btn {
            font-size: 12px;
            margin-left: 5px;
            line-height: 45px;
          }

          .play-btn,.pause-btn {
            margin-left: 25px;
            font-size: 25px;
            line-height: 45px;
          }

          .next-btn {
            margin-left: 15px;
            font-size: 25px;
            line-height: 45px;
          }

          .close-btn {
            margin-left: 20px;
            font-size: 30px;
            line-height: 45px;
          }
        }
      }
      .audio-box-expand {
        margin-left: -220px;
      }
      .audio-box {
        width: 160px;
        .progress-box {
          display: none;
        }

        .audio-controls {
          .option-btn, .next-btn {
            display: none;
          }
        }
      }

      .close-confirm-box {
        top: -75px;
        right: 0px;
        position: absolute;
        width: 120px;
        height: 70px;
        display: flex;
        flex-wrap: wrap;
        background: rgba(250, 250, 250, 1.0);
        box-shadow: 0px 0px 3px 2px rgba(180, 180, 180, 0.4);
        font-size: 14px;
        border-radius: 5px;
        .container {
          .first-line {
            padding-top: 10px;
            padding-left: 10px;
            padding-right: 7px;
          }
          .second-line {
            margin-top: 10px;
            display: flex;
            flex-wrap: nowrap;
            .cancle-btn, .confirm-btn {
              cursor: pointer;
              margin-left: 10px;
            }
            .confirm-btn {
              border-radius: 2px;
              padding-left: 5px;
              padding-right: 5px;
              line-height: 20px;
              background-color: rgba(100, 100, 100, 1.0);
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
  }

  @keyframes loader {
    0% {
      -webkit-transform: rotate(0deg) translateZ(0);
      transform: rotate(0deg) translateZ(0);
    }
    100% {
      -webkit-transform: rotate(360deg) translateZ(0);
      transform: rotate(360deg) translateZ(0);
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
