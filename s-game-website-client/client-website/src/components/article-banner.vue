<template>
  <section class="article-box-container" v-if="articleDate">
    <div :class="'article-box-'+cssType" v-if="articleDate.show_type===0">
      <div class="article-img">
        <img v-if="articleDate.cover_image_url" :src="articleDate.cover_image_url" alt="img">
      </div>
      <div class="article-banner-box">
        <p class="article-type"><i class="icon el-icon-collection-tag"></i> {{
          translateArticleTypeInfo(articleDate.child_type)}}</p>
        <h1 class="article-title" id="article-title">{{articleDate.title}}</h1>
        <el-tooltip :content="articleDate.article_describe" placement="bottom" effect="dark" :open-delay="1000">
          <p class="article-describe">{{articleDate.article_describe}}</p>
        </el-tooltip>
        <div class="article-info">
          <div class="left-part">
            <span class="article-author"><i class="icon el-icon-user"></i> {{articleDate.author}}</span>
            <span
              class="article-create-at">{{this.$store.getters['user/translateDateInfo'](articleDate.create_at)}}</span>
          </div>
          <div class="right-part">
              <span class="article-commentcount"><i
                class="icon el-icon-chat-line-round"></i> {{articleDate.commentcount?articleDate.commentcount:0}}</span>
            <span class="article-likecount"><i class="icondianzan1 el-iconfont"></i> {{articleDate.likecount?articleDate.likecount:0}}</span>
          </div>

          <!--<p v-if="articleDate.show_type===3||articleDate.show_type===2" id="article-download"-->
          <!--@click.stop="downloadArticle(articleDate.id)"><i-->
          <!--class="icon el-icon-download"></i>下载</p>-->
        </div>
      </div>
    </div>

    <div :class="'media-box-'+cssType" v-else-if="articleDate.show_type===1">
      <div class="box-wrap" v-lazy:background-image="articleDate.cover_image_url" alt="img">
        <div class="type-icon">
          <div class="icon">
            <div class="video-icon" v-if="articleDate.child_type==='videos'">
              <span class="info"><i class="icon el-icon-video-camera"></i> {{articleDate.article_describe}}</span>
            </div>
            <div class="radio-icon" v-else-if="articleDate.child_type==='radios'">
              <span class="info"><i class="iconyinle el-iconfont"></i> {{articleDate.article_describe}}</span>
            </div>
            <div class="image-icon" v-if="articleDate.child_type==='images'">
              <span class="info"><i class="icon el-icon-picture-outline"></i> {{articleDate.article_describe}}</span>
            </div>
          </div>

          <div class="button" v-if="articleDate.child_type==='videos'||articleDate.child_type==='radios'">
            <i class="icon el-icon-video-play"></i>
          </div>
        </div>

        <div class="media-banner-box">
          <div class="media-info">
            <div class="left-part">
              <el-tooltip :content="articleDate.title" placement="bottom" effect="dark" :open-delay="1000">
                <span class="media-title">{{articleDate.title}}</span>
              </el-tooltip>
            </div>
            <div class="right-part">
              <span class="media-commentcount"><i
                class="icon el-icon-chat-line-round"></i> {{articleDate.commentcount?articleDate.commentcount:0}}</span>
              <span class="media-likecount"><i class="icondianzan1 el-iconfont"></i> {{articleDate.likecount?articleDate.likecount:0}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "article-banner",

    props: {
      // 存储导航栏名称以及对应路由
      articleDate: {
        type: Object,
        required: true,
      },
      currentMainType: {
        required: true,
      },
      cssType: {
        type: Number,
        default: 0,
      },
    },

    computed: {
      ...mapState({}),

      mainRouterIndex() {
        return this.$store.getters['user/mainRouterIndex'](this.currentMainType);
      },
    },

    methods: {
      ...
        mapActions({}),
      downloadArticle(id) {
        this.$emit('clickDownload', id);
      },
      translateArticleTypeInfo(oriChildType) {
        return this.$store.getters['user/childTypeName'](oriChildType, this.mainRouterIndex);
      },
    },
  }
</script>

