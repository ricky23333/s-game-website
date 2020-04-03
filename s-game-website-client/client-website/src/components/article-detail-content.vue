<template>
  <div class="article-detail-content-container">
    <div :class="'content'+'-'+articleCssType" v-if="articleDetail">
      <div class="title-info-box">
        <div v-if="articleDetail.head_bg_url" class="title-bg-article"
             v-lazy:background-image="articleDetail.head_bg_url">
          <div class="black-mask"></div>
        </div>

        <div class="title-bg-media" :style="titleBgStyle">
          <div class="video-box">
            <video-player v-if="videoPlayerOption" :options="videoPlayerOption"
                          :style="isWideScreenFlag?( videoPlayerStyle?videoPlayerStyle:'width:1140px;height:600px'):''"/>
          </div>
          <div id="main-carousel" class="carousel-box" v-if="imgDateAry">
            <carousel :img_date_ary="imgDateAry" @clickOnImg=""/>
          </div>
          <div class="radio-box" v-if="articleDetail.head_media_url">
            <div class="cover-box" v-if="articleDetail.head_media_param" @click.stop="handleClickPlayAudioBtn">
              <img
                :class="(articleDetail.head_media_url===currentPlayingArticleAudioUrl&&isPlayingFlag)?'rotate-img':'normal-img'"
                :src="articleDetail.head_media_param">
              <div class="play-pause-btn">
                <i v-if="articleDetail.head_media_url===currentPlayingArticleAudioUrl&&isPlayingFlag"
                   class="icon el-icon-video-pause"></i>
                <i v-else class="icon el-icon-video-play"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="title-text">
          <span class="article-title">{{articleDetail.title}}</span>
          <div class="text">
            <span class="author"><i class="icon el-icon-user"></i> {{articleDetail.author}}</span>
            <div class="time">
              <span class="create-at"><i class="icon el-icon-time"></i> {{articleDetail.create_at.split('T')[0]}}</span>
              <span
                class="create-before">{{this.$store.getters['user/translateDateInfo'](articleDetail.create_at)}}</span>
            </div>
            <div class="icon-box">
              <span @click.stop="handleClickLikeIcon"
                    :class="likeThisArticleFlag?'article-likecount-active':'article-likecount'"><i
                class="icondianzan1 el-iconfont"></i> {{articleDetail.likecount?articleDetail.likecount:0}}</span>
              <span @click.stop="handleClickCommentIcon" class="article-commentcount"><i
                class="icon el-icon-chat-line-round"></i> {{articleDetail.commentcount?articleDetail.commentcount:0}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="article-detail">
        <div class="title-text">
          <span class="article-title">{{articleDetail.title}}</span>
          <div class="text">
            <span class="author"><i class="icon el-icon-user"></i> {{articleDetail.author}}</span>
            <div class="time">
              <span class="create-at"><i class="icon el-icon-time"></i> {{articleDetail.create_at.split('T')[0]}}</span>
              <span
                class="create-before">{{this.$store.getters['user/translateDateInfo'](articleDetail.create_at)}}</span>
            </div>
            <div class="icon-box">
              <span @click.stop="handleClickLikeIcon"
                    :class="likeThisArticleFlag?'article-likecount-active':'article-likecount'"><i
                class="icondianzan1 el-iconfont"></i> {{articleDetail.likecount?articleDetail.likecount:0}}</span>
              <span @click.stop="handleClickCommentIcon" class="article-commentcount"><i
                class="icon el-icon-chat-line-round"></i> {{articleDetail.commentcount?articleDetail.commentcount:0}}</span>
            </div>
          </div>
        </div>

        <div class="text-box">
          <div id="text-html" class="text-html" v-html="articleDetail.content"></div>
          <div :class="likeThisArticleFlag?'like-container-active':'like-container'" @click.stop="handleClickLikeIcon">
            <div class="text-1"><i class="icondianzan1 el-iconfont"></i></div>
            <div class="text-2"> 这篇文章很赞！</div>
            <div class="text-3"> {{articleDetail.likecount?articleDetail.likecount:0}}</div>
          </div>
        </div>

        <div class="similar-article-box">
          <div class="title">这些文章值得一看</div>
          <div class="wrap">
            <div class="card-box"
                 v-if="articleDetail.similar_article&&articleDetail.similar_article.date&&articleDetail.similar_article.date.length > 0">
              <li class="card-container" v-for="(item, index) in articleDetail.similar_article.date" :key="index"
                  @click="toPath(item.id)">
                <article-banner :articleDate="item" :current-main-type="item.main_type"
                                :css-type="isWideScreenFlag?0:1"/>
              </li>
            </div>
            <div v-else class="no-comment">暂无推荐文章</div>
          </div>
        </div>

        <div class="comment-box" id="commentBox1" v-if="articleDetail.comment_date">
          <comment-editor :comment-type="0" :parent-article-id="articleDetail.id"/>
          <comment-list :comment-list-date="articleDetail.comment_date.date"/>
        </div>
      </div>
    </div>
    <P class="article-empty" v-else>暂无文章</P>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import Pagination from '../components/pagination';
  import ArticleBanner from '../components/article-banner';
  import CommentEditor from '../components/comment-editor';
  import CommentList from '../components/comment-list';
  import VideoPlayer from '../components/video-player';
  import Carousel from '../components/carousel';
  import merge from 'webpack-merge';

  export default {
    name: "article-detail-content",

    components: {
      Pagination,
      VideoPlayer,
      ArticleBanner,
      CommentEditor,
      CommentList,
      Carousel
    },

    props: {
      articleDetail: {
        required: true,
      },
    },

    data() {
      return {
        pageNavElementIdList: [],
        scrollNavIndex: 0,
        likeThisArticleFlag: false,
        videoPlayerOption: null,
        videoPlayerStyle: null,
        titleBgStyle: '',
        imgDateAry: null,
        //当前浏览器分辨率超过1140时标记为true
        isWideScreenFlag: true,
        basicPlayerOption: {
          controls: true,
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          language: 'zh-CN',
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          aspectRatio: '16:9',
          autoplay: false,
          loop: false,
          muted: false,
          notSupportedMessage: '此视频暂时无法播放',
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          }
        },
      }
    },

    created() {
    },

    mounted() {
      this.getScreenWidthType();
    },

    computed: {
      ...mapState({
        isPlayingFlag: state => state.audio.isPlayingFlag,
        showAudioPlayerFlag: state => state.audio.showAudioPlayerFlag,
        currentPlayingArticleAudioUrl: state => state.audio.currentPlayingArticleAudioUrl,
        currentPlayingArticleAudioCoverUrl: state => state.audio.currentPlayingArticleAudioCoverUrl,
        windowResizeFlag: state => state.user.windowResizeFlag,
      }),
      //文章页面样式 0带header普通文章  1图集 2音频 3视频
      articleCssType: {
        get() {
          if (this.articleDetail.main_type === 'article') {
            return 0;
          }
          else if (this.articleDetail.main_type === 'media') {
            if (this.articleDetail.child_type === 'images') {
              return 1;
            } else if (this.articleDetail.child_type === 'radios') {
              return 2;
            } else {
              return 3;
            }
          } else {
            return 4;
          }
        },
      }
    },

    watch: {
      articleDetail: function () {
        let _this = this;
        setTimeout(function () {
          _this.handleArticleDate();
        }, 100);
      },
      windowResizeFlag() {
        this.getScreenWidthType();
      },
    },

    methods: {
      ...
        mapActions({
          setArticleNavBarDate: 'articleNavBar/setArticleNavDate',
          setScrollToCommentFlag: 'articleNavBar/setScrollToCommentFlag',
          setLikeArticle: 'article/likeArticle',
        }),

      async handleClickLikeIcon() {
        if (this.likeThisArticleFlag) {
          this.$message({
            type: 'error',
            message: `已操作`,
          });
        }
        else {
          if (this.articleDetail && this.articleDetail.id) {
            let res = await this.setLikeArticle({
              id: this.articleDetail.id,
            });
            if (res) {
              this.likeThisArticleFlag = true;
              this.articleDetail.likecount++;
            }
          }
        }
      },

      handleClickCommentIcon() {
        this.setScrollToCommentFlag();
      },

      toPath(id) {
        this.$emit('toPath', id);
      },

      handleArticleDate() {
        this.pageNavElementIdList = [];
        //查询用户对该文章是否点过赞
        if (!this.articleDetail) return;
        this.likeThisArticleFlag = this.$store.getters['article/checkLikeArticle'](this.articleDetail.id);

        //获取侧边栏快速访问数据
        if (!this.articleDetail.content) return;
        this.handlePageNav();
        if (this.articleDetail.comment_date) {
          this.pageNavElementIdList.push({
            navId: 'commentBox1',
            navName: '评论',
          })
        }
        this.setArticleNavBarDate(this.pageNavElementIdList);

        //若文章类型为视频，获取视频配置
        if (this.articleDetail.main_type === 'media') {
          if (this.articleDetail.head_bg_url) {
            this.titleBgStyle = '';
            this.titleBgStyle += 'background: -webkit-linear-gradient(' + this.articleDetail.head_bg_url + ');';
            this.titleBgStyle += 'background: -moz-linear-gradient(' + this.articleDetail.head_bg_url + ');';
            this.titleBgStyle += 'background: -o-linear-gradient(' + this.articleDetail.head_bg_url + ');';
            this.titleBgStyle += 'background: linear-gradient(' + this.articleDetail.head_bg_url + ');';
          }
          if (this.articleDetail.head_media_url) {
            if (this.articleDetail.child_type === 'videos') {
              let tempPlayerOption = {};
              if (this.articleDetail.head_media_param) {
                let tempStyle = this.articleDetail.head_media_param.split('|')[0];
                let postUrl = this.articleDetail.head_media_param.split('|')[1];
                if (tempStyle && tempStyle !== '') {
                  this.videoPlayerStyle = tempStyle;
                }
                if (postUrl && postUrl !== '') {
                  tempPlayerOption.poster = postUrl;
                }
              }

              let videoTypeAry = this.articleDetail.head_media_url.split('.');
              let videoType = videoTypeAry[videoTypeAry.length - 1];
              if (videoType && videoType !== '') {
                if (videoType === 'mp4') {
                  tempPlayerOption.techOrder = ['html5'];
                  tempPlayerOption.sources = [{
                    type: 'video/mp4',
                    src: this.articleDetail.head_media_url,
                  }];
                } else {
                  tempPlayerOption.techOrder = ['flash'];
                  tempPlayerOption.sources = [{
                    type: 'video/x-flv',
                    src: this.articleDetail.head_media_url,
                  }];
                }
              }
              this.videoPlayerOption = merge(this.basicPlayerOption, tempPlayerOption);
            } else if (this.articleDetail.child_type === 'images') {
              this.imgDateAry = [];
              let tempDateAry = this.articleDetail.head_media_url.split('|');
              for (let i = 0; i < tempDateAry.length; i++) {
                let tempUrl = tempDateAry[i].split('&&')[0];
                let tempDescribe = tempDateAry[i].split('&&')[1];
                if (tempUrl && tempUrl !== '') {
                  this.imgDateAry.push({
                    image_url: tempUrl,
                    image_describe: tempDescribe,
                  });
                }
              }
            } else if (this.articleDetail.child_type === 'radios') {

            }
          }
        }
      },

      handlePageNav(obj) {
        let handleDomTag = ['H1',];
        let ignoreClass = ['similar-article-box',];
        let childObjs = (obj ? obj : document.body).childNodes;
        if (!childObjs) return;

        for (let i = 0; i < childObjs.length; i++) {
          if (childObjs[i].nodeType === 1 && handleDomTag.includes(childObjs[i].tagName)) {
            childObjs[i].id = 'pageNav' + this.pageNavElementIdList.length;
            this.pageNavElementIdList.push({
              navId: childObjs[i].id,
              navName: childObjs[i].innerText,
            });
          }
          if (!ignoreClass.includes(childObjs[i].className)) {
            this.handlePageNav(childObjs[i]);
          }
        }
      },

      handleText(handleText, startText, endText) {
        let startPos = handleText.indexOf(startText);
        let endPos = handleText.indexOf(endText, startPos);
        return handleText.substring(startPos + startText.length, endPos);
      },

      handleClickPlayAudioBtn() {
        if (this.articleDetail.head_media_url) {
          if (this.$store.state.audio.currentPlayingArticleAudioUrl === this.articleDetail.head_media_url) {
            this.$store.state.audio.isPlayingFlag = !this.isPlayingFlag;
            if (this.isPlayingFlag) this.$store.state.audio.showAudioPlayerFlag = true;
          } else {
            this.$store.state.audio.showAudioPlayerFlag = true;
            this.$store.state.audio.currentPlayingArticleAudioUrl = this.articleDetail.head_media_url;
            if (this.articleDetail.head_media_param) this.$store.state.audio.currentPlayingArticleAudioCoverUrl = this.articleDetail.head_media_param;
          }
        }
      },

      getScreenWidthType() {
        this.isWideScreenFlag = document.documentElement.clientWidth >= 1140;
      },

      // changePage(page) {
      //   if (!this.pagination) return;
      //   if (page > this.pagination.total_page_count) return;
      //   if (this.pagination.current_page_index === page) return;
      //   this.pagination.current_page_index = page;
      // },

      // handleHtmlTextDate() {
      //   //识别分页符并进行分页
      //   if (!this.articleDetail || !this.articleDetail.content) return;
      //   this.articleTextDate = this.articleDetail.content.split("<!-- pagebreak --></p>");
      //   this.pagination = {
      //     current_page_index: 1,
      //     total_page_count: this.articleTextDate.length,
      //   };
      //
      //   this.articleVideoDate = [];
      //   //将文本中自定义组件标签提取出来
      //   for (let i = 0; i < this.articleTextDate.length; i++) {
      //     if (this.articleTextDate.length !== 1 && i !== this.articleTextDate.length - 1) this.articleTextDate[i] += '<\/p>';
      //     let textDate = this.articleTextDate[i];
      //     let currentIndexPos = 0;
      //     let thisPageVideoInfo = [];
      //
      //     while (currentIndexPos >= 0) {
      //       let startPos = textDate.indexOf('<video', currentIndexPos);
      //       currentIndexPos = startPos;
      //       let endPos = textDate.indexOf('<\/video>', currentIndexPos);
      //       if (startPos < 0 || endPos < 0) break;
      //       let videoText = textDate.substring(startPos, endPos);
      //
      //       let startPos0 = videoText.indexOf('style="');
      //       let endPos0 = videoText.indexOf(';"');
      //       let tempStyle;
      //       if (startPos0 !== -1) tempStyle = videoText.substring(startPos0 + 7, endPos0);
      //
      //       let startPos1 = videoText.indexOf('poster="');
      //       let endPos1 = videoText.indexOf('"', startPos1 + 8);
      //       let videoPostUrl;
      //       if (startPos1 !== -1) videoPostUrl = videoText.substring(startPos1 + 8, endPos1);
      //
      //       let startPos2 = videoText.indexOf('width="');
      //       let endPos2 = videoText.indexOf('"', startPos2 + 7);
      //       let videoWidth = videoText.substring(startPos2 + 7, endPos2);
      //
      //       let startPos3 = videoText.indexOf('height="');
      //       let endPos3 = videoText.indexOf('"', startPos3 + 8);
      //       let videoHeight = videoText.substring(startPos3 + 8, endPos3);
      //
      //       let startPos4 = videoText.indexOf('src="');
      //       let endPos4 = videoText.indexOf('"', startPos4 + 5);
      //       let videoSrc = videoText.substring(startPos4 + 5, endPos4);
      //
      //       let startPos5 = videoSrc.indexOf('.');
      //       let videoType = videoSrc.substring(startPos5 + 1);
      //
      //       let playerOption = {};
      //       if (videoType) {
      //         if (videoType === 'mp4') {
      //           this.playerOptions.techOrder = ['html5'];
      //           playerOption.sources = [{
      //             type: 'video/mp4',
      //             src: '\/' + videoSrc,
      //           }];
      //         } else {
      //           this.playerOptions.techOrder = ['flash'];
      //           playerOption.sources = [{
      //             type: 'video/x-flv',
      //             src: '\/' + videoSrc,
      //           }];
      //         }
      //       }
      //       if (videoPostUrl) playerOption.poster = '\/' + videoPostUrl;
      //       if (!videoWidth) videoWidth = '640';
      //       if (!videoHeight) videoHeight = '360';
      //       let videoStyleText = 'style="' + 'width: ' + videoWidth + ';' + 'height: ' + videoHeight + ';' + tempStyle + '"';
      //       let videoInfo = {
      //         videoStyleText,
      //         playerOption: merge(this.playerOptions, playerOption)
      //       }
      //
      //       thisPageVideoInfo.push(videoInfo);
      //       currentIndexPos = endPos;
      //
      //       this.articleTextDate[i] = this.articleTextDate[i].substring(0, startPos) + this.articleTextDate[i].substring(endPos + 8);
      //     }
      //
      //     this.articleVideoDate.push(thisPageVideoInfo);
      //   }
      // },
    },
  }
