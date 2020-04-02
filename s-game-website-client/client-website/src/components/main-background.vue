<template>
  <div class="background-container">

    <div class="background-wrap" :style="'opacity:'+currentBackgroundOpacity+';'">
      <div class="background-stars-container">
        <div id="starsBgImg"/>
        <canvas id="starsBgCanvas" style="display: none"></canvas>
      </div>

      <div class="bling-star-container" id="blingStarContainer">
      </div>

      <div class="background-nebulas-container">
        <div id="nebulaBgImg"/>
        <canvas id="nebulaBgCanvas" style="display: none"></canvas>
      </div>

      <div class="background-planets-container">
        <canvas id="planetBgCanvas" style="display: none"></canvas>
        <canvas id="planetMaskCanvas" style="display: none"></canvas>
        <div id="planetsContainer"></div>
      </div>

      <div class="background-asteroids-container">
        <div id="asteroidsBgImg"/>
        <canvas id="asteroidsBgCanvas" style="display: none"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "main-background",

    data() {
      return {
        preloadImgsCount: 0,
        preloadImgsPercent: '',
        planetCurrentRotate: 0,
        planetRotateSpeed: 0.1,
        moonCurrentRotate: 0,
        moonRotateSpeed: 0.15,
        switchBgTimer: 0,

        currentBackgroundOpacity: 1.0,
        bgFadeInterval: 50,
        bgFadeSpeed: 0.05,
        playBgFadeAnimFlag: false,

        createBlingStarInterval: 5000,
        pauseBlingStarFlag: false,
        shadowUrl: 'static/images/homepage/bg-shadow.png',
        randomPlanetBgIndexAry: [],
        srcImgUrl: [
          {
            url: 'static/images/homepage/bg-star.png',
            perCutHeight: 256,
            finalCombainRowNum: 8,
            finalCombainLineNum: 5,
            maxRandomIndex: 15,
            imgCanvasId: 'starsBgCanvas',
            imgId: 'starsBgImg',
          },
          {
            url: 'static/images/homepage/bg-asteroid.png',
            perCutHeight: 256,
            finalCombainRowNum: 8,
            finalCombainLineNum: 5,
            maxRandomIndex: 15,
            imgCanvasId: 'asteroidsBgCanvas',
            imgId: 'asteroidsBgImg',
            probability: 25,
            scaleAdjustNum: 0.5,
          },
          {
            url: 'static/images/homepage/bg-nebula.png',
            perCutHeight: 128,
            finalCombainRowNum: 1,
            finalCombainLineNum: 1,
            maxRandomIndex: 8,
            imgCanvasId: 'nebulaBgCanvas',
            imgId: 'nebulaBgImg',
          },
          {
            url: 'static/images/homepage/bg-planet.jpg',
            perCutHeight: 64,
            maxRandomIndex: 11,
          },
        ],
        srcStarBlingGifUrl: [
          'static/images/homepage/star-0.gif',
          'static/images/homepage/star-1.gif',
          'static/images/homepage/star-2.gif',
          'static/images/homepage/star-3.gif',
        ],
      }
    },

    computed: {
      ...mapState({
        switchBackgroundStarsFlag: state => state.user.switchBackgroundStarsFlag,
      }),
    },

    mounted: function () {
      this.rebuildUnivese(true);
      this.playStarBlingAnim();
    },

    watch: {
      switchBackgroundStarsFlag: function () {
        this.rebuildUnivese(false);
      }
    },

    methods: {
      async rebuildUnivese(skipFadeAnim) {
        if (this.playBgFadeAnimFlag) return;
        this.pauseBlingStarFlag = true;
        this.preloadImgsCount = 0;
        this.$store.state.loading.isLoading = true;
        for (let i = 0; i < this.srcImgUrl.length; i++) {
          let item = this.srcImgUrl[i];
          let image = new Image();
          image.src = item.url;
          image.setAttribute("crossOrigin", 'Anonymous');
          image.onload = async () => {
            if (i === 3) {
              let shadowImg = new Image();
              shadowImg.src = this.shadowUrl;
              shadowImg.setAttribute("crossOrigin", 'Anonymous');
              shadowImg.onload = async () => {
                await this.createPlanetAndMoon(image, item.perCutHeight, item.maxRandomIndex, shadowImg);
              }
            } else {
              await this.cutAndCombainImg(image, item.perCutHeight, item.finalCombainRowNum, item.finalCombainLineNum, item.maxRandomIndex, item.imgCanvasId, item.imgId, item.probability, item.scaleAdjustNum);
            }
            this.preloadImgsCount++;
            // 计算图片加载的百分数，绑定到percent变量
            let percentNum = Math.floor(this.preloadImgsCount / this.srcImgUrl.length * 100);
            this.preloadImgsPercent = `${percentNum}%`;
          }
        }
        this.pauseBlingStarFlag = false;
        if (!skipFadeAnim) this.backgroundFadeInFadeOutAnim();
        this.$store.state.loading.isLoading = false;
      },

      backgroundFadeInFadeOutAnim() {
        this.playBgFadeAnimFlag = true;
        this.currentBackgroundOpacity = 0;
        const that = this;
        let timer = setInterval(() => {
          that.currentBackgroundOpacity += that.bgFadeSpeed;
          if (that.currentBackgroundOpacity >= 1.0) {
            that.currentBackgroundOpacity = 1.0;
            that.bgFadeInFlag = true;
            that.playBgFadeAnimFlag = false;
          }
          if (!that.playBgFadeAnimFlag) {
            clearInterval(timer);
          }
        }, that.bgFadeInterval);
      },


      playStarBlingAnim() {
        //每隔一定时间在随机区域播放5-7处星星闪烁Gif
        const that = this;
        setInterval(() => {
          if (that.pauseBlingStarFlag) return;
          let starContent = document.getElementById('blingStarContainer');
          this.removeAllChildEle(starContent);
          let starCount = Math.ceil(Math.random() * 3) + 1;
          for (let i = 0; i < starCount; i++) {
            let starEle = document.createElement('IMG');
            let randomUrlIndex = Math.ceil(Math.random() * this.srcStarBlingGifUrl.length) - 1;
            if (this.srcStarBlingGifUrl[randomUrlIndex]) {
              starEle.src = this.srcStarBlingGifUrl[randomUrlIndex] + '?' + Math.random();
              starEle.style.position = "absolute";
              let leftStarPos = Math.ceil(Math.random() * 90);
              let topStarPos = Math.ceil(Math.random() * 90);
              starEle.style.left = leftStarPos + '%';
              starEle.style.top = topStarPos + '%';
              starContent.appendChild(starEle);
            }
          }
        }, that.createBlingStarInterval);
      },

      async cutAndCombainImg(srcImg, srcImgPerCutHeight, finalImgRowNum, finalImgLineNum, maxRandomIndex, imgCanvasId, finalImgId, probability, scaleAdjustNum, scaleNum) {
        //将背景图资源剪切成多块，随机取出，拼贴形成新的背景图
        let imgCanvas = document.getElementById(imgCanvasId);
        let canvasContext = imgCanvas.getContext("2d");
        imgCanvas.width = finalImgRowNum * srcImg.width;
        imgCanvas.height = finalImgLineNum * srcImgPerCutHeight;
        for (let i = 0; i < finalImgRowNum; i++) {
          for (let j = 0; j < finalImgLineNum; j++) {
            if (probability) {
              let randomPro = Math.ceil(Math.random() * 100);
              if (randomPro >= probability) continue;
            }
            let scaleNum = 1.0;
            if (scaleAdjustNum) {
              scaleNum = (scaleNum - scaleAdjustNum) + Math.random() * scaleAdjustNum * 2;
            }
            let randomIndex = Math.floor(Math.random() * (maxRandomIndex + 1));
            canvasContext.drawImage(srcImg, 0, srcImgPerCutHeight * randomIndex, srcImg.width, srcImgPerCutHeight, i * srcImg.width, j * srcImgPerCutHeight, srcImg.width * scaleNum, srcImgPerCutHeight * scaleNum);
          }
        }
        let finalImg = document.getElementById(finalImgId);
        // finalImg.src = imgCanvas.toDataURL("image/png");
        // finalImg.style.backgroundRepeat = "no-repeat";//设置背景不平铺
        // finalImg.style.backgroundPosition = "center";//设置背景图的位置
        // finalImg.style.backgroundSize = "cover";//设置背景图像的尺寸
        finalImg.style.backgroundImage = 'url("' + imgCanvas.toDataURL("image/png") + '")';//设置背景图的的地址
      },

      async createPlanetAndMoon(srcImg, srcImgPerCutHeight, maxRandomIndex, shadowImg) {
        let planetContent = document.getElementById('planetsContainer');
        this.removeAllChildEle(planetContent);
        let imgCanvas = document.getElementById('planetBgCanvas');
        let maskCanvas = document.getElementById('planetMaskCanvas');
        imgCanvas.width = srcImg.width;
        imgCanvas.height = srcImgPerCutHeight;
        maskCanvas.width = maskCanvas.height = srcImgPerCutHeight;
        let canvasContext = imgCanvas.getContext("2d");
        let maskCanvasContext = maskCanvas.getContext("2d");
        let moonCount = 0;
        if (document.body.scrollWidth < 576) {
          moonCount = Math.ceil(Math.random() * 2);
        } else {
          moonCount = Math.ceil(Math.random() * 3);
        }
        let randomBgIndex = 0;
        this.setRandomPlanetBgIndex(maxRandomIndex);

        let leftPlanetPos = 30 + Math.ceil(Math.random() * 40);
        let topPlanetPos = 30 + Math.ceil(Math.random() * 40);
        let randomIndex = this.randomPlanetBgIndexAry[randomBgIndex];
        randomBgIndex++;
        canvasContext.drawImage(srcImg, 0, srcImgPerCutHeight * randomIndex, srcImg.width, srcImgPerCutHeight, 0, 0, srcImg.width, srcImgPerCutHeight);
        maskCanvasContext.drawImage(shadowImg, 0, 0, 64, 64, 0, 0, srcImgPerCutHeight, srcImgPerCutHeight);

        let scaleNum = 0.5;
        if (document.body.scrollWidth < 576) {
          scaleNum = 0.5 + Math.random() *0.5;
        } else {
          scaleNum = 1 + Math.random() * 0.575;
        }

        let planetWidth = srcImgPerCutHeight * scaleNum;
        let bgWidth = srcImg.width * scaleNum;
        let plantDiv = document.createElement('DIV');
        //1920X1080 30%-70% 范围内随机位置
        plantDiv.style.borderRadius = '50%';
        plantDiv.style.overflow = 'hidden';
        plantDiv.style.position = 'absolute';
        plantDiv.style.height = plantDiv.style.width = planetWidth + 'px';
        plantDiv.style.left = leftPlanetPos + '%';
        plantDiv.style.top = topPlanetPos + '%';
        // plantDiv.style.border = '1px solid rgba(0, 0, 0, 0.9)';
        // plantDiv.style.boxShadow = ' 4px 4px 14px rgba(0, 0, 0, 0.2)';
        planetContent.appendChild(plantDiv);

        let planetBgImg = new Image();
        let planetMaskImg = new Image();
        planetBgImg.src = imgCanvas.toDataURL("image/png");
        planetMaskImg.src = maskCanvas.toDataURL("image/png");
        planetMaskImg.style.width = planetMaskImg.style.height = planetBgImg.style.height = plantDiv.style.height;
        planetBgImg.style.width = bgWidth + 'px';
        planetMaskImg.style.position = planetBgImg.style.position = 'absolute';
        plantDiv.appendChild(planetBgImg);
        plantDiv.appendChild(planetMaskImg);
        this.planetRotateAnim(planetBgImg, true);

        for (let j = 0; j < moonCount; j++) {
          let leftPos = (leftPlanetPos - 35) + Math.ceil(Math.random() * 70);
          let topPos = (topPlanetPos - 35) + Math.ceil(Math.random() * 70);
          if (leftPos < 0 || topPos < 0) continue;

          let randomIndex = this.randomPlanetBgIndexAry[randomBgIndex];
          randomBgIndex++;
          canvasContext.drawImage(srcImg, 0, srcImgPerCutHeight * randomIndex, srcImg.width, srcImgPerCutHeight, 0, 0, srcImg.width, srcImgPerCutHeight);

          let scaleNum = 0.5;
          if (document.body.scrollWidth < 576) {
            scaleNum = 0.175 + Math.random() * 0.25;
          } else {
            scaleNum = 0.25 + Math.random() * 0.625;
          }

          let moonWidth = srcImgPerCutHeight * scaleNum;
          let bgWidth = srcImg.width * scaleNum;
          let moonDiv = document.createElement('DIV');
          //1920X1080 30%-70% 范围内随机位置

          moonDiv.style.borderRadius = '50%';
          moonDiv.style.overflow = 'hidden';
          moonDiv.style.position = 'absolute';
          moonDiv.style.height = moonDiv.style.width = moonWidth + 'px';
          moonDiv.style.left = leftPos + '%';
          moonDiv.style.top = topPos + '%';
          // plantDiv.style.border = '1px solid rgba(0, 0, 0, 0.9)';
          // plantDiv.style.boxShadow = ' 4px 4px 14px rgba(0, 0, 0, 0.2)';
          planetContent.appendChild(moonDiv);

          let moonBgImg = new Image();
          let moonMaskImg = new Image();
          moonBgImg.src = imgCanvas.toDataURL("image/png");
          moonMaskImg.src = maskCanvas.toDataURL("image/png");
          moonBgImg.style.height = moonDiv.style.height;
          moonBgImg.style.width = bgWidth + 'px';
          moonMaskImg.style.width = moonMaskImg.style.height = moonDiv.style.height;
          moonMaskImg.style.position = moonBgImg.style.position = 'absolute';
          moonDiv.appendChild(moonBgImg);
          moonDiv.appendChild(moonMaskImg);
          this.planetRotateAnim(moonBgImg, false);
        }
      },

      planetRotateAnim(divElement, isPlanet) {
        if (isPlanet) {
          this.planetCurrentRotate -= this.planetRotateSpeed;
          if (this.planetCurrentRotate < -295) this.planetCurrentRotate = 0;
          divElement.style.left = this.planetCurrentRotate + '%'
        } else {
          this.moonCurrentRotate -= this.moonRotateSpeed;
          if (this.moonCurrentRotate < -295) this.moonCurrentRotate = 0;
          divElement.style.left = this.moonCurrentRotate + '%'
        }
        let _this = this;
        setTimeout(function () {
          _this.planetRotateAnim(divElement, isPlanet);
        }, 100);
      },

      removeAllChildEle(parentEle) {
        let childs = parentEle.childNodes;
        for (let i = childs.length - 1; i >= 0; i--) {
          parentEle.removeChild(childs[i]);
        }
      },

      setRandomPlanetBgIndex(length) {
        this.randomPlanetBgIndexAry = [];
        for (var i = 0; i < length; i++) {
          this.randomPlanetBgIndexAry.push(i);
        }
        this.randomPlanetBgIndexAry.sort(function () {
          return 0.5 - Math.random();
        });
      },

      // createImg(srcImgUrl) {
      //   var imgObject = new Image();
      //   imgObject.src = srcImgUrl;
      //   imgObject.onLoad = this.onImgLoaded();
      // },
      // onImgLoaded() {
      //   var loadTimer;
      //   if (loadTimer != null) clearTimeout(loadTimer);
      //   if (!imgObject.complete) {
      //     loadTimer = setTimeout(this.onImgLoaded
      //       , 3);
      //   } else {
      //     onPreloadComplete();
      //   }
      // },
    },
  }
