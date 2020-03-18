<template>
  <section class="activity-box-container">
    <div class="activity-box">
      <div class="box-wrap">
        <div :class="openFlag?'scroll-top':'scroll-top-hide'"><img
          v-lazy="'static/images/homepage/activity/lunar-newyear-bg-01.png'"></div>

        <div :class="openFlag?'scroll-container':'scroll-container-hide'">
          <div class="scroll-wrap" v-lazy:background-image="'static/images/homepage/activity/lunar-newyear-bg-02.png'">
            <div class="scroll-box" @click.stop="handleClickScrollBox">
              <div :class="openFlag?'year-num':'year-num-hide'"><img
                v-lazy="'static/images/homepage/activity/lunar-newyear-02.png'"></div>
              <div :class="openFlag?'new-year':'new-year-hide'"><img
                v-lazy="'static/images/homepage/activity/lunar-newyear-03.png'"></div>
              <div :class="openFlag?'light-left':'light-left-hide'"><img
                v-lazy="'static/images/homepage/activity/lunar-newyear-01.png'"></div>
              <div :class="openFlag?'light-right':'light-right-hide'"><img
                v-lazy="'static/images/homepage/activity/lunar-newyear-01.png'"></div>
              <div :class="openFlag?'flower':'flower-hide'"><img
                v-lazy="'static/images/homepage/activity/lunar-newyear-06.png'"></div>
              <div :class="openFlag?'mouse':'mouse-hide'"><img
                v-lazy="'static/images/homepage/activity/lunar-newyear-08.png'"></div>
              <div :class="showCannonFlag?'cannon-box':'cannon-box-hide'">
                <div class="cannon" v-for="(item,index) in cannonInfo" @click.stop="handleClickCannon(index)"><img
                  :src="item.shootFlag? 'static/images/homepage/activity/lunar-newyear-07-1.png':'static/images/homepage/activity/lunar-newyear-07.png'">
                </div>
              </div>
              <div class="fire-eff-box" v-if="showCannonFlag">
                <div class="fire-eff" v-for="(item,index) in cannonInfo" v-if="item.showFlag" :style="item.style">
                  <img :class="'fire-ori'+'-'+index" v-if="item.fireFlag"
                       src="static/images/homepage/activity/lunar-newyear-09.png">
                  <img :class="'fire-boom'+'-'+index" v-if="item.boomFlag"
                       :src="'static/images/homepage/activity/lunar-newyear-07-2.gif'+'?'+Math.random()">
                </div>
              </div>
              <div :class="openFlag?'cloud-1':'cloud-1-hide'"><img
                v-lazy="'static/images/homepage/activity/lunar-newyear-05.png'"></div>
              <div :class="openFlag?'cloud-2':'cloud-2-hide'"><img
                v-lazy="'static/images/homepage/activity/lunar-newyear-05.png'"></div>

            </div>
          </div>
        </div>

        <div :class="openFlag?'scroll-bottom':'scroll-bottom-hide'"><img
          v-lazy="'static/images/homepage/activity/lunar-newyear-bg-01.png'"></div>

        <div :class="openFlag?'open-btn-hide':'open-btn'" @click.stop="handleClickOpen"><img
          v-lazy="'static/images/homepage/activity/lunar-newyear-bg-04.png'"></div>

        <div :class="openFlag?'close-btn':'close-btn-hide'" @click.stop="handleClickClose"><img
          v-lazy="'static/images/homepage/activity/lunar-newyear-bg-03.png'"></div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "lunar-newyear",
    components: {},
    props: {},

    data() {
      return {
        openFlag: false,
        showCannonFlag: false,
        isShootingFlag: false,
        cannonInfo: [
          {
            shootFlag: false,
            showFlag: false,
            fireFlag: false,
            boomFlag: false,
            posX: 263,
            posY: 100,
            style: '',
          },
          {
            shootFlag: false,
            showFlag: false,
            fireFlag: false,
            boomFlag: false,
            posX: 304,
            posY: 100,
            style: '',
          },
          {
            shootFlag: false,
            showFlag: false,
            fireFlag: false,
            boomFlag: false,
            posX: 346,
            posY: 100,
            style: '',
          },
          {
            shootFlag: false,
            showFlag: false,
            fireFlag: false,
            boomFlag: false,
            posX: 386,
            posY: 100,
            style: '',
          },
          {
            shootFlag: false,
            showFlag: false,
            fireFlag: false,
            boomFlag: false,
            posX: 428,
            posY: 100,
            style: '',
          },
        ],
      }
    },

    created() {

    },

    mounted() {

    },

    computed: {},

    watch: {},

    methods: {
      handleClickOpen() {
        this.openFlag = true;
      },
      handleClickClose() {
        this.$emit('close');
        // this.openFlag = !this.openFlag;
      },
      handleClickScrollBox() {
        // setTimeout(function () {
        //   var _this= this;
        //   _this.showCannonFlag = true;
        //   console.log(_this.showCannonFlag);
        // }, 800);
        if (!this.showCannonFlag) {
          this.showCannonFlag = true;
          return;
        }
        if (this.isShootingFlag) return;
        let shootIndex = -1;
        for (let i = 0; i < this.cannonInfo.length; i++) {
          if (!this.cannonInfo[i].shootFlag) {
            shootIndex = i;
            break;
          }
        }
        if (shootIndex >= 0) {
          this.handleClickCannon(shootIndex);
        }
        else {
          this.shootAllAndResetCannon();
        }
      },
      handleClickCannon(index) {
        if (this.isShootingFlag) return;
        if (!this.cannonInfo[index].shootFlag) {
          this.cannonInfo[index].shootFlag = true;
          this.showFireEff(index);
        } else {
          let shootIndex = -1;
          for (let i = 0; i < this.cannonInfo.length; i++) {
            if (!this.cannonInfo[i].shootFlag) {
              shootIndex = i;
              break;
            }
          }
          if (shootIndex < 0) {
            this.shootAllAndResetCannon();
          }
        }
      },
      shootAllAndResetCannon() {
        if (this.isShootingFlag) return;
        this.isShootingFlag = true;
        for (let i = 0; i < this.cannonInfo.length; i++) {
          this.cannonInfo[i].showFlag = this.cannonInfo[i].fireFlag = true;
          this.cannonInfo[i].boomFlag = false;
        }

        var _this = this;
        setTimeout(function () {
          for (let i = 0; i < _this.cannonInfo.length; i++) {
            _this.cannonInfo[i].fireFlag = false;
            _this.cannonInfo[i].boomFlag = true;
          }
        }, 1000);
        setTimeout(function () {
          for (let i = 0; i < _this.cannonInfo.length; i++) {
            _this.cannonInfo[i].shootFlag = _this.cannonInfo[i].boomFlag = _this.cannonInfo[i].showFlag = false;
          }
          _this.isShootingFlag = false;
        }, 1850);
      },

      showFireEff(index) {
        this.isShootingFlag = true;
        this.cannonInfo[index].showFlag = this.cannonInfo[index].fireFlag = true;
        this.cannonInfo[index].boomFlag = false;
        this.cannonInfo[index].style = 'margin-left:' + this.cannonInfo[index].posX + 'px;' + 'margin-top:' + this.cannonInfo[index].posY + 'px;';

        var _this = this;
        setTimeout(function () {
          _this.cannonInfo[index].fireFlag = false;
          _this.cannonInfo[index].boomFlag = true;
        }, 1000);
        setTimeout(function () {
          _this.isShootingFlag = _this.cannonInfo[index].boomFlag = _this.cannonInfo[index].showFlag = false;
        }, 1850);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .activity-box-container {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 6000;
    background-color: rgba(0, 0, 0, 0.75);
    .activity-box {
      margin: 12.5% auto;
      width: 800px;
      height: 600px;
      overflow: hidden;
      display: flex;
      .box-wrap {
        .scroll-top, .scroll-bottom, .scroll-container, .close-btn {
          transition: all .5s ease;
          -webkit-transition: all .5s ease; /* Safari */
          -moz-transition: all .5s ease;
        }

        .scroll-bottom, .scroll-bottom-hide {
          transform: rotateX(180deg);
        }
        .scroll-top-hide {
          margin-top: 200px;
        }
        .scroll-bottom-hide {
          margin-top: 0px;
        }

        .scroll-container-hide {
          height: 0px;
          .scroll-wrap {
            height: 0px;
            .scroll-box {
              height: 0px;
            }
          }
        }
        .scroll-container {
          height: 445px;
          .scroll-wrap {
            height: 100%;
            .scroll-box {
              height: 437px;
            }
          }
        }
        .scroll-container, .scroll-container-hide {
          margin: 0px auto;
          width: 702px;
          overflow: hidden;
          .scroll-wrap {
            margin: 0px auto;
            width: 100%;
            overflow: hidden;
            .scroll-box {
              width: 692px;
              margin-left: 6px;
              margin-top: 4px;
              overflow: hidden;
              position: absolute;

              .year-num, .new-year, .light-left, .light-right, .flower, .mouse, .cannon-box, .cloud-1, .cloud-2, .year-num-hide, .new-year-hide, .light-left-hide, .light-right-hide, .flower-hide, .mouse-hide, .cannon-box-hide, .cloud-1-hide, .cloud-2-hide {
                position: absolute;
                transition: all .8s ease;
                -webkit-transition: all .8s ease; /* Safari */
                -moz-transition: all .8s ease;
              }

              .year-num-hide {
                margin-left: 215px;
                margin-top: -200px;
              }
              .year-num {
                margin-left: 215px;
                margin-top: 100px;
              }

              .new-year-hide {
                margin-left: 240px;
                margin-top: -150px;
              }
              .new-year {
                margin-left: 240px;
                margin-top: 200px;
              }

              .light-left-hide {
                margin-left: 105px;
                margin-top: -200px;
              }
              .light-left {
                margin-left: 105px;
                margin-top: 0px;
              }

              .light-right-hide {
                margin-left: 495px;
                margin-top: -200px;
              }
              .light-right {
                margin-left: 495px;
                margin-top: 0px;
              }

              .flower-hide {
                left: -100px;
                margin-top: 0px;
              }
              .flower {
                left: 0px;
                margin-top: 242px;
              }

              .mouse-hide {
                right: -100px;
                margin-top: 0px;
              }
              .mouse {
                right: 0px;
                margin-top: 222px;
              }

              .cannon-box-hide, .cannon-box {
                display: flex;
                flex-wrap: nowrap;
                .cannon {
                  margin-left: 20px;
                  cursor: pointer;
                  z-index: 6001;
                }
              }

              .cannon-box-hide {
                margin-left: 240px;
                bottom: -50px;
              }
              .cannon-box {
                margin-left: 240px;
                bottom: -2px;
              }

              .cloud-1-hide {
                margin-left: 105px;
                margin-top: -100px;
              }
              .cloud-1 {
                margin-left: 105px;
                margin-top: 20px;
                -o-animation: cloud 20s linear infinite;
                -moz-animation: cloud 20s linear infinite;
                -webkit-animation: cloud 20s linear infinite; /*Safari and Chrome*/
                animation: cloud 20s linear infinite; /*IE9以上支持*/
              }

              .cloud-2-hide {
                margin-left: 400px;
                margin-top: -150px;
              }
              .cloud-2 {
                margin-left: 400px;
                margin-top: 200px;
                -o-animation: cloud 40s linear infinite;
                -moz-animation: cloud 40s linear infinite;
                -webkit-animation: cloud 40s linear infinite; /*Safari and Chrome*/
                animation: cloud 40s linear infinite; /*IE9以上支持*/
              }

              .fire-eff-box {
                position: absolute;
                .fire-eff {
                  position: absolute;
                  .fire-ori-0, .fire-ori-3 {
                    -o-animation: fire_1 1s linear;
                    -moz-animation: fire_1 1s linear;
                    -webkit-animation: fire_1 1s linear; /*Safari and Chrome*/
                    animation: fire_1 1s linear; /*IE9以上支持*/
                  }
                  .fire-ori-1, .fire-ori-4 {
                    -o-animation: fire_2 1s linear;
                    -moz-animation: fire_2 1s linear;
                    -webkit-animation: fire_2 1s linear; /*Safari and Chrome*/
                    animation: fire_2 1s linear; /*IE9以上支持*/
                  }
                  .fire-ori-2 {
                    -o-animation: fire_3 1s linear;
                    -moz-animation: fire_3 1s linear;
                    -webkit-animation: fire_3 1s linear; /*Safari and Chrome*/
                    animation: fire_3 1s linear; /*IE9以上支持*/
                  }
                  .fire-boom-0, .fire-boom-1, .fire-boom-2, .fire-boom-3, .fire-boom-4 {
                    position: absolute;
                    -moz-animation: boom 0.85s linear;
                    -o-animation: boom 0.85s linear;
                    -webkit-animation: boom 0.85s linear; /*Safari and Chrome*/
                    animation: boom 0.85s linear; /*IE9以上支持*/
                  }

                  .fire-boom-0 {
                    margin-left: -90px;
                    margin-top: 30px;
                    width: 200px;
                    height: 200px;
                  }
                  .fire-boom-1 {
                    margin-left: -80px;
                    margin-top: 0px;
                    width: 170px;
                    height: 170px;
                  }
                  .fire-boom-2 {
                    margin-left: -120px;
                    margin-top: -100px;
                    width: 250px;
                    height: 250px;
                  }
                  .fire-boom-3 {
                    margin-left: -100px;
                    margin-top: 50px;
                    width: 200px;
                    height: 200px;
                  }
                  .fire-boom-4 {
                    margin-left: -100px;
                    margin-top: 0px;
                    width: 220px;
                    height: 220px;
                  }
                }
              }
            }
          }
        }

        .open-btn, .open-btn-hide {
          position: absolute;
          margin-left: 320px;
          margin-top: -100px;
        }
        .open-btn-hide {
          opacity: 0;
          transition: opacity .2s ease;
          -webkit-transition: opacity .2s ease; /* Safari */
          -moz-transition: opacity .2s ease;
        }
        .open-btn {
          opacity: 1;
          cursor: pointer;
          img {
            &:hover {
              width: 102%;
              height: 102%;
            }
          }
        }

        .close-btn, .close-btn-hide {
          cursor: pointer;
          position: absolute;
          margin-left: 685px;
          img {
            &:hover {
              width: 102%;
              height: 102%;
            }
          }
        }
        .close-btn-hide {
          margin-top: -195px;
        }
        .close-btn {
          margin-top: -640px;
        }
      }
    }
  }

  @keyframes cloud {
    0% {
      -moz-transform: translateX(0px);
      -o-transform: translateX(0px);
      -webkit-transform: translateX(0px);
      transform: translateX(0px);
    }
    50% {
      -moz-transform: translateX(50px);
      -o-transform: translateX(50px);
      -webkit-transform: translateX(50px);
      transform: translateX(50px);
    }
    100% {
      -moz-transform: translateX(0px);
      -o-transform: translateX(0px);
      -webkit-transform: translateX(0px);
      transform: translateX(0px);
    }
  }

  @keyframes fire_1 {
    0% {
      -moz-transform: translateY(300px);
      -o-transform: translateY(300px);
      -webkit-transform: translateY(300px);
      transform: translateY(300px);
    }
    100% {
      -moz-transform: translateY(150px);
      -o-transform: translateY(150px);
      -webkit-transform: translateY(150px);
      transform: translateY(150px);
    }
  }

  @keyframes fire_2 {
    0% {
      -moz-transform: translateY(300px);
      -o-transform: translateY(300px);
      -webkit-transform: translateY(300px);
      transform: translateY(300px);
    }
    100% {
      -moz-transform: translateY(80px);
      -o-transform: translateY(80px);
      -webkit-transform: translateY(80px);
      transform: translateY(80px);
    }
  }

  @keyframes fire_3 {
    0% {
      -moz-transform: translateY(300px);
      -o-transform: translateY(300px);
      -webkit-transform: translateY(300px);
      transform: translateY(300px);
    }
    100% {
      -o-transform: translateY(0px);
      -moz-transform: translateY(0px);
      -webkit-transform: translateY(0px);
      transform: translateY(0px);
    }
  }
</style>