</script>

<style lang="scss" scoped>
  @media screen and (min-width: 1140px) {
    .article-detail-content-container {
      font-family: Open Sans, Helvetica Neue, Arial, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
      width: 100%;
      overflow: hidden;
      padding-top: 60px;
      margin: 0px auto;
      .content-0, .content-1, .content-2, .content-3, .content-4 {
        width: 100%;
        .title-info-box {
          display: none;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          position: relative;
        }

        .article-detail {
          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2) inset;
          width: 1140px;
          margin: 0px auto;
          background: rgba(244, 244, 244, 1);
          display: flex;
          flex-wrap: wrap;

          .title-text {
            display: none;
          }

          .text-box {
            width: 100%;
            padding-left: 20px;
            padding-right: 20px;
            .text-html {
              width: 100%;
              background: rgba(0, 0, 0, 0);
              font-size: 18px;
            }
            .like-container, .like-container-active {
              cursor: pointer;
              margin: 100px auto;
              text-align: center;
              display: flex;
              flex-wrap: nowrap;
              justify-content: space-between;
              width: 290px;
              height: 50px;
              border-radius: 30px;
              transition: all .5s ease;
              -webkit-transition: all .5s ease; /* Safari */
              -moz-transition: all .5s ease;
              -o-transition: all .5s ease;
              .text-1, .text-2.text-3 {
                transition: all .5s ease;
                -webkit-transition: all .5s ease; /* Safari */
                -moz-transition: all .5s ease;
                -o-transition: all .5s ease;
              }
              .text-1 {
                border-radius: 50%;
                width: 48px;
                height: 48px;
                i {
                  color: rgba(20, 20, 20, 0.5);
                  font-size: 35px;
                  line-height: 48px;
                }
              }
              .text-2 {
                font-size: 20px;
                line-height: 50px;
                margin-left: 15px;
              }
              .text-3 {
                border-radius: 50%;
                width: 48px;
                height: 48px;
                font-size: 18px;
                font-weight: bold;
                line-height: 48px;
              }
            }
            .like-container {
              background: rgba(20, 20, 20, 0.1);
              .text-1, .text-3 {
                background: rgba(20, 20, 20, 0.25);
              }
            }
            .like-container-active {
              background: rgba(250, 0, 0, 0.2);
              .text-1, .text-3 {
                background: rgba(250, 0, 0, 0.4);
              }
              .text-1 {
                i {
                  color: rgba(20, 20, 20, 0.8);
                }
              }
            }
          }

          .similar-article-box {
            width: 100%;
            background: rgba(220, 220, 220, 0.8);
            box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.2) inset;
            display: flex;
            flex-wrap: wrap;
            min-height: 400px;
            .title {
              margin-left: 20px;
              margin-top: 20px;
              width: 100%;
              font-size: 32px;
              font-weight: bold;
              text-align: left;
              height: 50px;

            }
            .wrap {
              width: 100%;
              margin: 10px auto;
              padding-bottom: 10px;

              .card-box {
                width: 100%;
                display: flex;
                flex-wrap: nowrap;
                list-style: none;
                justify-content: center;
                .card-container {
                  width: 30%;
                }
              }
              .no-comment {
                margin-top: -50px;
                font-size: 26px;
                color: rgba(20, 20, 20, 0.55);
                text-align: center;
              }
            }
          }

          .comment-box {
            width: 100%;
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      }

      .content-0 {
        .title-info-box {
          display: block;
          width: 100%;
          margin: 0px auto;
          .title-bg-article {
            width: 100%;
            height: 300px;
            .black-mask {
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.6);
            }
          }
          .title-bg-media {
            display: none;
          }
          .title-text {
            position: absolute;
            width: 100%;
            text-align: center;
            top: 100px;
            color: rgba(250, 250, 250, 0.95);
            text-shadow: black 0.2em 0.2em 0.5em;
            .article-title {
              font-size: 30px;
              line-height: 60px;
            }
            .text {
              color: rgba(220, 220, 220, 0.95);
              margin-top: 25px;
              font-size: 14px;
              .author {

              }
              .time {
                width: 170px;
                line-height: 20px;
                display: flex;
                flex-wrap: nowrap;
                justify-content: space-between;
                margin: 10px auto;
              }
              .icon-box {
                width: 120px;
                line-height: 20px;
                display: flex;
                flex-wrap: nowrap;
                justify-content: space-between;
                margin: 0px auto;
                .article-likecount {
                  i {
                    color: rgba(220, 220, 220, 0.5);
                  }
                }

                .article-likecount, .article-detail-active {
                  i {
                    transition: all .5s ease;
                    -webkit-transition: all .5s ease; /* Safari */
                    -moz-transition: all .5s ease;
                    -o-transition: all .5s ease;
                  }
                }

                span {
                  cursor: pointer;
                }
              }
            }
          }
        }
      }

      .content-1, .content-2 .content-3 {
        .article-detail {
          .title-text {
            display: block;
            padding-left: 50px;
            padding-right: 50px;
            padding-top: 20px;
            width: 100%;
            text-align: center;
            color: rgba(20, 20, 20, 0.95);
            .article-title {
              font-size: 35px;
              font-weight: bold;
              line-height: 60px;
            }
            .text {
              color: rgba(20, 20, 20, 0.7);
              margin-top: 25px;
              font-size: 14px;
              .author {

              }
              .time {
                width: 170px;
                line-height: 20px;
                display: flex;
                flex-wrap: nowrap;
                justify-content: space-between;
                margin: 10px auto;
              }
              .icon-box {
                width: 120px;
                line-height: 20px;
                display: flex;
                flex-wrap: nowrap;
                justify-content: space-between;
                margin: 0px auto;
                .article-likecount {
                  i {
                    color: rgba(220, 220, 220, 0.5);
                  }
                }

                .article-likecount, .article-detail-active {
                  i {
                    transition: all .5s ease;
                    -webkit-transition: all .5s ease; /* Safari */
                    -moz-transition: all .5s ease;
                    -o-transition: all .5s ease;
                  }
                }

                span {
                  cursor: pointer;
                }
              }
            }
          }
        }
      }

      .content-1 {
        .title-info-box {
          display: block;
          width: 100%;
          margin: 0px auto;
          .title-bg-article {
            display: none;
          }
          .title-bg-media {
            width: 100%;
            height: 700px;

            .carousel-box {
              display: block;
            }

            .video-box, .radio-box {
              display: none;
            }
          }
          .title-text {
            display: none;
          }
        }
      }

      .content-2 {
        .title-info-box {
          display: block;
          width: 100%;
          margin: 0px auto;
          .title-bg-article {
            display: none;
          }
          .title-bg-media {
            width: 100%;
            height: 500px;

            .radio-box {
              display: block;
              align-items: center;
              width: 1140px;
              padding-top: 25px;
              margin: 0px auto;
              .cover-box {
                position: relative;
                cursor: pointer;
                align-items: center;
                margin: 70px auto;
                width: 300px;
                height: 300px;
                border-radius: 50%;
                background: rgba(150, 150, 150, 1.0);
                overflow: hidden;
                box-shadow: 0px 4px 15px rgba(20, 20, 20, 0.4);
                img {
                  cursor: pointer;
                  width: 300px;
                  height: 300px;
                }
                .rotate-img {
                  -webkit-animation: loader 10s linear infinite; /*Safari and Chrome*/
                  animation: loader 10s linear infinite; /*IE9以上支持*/
                  -o-animation: loader 10s linear infinite;
                  -moz-animation: loader 10s linear infinite;
                }
                .play-pause-btn {
                  position: absolute;
                  width: 300px;
                  height: 300px;
                  top: 0px;
                  background: rgba(20, 20, 20, .7);
                  align-items: center;
                  transition: all .5s ease;
                  -webkit-transition: all .5s ease;
                  -moz-transition: all .5s ease;
                  -o-transition: all .5s ease;
                  i {
                    position: absolute;
                    top: 120px;
                    left: 120px;
                    font-size: 60px;
                    color: rgba(250, 250, 250, 0.95);
                  }
                  &:hover {
                    background: rgba(20, 20, 20, .2);
                  }
                }
              }
            }

            .video-box, .carousel-box {
              display: none;
            }
          }
          .title-text {
            display: none;
          }
        }
      }

      .content-3 {
        .title-info-box {
          display: block;
          width: 100%;
          margin: 0px auto;
          .title-bg-article {
            display: none;
          }
          .title-bg-media {
            width: 100%;
            height: 700px;

            .video-box {
              display: block;
              align-items: center;
              width: 1140px;
              padding-top: 25px;
              margin: 0px auto;
            }

            .carousel-box, .radio-box {
              display: none;
            }
          }
          .title-text {
            display: none;
          }
        }
      }

      .content-4 {
        .article-detail {
          .title-text {
            display: block;
            padding-left: 50px;
            padding-right: 50px;
            padding-top: 20px;
            width: 100%;
            text-align: center;
            color: rgba(20, 20, 20, 0.95);
            .article-title {
              font-size: 35px;
              font-weight: bold;
              line-height: 60px;
            }
            .text {
              display: none;
            }
          }
          .text-box {
            .like-container, .like-container-active {
              display: none;
            }
          }
          .similar-article-box {
            display: none;
          }
        }
      }

      .article-empty {
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2) inset;
        width: 1140px;
        height: 800px;
        margin: 0px auto;
        background: rgba(244, 244, 244, 1);
        font-size: 30px;
        text-align: center;
        font-weight: bold;
        line-height: 200px;
      }
    }
  }

  @media screen and (max-width: 1139.8px) {
    .article-detail-content-container {
      font-family: Open Sans, Helvetica Neue, Arial, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
      width: 100%;
      overflow: hidden;
      padding-top: 60px;
      margin: 0px auto;
      .content-0, .content-1, .content-2, .content-3, .content-4 {
        width: 100%;
        .title-info-box {
          display: none;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          position: relative;
        }

        .article-detail {
          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2) inset;
          width: 100%;
          margin: 0px auto;
          background: rgba(244, 244, 244, 1);
          display: flex;
          flex-wrap: wrap;

          .title-text {
            display: none;
          }

          .text-box {
            width: 100%;
            padding-left: 20px;
            padding-right: 20px;
            .text-html {
              width: 100%;
              background: rgba(0, 0, 0, 0);
              font-size: 18px;
            }
            .like-container, .like-container-active {
              cursor: pointer;
              margin: 100px auto;
              text-align: center;
              display: flex;
              flex-wrap: nowrap;
              justify-content: space-between;
              width: 290px;
              height: 50px;
              border-radius: 30px;
              transition: all .5s ease;
              -webkit-transition: all .5s ease; /* Safari */
              -moz-transition: all .5s ease;
              -o-transition: all .5s ease;
              .text-1, .text-2.text-3 {
                transition: all .5s ease;
                -webkit-transition: all .5s ease; /* Safari */
                -moz-transition: all .5s ease;
                -o-transition: all .5s ease;
              }
              .text-1 {
                border-radius: 50%;
                width: 48px;
                height: 48px;
                i {
                  color: rgba(20, 20, 20, 0.5);
                  font-size: 35px;
                  line-height: 48px;
                }
              }
              .text-2 {
                font-size: 20px;
                line-height: 50px;
                margin-left: 15px;
              }
              .text-3 {
                border-radius: 50%;
                width: 48px;
                height: 48px;
                font-size: 18px;
                font-weight: bold;
                line-height: 48px;
              }
            }
            .like-container {
              background: rgba(20, 20, 20, 0.1);
              .text-1, .text-3 {
                background: rgba(20, 20, 20, 0.25);
              }
            }
            .like-container-active {
              background: rgba(250, 0, 0, 0.2);
              .text-1, .text-3 {
                background: rgba(250, 0, 0, 0.4);
              }
              .text-1 {
                i {
                  color: rgba(20, 20, 20, 0.8);
                }
              }
            }
          }

          .similar-article-box {
            width: 100%;
            background: rgba(220, 220, 220, 0.8);
            box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.2) inset;
            display: flex;
            flex-wrap: wrap;
            min-height: 400px;
            .title {
              margin-left: 20px;
              margin-top: 20px;
              width: 100%;
              font-size: 32px;
              font-weight: bold;
              text-align: left;
              height: 50px;

            }
            .wrap {
              width: 100%;
              margin: 10px auto;
              padding-bottom: 10px;

              .card-box {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                list-style: none;
                justify-content: center;
                .card-container {
                  width: 70%;
                  margin: 10px auto;
                }
              }
              .no-comment {
                margin-top: -50px;
                font-size: 26px;
                color: rgba(20, 20, 20, 0.55);
                text-align: center;
              }
            }
          }

          .comment-box {
            margin: 15px auto;
            width: 100%;
            padding-left: 10px;
            padding-right: 10px;
          }
        }
      }

      .content-0 {
        .title-info-box {
          display: block;
          width: 100%;
          margin: 0px auto;
          .title-bg-article {
            background: no-repeat center;
            width: 100%;
            height: 300px;
            .black-mask {
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.6);
            }
          }
          .title-bg-media {
            display: none;
          }
          .title-text {
            position: absolute;
            width: 100%;
            text-align: center;
            top: 0px;
            color: rgba(250, 250, 250, 0.95);
            text-shadow: black 0.2em 0.2em 0.5em;
            .article-title {
              font-size: 30px;
              line-height: 60px;
            }
            .text {
              color: rgba(220, 220, 220, 0.95);
              margin-top: 25px;
              font-size: 14px;
              .author {

              }
              .time {
                width: 170px;
                line-height: 20px;
                display: flex;
                flex-wrap: nowrap;
                justify-content: space-between;
                margin: 10px auto;
              }
              .icon-box {
                width: 120px;
                line-height: 20px;
                display: flex;
                flex-wrap: nowrap;
                justify-content: space-between;
                margin: 0px auto;
                .article-likecount {
                  i {
                    color: rgba(220, 220, 220, 0.5);
                  }
                }

                .article-likecount, .article-detail-active {
                  i {
                    transition: all .5s ease;
                    -webkit-transition: all .5s ease; /* Safari */
                    -moz-transition: all .5s ease;
                    -o-transition: all .5s ease;
                  }
                }

                span {
                  cursor: pointer;
                }
              }
            }
          }
        }
      }

      .content-1, .content-2 .content-3 {
        .article-detail {
          .title-text {
            display: block;
            padding-left: 50px;
            padding-right: 50px;
            padding-top: 20px;
            width: 100%;
            text-align: center;
            color: rgba(20, 20, 20, 0.95);
            .article-title {
              font-size: 35px;
              font-weight: bold;
              line-height: 60px;
            }
            .text {
              color: rgba(20, 20, 20, 0.7);
              margin-top: 25px;
              font-size: 14px;
              .author {

              }
              .time {
                width: 170px;
                line-height: 20px;
                display: flex;
                flex-wrap: nowrap;
                justify-content: space-between;
                margin: 10px auto;
              }
              .icon-box {
                width: 120px;
                line-height: 20px;
                display: flex;
                flex-wrap: nowrap;
                justify-content: space-between;
                margin: 0px auto;
                .article-likecount {
                  i {
                    color: rgba(220, 220, 220, 0.5);
                  }
                }

                .article-likecount, .article-detail-active {
                  i {
                    transition: all .5s ease;
                    -webkit-transition: all .5s ease; /* Safari */
                    -moz-transition: all .5s ease;
                    -o-transition: all .5s ease;
                  }
                }

                span {
                  cursor: pointer;
                }
              }
            }
          }
        }
      }

      .content-1 {
        .title-info-box {
          display: block;
          width: 100%;
          margin: 0px auto;
          .title-bg-article {
            display: none;
          }
          .title-bg-media {
            width: 100%;
            height: auto;

            .carousel-box {
              display: block;
            }

            .video-box, .radio-box {
              display: none;
            }
          }
          .title-text {
            display: none;
          }
        }
      }

      .content-2 {
        .title-info-box {
          display: block;
          width: 100%;
          margin: 0px auto;
          .title-bg-article {
            display: none;
          }
          .title-bg-media {
            width: 100%;
            height: auto;

            .radio-box {
              width: 100%;
              display: block;
              align-items: center;
              padding-top: 15px;
              padding-bottom: 15px;
              margin: 0px auto;
              .cover-box {
                position: relative;
                cursor: pointer;
                align-items: center;
                margin: 70px auto;
                width: 250px;
                height: 250px;
                border-radius: 50%;
                background: rgba(150, 150, 150, 1.0);
                overflow: hidden;
                box-shadow: 0px 4px 15px rgba(20, 20, 20, 0.4);
                img {
                  cursor: pointer;
                  width: 250px;
                  height: 250px;
                }
                .rotate-img {
                  -webkit-animation: loader 10s linear infinite; /*Safari and Chrome*/
                  animation: loader 10s linear infinite; /*IE9以上支持*/
                  -o-animation: loader 10s linear infinite;
                  -moz-animation: loader 10s linear infinite;
                }
                .play-pause-btn {
                  position: absolute;
                  width: 250px;
                  height: 250px;
                  top: 0px;
                  background: rgba(20, 20, 20, .7);
                  align-items: center;
                  transition: all .5s ease;
                  -webkit-transition: all .5s ease;
                  -moz-transition: all .5s ease;
                  -o-transition: all .5s ease;
                  i {
                    position: absolute;
                    top: 100px;
                    left: 100px;
                    font-size: 60px;
                    color: rgba(250, 250, 250, 0.95);
                  }
                  &:hover {
                    background: rgba(20, 20, 20, .2);
                  }
                }
              }
            }

            .video-box, .carousel-box {
              display: none;
            }
          }
          .title-text {
            display: none;
          }
        }
      }

      .content-3 {
        .title-info-box {
          display: block;
          width: 100%;
          margin: 0px auto;
          .title-bg-article {
            display: none;
          }
          .title-bg-media {
            width: 100%;
            height: auto;
            padding-bottom: 20px;

            .video-box {
              display: block;
              align-items: center;
              width: 100%;
              height: auto;
              padding-top: 20px;
              margin: 0px auto;
            }

            .carousel-box, .radio-box {
              display: none;
            }
          }
          .title-text {
            display: none;
          }
        }
      }

      .content-4 {
        .article-detail {
          .title-text {
            display: block;
            padding-left: 50px;
            padding-right: 50px;
            padding-top: 20px;
            width: 100%;
            text-align: center;
            color: rgba(20, 20, 20, 0.95);
            .article-title {
              font-size: 35px;
              font-weight: bold;
              line-height: 60px;
            }
            .text {
              display: none;
            }
          }
          .text-box {
            .like-container, .like-container-active {
              display: none;
            }
          }
          .similar-article-box {
            display: none;
          }
        }
      }

      .article-empty {
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2) inset;
        width: 100%;
        height: 600px;
        margin: 0px auto;
        background: rgba(244, 244, 244, 1);
        font-size: 30px;
        text-align: center;
        font-weight: bold;
        line-height: 200px;
      }
    }
  }