</script>

<style scoped lang="scss">
  .background-container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: rgba(35, 35, 35, 1.0);
    .background-wrap {
      width: 100%;
      height: 100%;
      background: rgba(35, 35, 35, 1.0);

      .background-stars-container, .background-asteroids-container, .background-nebulas-container, .bling-star-container {
        width: 100%;
        height: 100%;
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #starsBgImg {
        width: 100%;
        height: 100%;
        background: no-repeat center;
      }
      #asteroidsBgImg {
        width: 100%;
        height: 100%;
        background: no-repeat center;
        -o-animation: asteroid-float 20s linear infinite;
        -moz-animation: asteroid-float 20s linear infinite;
        -webkit-animation: asteroid-float 20s linear infinite; /*Safari and Chrome*/
        animation: asteroid-float 20s linear infinite; /*IE9以上支持*/
      }
      #nebulaBgImg {;
        margin-left: -25%;
        width: 150%;
        height: 100%;
        background: no-repeat center;
        background-size: 2560px 2560px;
        opacity: 0.2;

        -o-animation: nebula-float 40s linear infinite;
        -moz-animation: nebula-float 40s linear infinite;
        -webkit-animation: nebula-float 40s linear infinite; /*Safari and Chrome*/
        animation: nebula-float 40s linear infinite; /*IE9以上支持*/
      }
    }
  }

  @keyframes asteroid-float {
    0% {
      -moz-transform: translate(0px, 0px);
      -o-transform: translate(0px, 0px);
      -webkit-transform: translate(0px, 0px);
      transform: translate(0px, 0px);
    }
    50% {
      -moz-transform: translate(20px, 10px);
      -o-transform: translate(20px, 10px);
      -webkit-transform: translate(20px, 10px);
      transform: translate(20px, 10px);
    }
    100% {
      -moz-transform: translate(0px, 0px);
      -o-transform: translate(0px, 0px);
      -webkit-transform: translate(0px, 0px);
      transform: translate(0px, 0px);
    }
  }

  @keyframes nebula-float {
    0% {
      -moz-transform: translateX(0%);
      -o-transform: translateX(0%);
      -webkit-transform: translateX(0%);
      transform: translateX(0%);
    }
    50% {
      -moz-transform: translateX(15%);
      -o-transform: translateX(15%);
      -webkit-transform: translateX(15%);
      transform: translateX(15%);
    }
    100% {
      -moz-transform: translateX(0%);
      -o-transform: translateX(0%);
      -webkit-transform: translateX(0%);
      transform: translateX(0%);
    }
  }

  @keyframes nebula-float-ie {
    0% {
      -moz-transform: translateX(0%);
      -o-transform: translateX(0%);
      -webkit-transform: translateX(0%);
      transform: translateX(0%);
    }
    50% {
      -moz-transform: translateX(15%);
      -o-transform: translateX(15%);
      -webkit-transform: translateX(15%);
      transform: translateX(15%);
    }
    100% {
      -moz-transform: translateX(0%);
      -o-transform: translateX(0%);
      -webkit-transform: translateX(0%);
      transform: translateX(0%);
    }
  }

  @keyframes planet-rotate {
    0% {
      -moz-transform: translateX(0px);
      -o-transform: translateX(0px);
      -webkit-transform: translateX(0px);
      transform: translateX(0px);
    }
    50% {
      -moz-transform: translateX(200px);
      -o-transform: translateX(200px);
      -webkit-transform: translateX(200px);
      transform: translateX(200px);
    }
    100% {
      -moz-transform: translateX(0px);
      -o-transform: translateX(0px);
      -webkit-transform: translateX(0px);
      transform: translateX(0px);
    }
  }
</style>