<style lang="scss" scoped>
  @media screen and (min-width: 576px) {
    .article-box-0 {
      cursor: pointer;
      display: flex;
      flex-wrap: wrap;
      transition: all .5s ease;
      -webkit-transition: all .5s ease;
      -moz-transition: all .5s ease;
      -o-transition: all .5s ease;
      width: 250px;
      height: 350px;
      overflow: hidden;
      border-radius: 2px;
      background: rgba(245, 245, 245, 1.0);
      text-align: left;

      &:hover {
        background: rgba(255, 255, 255, 1.0);
      }

      .article-img {
        width: 250px;
        height: 170px;
        img {
          width: 250px;
          height: 170px;
        }
      }

      .article-banner-box {
        position: relative;
        width: 100%;
        height: 180px;
        .article-type {
          padding-left: 10px;
          padding-right: 10px;
          font-size: 13px;
          width: 230px;
          margin: 10px auto;
          font-weight: bold;
          color: rgba(0, 140, 200, 1.0);
        }

        .article-title {
          padding-left: 10px;
          padding-right: 10px;
          width: 230px;
          margin: 10px auto;
          /*height: 25px;*/
          color: rgba(0, 0, 0, 1);
          font-size: 19px;
          font-weight: bold;
          transition: all .5s ease;
          -webkit-transition: all .5s ease;
          -moz-transition: all .5s ease;
          -o-transition: all .5s ease;
          /*overflow: hidden;*/
          /*text-overflow: ellipsis;*/
          /*white-space: nowrap;*/
        }

        .article-describe {
          width: 230px;
          margin: 10px auto;
          padding-left: 10px;
          padding-right: 10px;
          color: #464c5b;
          font-size: 13px;
          overflow: hidden;
          /*white-space: nowrap;*/
          /*text-overflow: ellipsis;*/
          white-space: normal;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
        .article-info {
          position: absolute;
          bottom: 5px;
          width: 100%;
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
          font-size: 12px;
          color: #9ea7b4;
          .left-part {
            width: 50%;
            position: relative;
            display: flex;
            flex-wrap: nowrap;
            padding-left: 10px;
            .article-author {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .article-create-at {
              text-align: left;
              width: 40px;
              margin-left: 5px;
            }
          }
          .right-part {
            width: 50%;
            padding-right: 10px;
            position: relative;
            align-items: right;
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row-reverse;
            .article-commentcount {
              margin-left: 10px;
            }
          }
        }
      }
    }

    .media-box-0 {
      cursor: pointer;
      display: flex;
      flex-wrap: wrap;
      width: 250px;
      height: 230px;
      overflow: hidden;
      border-radius: 2px;
      background: rgba(245, 245, 245, 1.0);
      color: rgba(245, 245, 245, 0.8);
      text-align: left;
      .box-wrap {
        width: 100%;
        &:hover {
          .type-icon {
            background: rgba(0, 0, 0, 0);
            .button {
              i {
                opacity: 1;
              }
            }
          }
          .media-banner-box {
            background: rgba(255, 255, 255, 1.0);
          }
        }
        .type-icon {
          width: 100%;
          height: 85%;

          position: relative;
          font-size: 14px;
          background: rgba(0, 0, 0, 0.1);
          transition: all .5s ease;
          -webkit-transition: all .5s ease;
          -moz-transition: all .5s ease;
          -o-transition: all .5s ease;
          .icon {
            margin-top: 0px;
            .video-icon, .radio-icon {
              margin-top: 5px;
              margin-left: 5px;
              height: 20px;
              i {
                font-size: 18px;
              }
            }
            .image-icon {
              height: 20px;
              margin-left: 5px;
              margin-top: 5px;
              i {
                font-size: 20px;
              }
            }
          }
          .button {
            i {
              opacity: 0;
              transition: all .5s ease;
              -webkit-transition: all .5s ease;
              -moz-transition: all .5s ease;
              -o-transition: all .5s ease;
              margin-left: 35%;
              margin-top: 15%;
              font-size: 75px;
            }
          }
        }
      }

      .media-banner-box {
        transition: all .5s ease;
        -webkit-transition: all .5s ease;
        -moz-transition: all .5s ease;
        -o-transition: all .5s ease;
        position: relative;
        width: 100%;
        height: 15%;
        background: rgba(245, 245, 245, 1.0);
        .media-info {
          top: 5px;
          position: absolute;
          bottom: 0px;
          padding-left: 10px;
          padding-right: 10px;
          width: 230px;
          height: 24px;
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
          font-size: 12px;
          color: rgba(20, 20, 20, 0.75);
          .left-part {
            width: 60%;
            display: flex;
            flex-wrap: nowrap;
            span {
              width: 150px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .right-part {
            color: #9ea7b4;
            align-items: right;
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row-reverse;

            .media-commentcount {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 575.98px) {
    .article-box-0 {
      cursor: pointer;
      display: flex;
      flex-wrap: wrap;
      transition: all .5s ease;
      -webkit-transition: all .5s ease;
      -moz-transition: all .5s ease;
      -o-transition: all .5s ease;
      width: 100%;
      overflow: hidden;
      border-radius: 2px;
      background: rgba(245, 245, 245, 1.0);
      text-align: left;
      &:hover {
        background: rgba(255, 255, 255, 1.0);
      }

      .article-img {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 100%;
          height: auto;
        }
      }

      .article-banner-box {
        width: 100%;
        position: relative;

        .article-type {
          padding-left: 10px;
          padding-right: 10px;
          font-size: 13px;
          width: 100%;
          margin: 10px auto;
          font-weight: bold;
          color: rgba(0, 140, 200, 1.0);
        }

        .article-title {
          padding-left: 10px;
          padding-right: 10px;
          width: 100%;
          margin: 10px auto;
          /*height: 25px;*/
          color: rgba(0, 0, 0, 1);
          font-size: 19px;
          font-weight: bold;
          transition: all .5s ease;
          -webkit-transition: all .5s ease;
          -moz-transition: all .5s ease;
          -o-transition: all .5s ease;
          /*overflow: hidden;*/
          /*text-overflow: ellipsis;*/
          /*white-space: nowrap;*/
        }

        .article-describe {
          width: 100%;
          margin: 10px auto;
          padding-left: 10px;
          color: #464c5b;
          font-size: 13px;
          overflow: hidden;
          /*white-space: nowrap;*/
          /*text-overflow: ellipsis;*/
          white-space: normal;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
        .article-info {
          width: 100%;
          padding-bottom: 5px;
          display: flex;
          flex-wrap: nowrap;
          font-size: 12px;
          color: #9ea7b4;
          justify-content: space-between;
          .left-part {
            width: 50%;
            display: flex;
            flex-wrap: nowrap;
            padding-left: 10px;
            .article-author {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .article-create-at {
              text-align: left;
              width: 40px;
              margin-left: 5px;
            }
          }
          .right-part {
            padding-right: 10px;
            align-items: right;
            width: 30%;
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row-reverse;
            .article-commentcount {
              margin-left: 10px;
            }
          }
        }
      }
    }

    .media-box-0 {
      cursor: pointer;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      height: 230px;
      overflow: hidden;
      border-radius: 2px;
      background: rgba(245, 245, 245, 1.0);
      color: rgba(245, 245, 245, 0.8);
      text-align: left;
      .box-wrap {
        width: 100%;
        &:hover {
          .type-icon {
            background: rgba(0, 0, 0, 0);
            .button {
              i {
                opacity: 1;
              }
            }
          }
          .media-banner-box {
            background: rgba(255, 255, 255, 1.0);
          }
        }
        .type-icon {
          width: 100%;
          height: 85%;

          position: relative;
          font-size: 14px;
          background: rgba(0, 0, 0, 0.1);
          transition: all .5s ease;
          -webkit-transition: all .5s ease;
          -moz-transition: all .5s ease;
          -o-transition: all .5s ease;
          .icon {
            margin-top: 0px;
            .video-icon, .radio-icon {
              margin-top: 5px;
              margin-left: 5px;
              height: 20px;
              i {
                font-size: 18px;
              }
            }
            .image-icon {
              height: 20px;
              margin-left: 5px;
              margin-top: 5px;
              i {
                font-size: 20px;
              }
            }
          }
          .button {
            i {
              opacity: 0;
              transition: all .5s ease;
              -webkit-transition: all .5s ease;
              -moz-transition: all .5s ease;
              -o-transition: all .5s ease;
              margin-left: 35%;
              margin-top: 15%;
              font-size: 75px;
            }
          }
        }
      }

      .media-banner-box {
        transition: all .5s ease;
        -webkit-transition: all .5s ease;
        -moz-transition: all .5s ease;
        -o-transition: all .5s ease;
        position: relative;
        width: 100%;
        height: 15%;
        background: rgba(245, 245, 245, 1.0);
        .media-info {
          top: 5px;
          position: absolute;
          bottom: 0px;
          width: 100%;
          height: 24px;
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
          font-size: 12px;
          color: rgba(20, 20, 20, 0.75);
          .left-part {
            padding-left: 10px;
            width: 50%;
            display: flex;
            flex-wrap: nowrap;
            span {
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .right-part {
            padding-right: 10px;
            color: #9ea7b4;
            align-items: right;
            width: 50%;
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row-reverse;

            .media-commentcount {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }

  .article-box-1 {
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    transition: all .5s ease;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -o-transition: all .5s ease;
    width: 100%;
    overflow: hidden;
    border-radius: 2px;
    background: rgba(245, 245, 245, 1.0);
    text-align: left;
    &:hover {
      background: rgba(255, 255, 255, 1.0);
    }

    .article-img {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        height: auto;
      }
    }

    .article-banner-box {
      width: 100%;
      position: relative;

      .article-type {
        padding-left: 10px;
        padding-right: 10px;
        font-size: 13px;
        width: 100%;
        margin: 10px auto;
        font-weight: bold;
        color: rgba(0, 140, 200, 1.0);
      }

      .article-title {
        padding-left: 10px;
        padding-right: 10px;
        width: 100%;
        margin: 10px auto;
        /*height: 25px;*/
        color: rgba(0, 0, 0, 1);
        font-size: 19px;
        font-weight: bold;
        transition: all .5s ease;
        -webkit-transition: all .5s ease;
        -moz-transition: all .5s ease;
        -o-transition: all .5s ease;
        /*overflow: hidden;*/
        /*text-overflow: ellipsis;*/
        /*white-space: nowrap;*/
      }

      .article-describe {
        width: 100%;
        margin: 10px auto;
        padding-left: 10px;
        color: #464c5b;
        font-size: 13px;
        overflow: hidden;
        /*white-space: nowrap;*/
        /*text-overflow: ellipsis;*/
        white-space: normal;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
      }
      .article-info {
        width: 100%;
        padding-bottom: 5px;
        display: flex;
        flex-wrap: nowrap;
        font-size: 12px;
        color: #9ea7b4;
        justify-content: space-between;
        .left-part {
          width: 50%;
          display: flex;
          flex-wrap: nowrap;
          padding-left: 10px;
          .article-author {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .article-create-at {
            text-align: left;
            width: 40px;
            margin-left: 5px;
          }
        }
        .right-part {
          padding-right: 10px;
          align-items: right;
          width: 30%;
          display: flex;
          flex-wrap: nowrap;
          flex-direction: row-reverse;
          .article-commentcount {
            margin-left: 10px;
          }
        }
      }
    }
  }

  .media-box-1 {
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 230px;
    overflow: hidden;
    border-radius: 2px;
    background: rgba(245, 245, 245, 1.0);
    color: rgba(245, 245, 245, 0.8);
    text-align: left;
    .box-wrap {
      width: 100%;
      &:hover {
        .type-icon {
          background: rgba(0, 0, 0, 0);
          .button {
            i {
              opacity: 1;
            }
          }
        }
        .media-banner-box {
          background: rgba(255, 255, 255, 1.0);
        }
      }
      .type-icon {
        width: 100%;
        height: 85%;

        position: relative;
        font-size: 14px;
        background: rgba(0, 0, 0, 0.1);
        transition: all .5s ease;
        -webkit-transition: all .5s ease;
        -moz-transition: all .5s ease;
        -o-transition: all .5s ease;
        .icon {
          margin-top: 0px;
          .video-icon, .radio-icon {
            margin-top: 5px;
            margin-left: 5px;
            height: 20px;
            i {
              font-size: 18px;
            }
          }
          .image-icon {
            height: 20px;
            margin-left: 5px;
            margin-top: 5px;
            i {
              font-size: 20px;
            }
          }
        }
        .button {
          i {
            opacity: 0;
            transition: all .5s ease;
            -webkit-transition: all .5s ease;
            -moz-transition: all .5s ease;
            -o-transition: all .5s ease;
            margin-left: 35%;
            margin-top: 15%;
            font-size: 75px;
          }
        }
      }
    }

    .media-banner-box {
      transition: all .5s ease;
      -webkit-transition: all .5s ease;
      -moz-transition: all .5s ease;
      -o-transition: all .5s ease;
      position: relative;
      width: 100%;
      height: 15%;
      background: rgba(245, 245, 245, 1.0);
      .media-info {
        top: 5px;
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 24px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        font-size: 12px;
        color: rgba(20, 20, 20, 0.75);
        .left-part {
          padding-left: 10px;
          width: 50%;
          display: flex;
          flex-wrap: nowrap;
          span {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .right-part {
          padding-right: 10px;
          color: #9ea7b4;
          align-items: right;
          width: 50%;
          display: flex;
          flex-wrap: nowrap;
          flex-direction: row-reverse;

          .media-commentcount {
            margin-left: 5px;
          }
        }
      }
    }
  }
</style>