</style>

<style lang="scss">
  #text-html > > > img {
    display: block;
    margin: 10px auto;
    max-width: 100%;
  }

  @media screen and (min-width: 1140px) {
    #main-carousel {
      align-items: center;
      width: 1140px;
      height: 608px;
      padding-top: 40px;
      margin: 0px auto;

      .nextpage-btn, .prepage-btn {
        text-align: center;
        width: 4.5%;
        height: 9.5%;
        font-size: 35px;
        line-height: 50px;
      }

      .bottom-banner-text-normal, .bottom-banner-text-link {
        font-size: 20px;
        line-height: 45px;
      }

      .bottom-banner-buttons {
        .button, .button--active {
          width: 8%;
          height: 45%;
          margin-top: 4%;
          margin-right: 3%;
        }
      }

      @keyframes showPrePageBtn {
        0% {
          margin-left: -10%;
          -webkit-margin-start: -10%;
        }
        100% {
          margin-left: 3%;
          -webkit-margin-end: 3%;
        }
      }

      @keyframes showNextPageBtn {
        0% {
          margin-right: -10%;
          -webkit-margin-end: -10%;
        }
        100% {
          margin-right: 3%;
          -webkit-margin-start: 3%;
        }
      }
    }
  }

  @media screen and (min-width: 576px) and (max-width: 1139.98px) {
    #main-carousel {
      align-items: center;
      width: 95%;
      height: auto;
      padding-top: 20px;
      padding-bottom: 20px;
      margin: 0px auto;
      position: relative;
      .nextpage-btn--hide, .prepage-btn--hide, .nextpage-btn, .prepage-btn {
        position: absolute;
        text-align: center;
        width: 50px;
        height: 50px;
        font-size: 35px;
        line-height: 50px;
        -o-animation: none;
        -moz-animation: none;
        -webkit-animation: none;
        animation: none;
      }

      .nextpage-btn, .nextpage-btn--hide {
        right: 20px;
      }

      .prepage-btn, .prepage-btn--hide {
        left: 20px;
      }

      .bottom-banner {
        position: absolute;
        bottom: 0;
        height: 25px;
      }

      .bottom-banner-text-normal, .bottom-banner-text-link {
        font-size: 18px;
        line-height: 25px;
      }

      .bottom-banner-buttons {
        height: 100%;
        .button, .button--active {
          margin-top:3px;
          margin-left: 10px;
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  @media screen and (max-width: 575.98px) {
    #main-carousel {
      align-items: center;
      width: 95%;
      height: auto;
      padding-top: 20px;
      padding-bottom: 20px;
      margin: 0px auto;
      position: relative;
      .nextpage-btn--hide, .prepage-btn--hide, .nextpage-btn, .prepage-btn {
        position: absolute;
        text-align: center;
        width: 30px;
        height: 30px;
        font-size: 25px;
        line-height: 30px;
        -o-animation: none;
        -moz-animation: none;
        -webkit-animation: none;
        animation: none;
      }

      .nextpage-btn, .nextpage-btn--hide {
        right: 10px;
      }

      .prepage-btn, .prepage-btn--hide {
        left: 10px;
      }
      .bottom-banner {
        position: absolute;
        bottom: 0;
        height: 20px;
      }
      .bottom-banner-text-normal, .bottom-banner-text-link {
        font-size: 12px;
        line-height: 20px;
      }

      .bottom-banner-buttons {
        height: 100%;
        .button, .button--active {
          margin-top: 4px;
          margin-left: 7px;
          width: 12px;
          height: 12px;

        }
      }
    }
  }
</style>


