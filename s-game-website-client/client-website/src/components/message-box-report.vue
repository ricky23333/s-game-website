<template>
  <section class="container">
    <transition name="fade" mode="out-in">
      <section class="wrap" v-if="commentReportIndexDate.commentType!==null&&commentReportIndexDate.commentId!==null">
        <div class="box">
          <i @click.stop="handleClose" class="icon el-icon-close"></i>
          <div class="first-line"> 举报</div>
          <div class="second-line"> 请选择举报理由</div>
          <div class="text-box">
            <li class="text-item" v-for="(item,index) in  reportTextConfig" :key="index">
              <label class="text-container">
                <input v-if="index===0" type="radio" value="" name="message" checked>
                <input v-else type="radio" value="" name="message">
                <span class="checkmark"></span>{{item.content}}
              </label>
            </li>
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
    name: "message-box-report",

    data() {
      return {
        selectIndex: 0,
        reportTextConfig: [
          {
            content: '色情、暴力等违反法律法规内容',
          },
          {
            content: '挑衅、人身攻击等不友善内容',
          },
          {
            content: '垃圾信息（含广告），无意义灌水',
          },
          {
            content: '内容与话题不符',
          },
        ],
      }
    },

    created() {

    },

    mounted() {

    },

    watch: {

    },

    computed: {
      ...mapState({
        commentReportIndexDate: state => state.comment.showCommentReportIndex,
      }),
    },

    methods: {
      ...
        mapActions({
          handleCommentOnClick: 'comment/handleComment',
          hideReportCommentBox: 'comment/hideReportCommentBox',
        }),

      async handleConfirm() {

        if (this.commentReportIndexDate.commentType === null || this.commentReportIndexDate.commentId === null) {
          this.handleClose();
          return;
        }
        let handleReportFlag = this.$store.getters['comment/checkCommentHandle'](this.commentReportIndexDate.commentId, this.commentReportIndexDate.commentType, 2);
        if (handleReportFlag) {
          this.$message({
            type: 'error',
            message: `已操作`,
          });
          this.handleClose();
          return;
        }
        let res = await this.handleCommentOnClick({
          id: this.commentReportIndexDate.commentId,
          commentType: this.commentReportIndexDate.commentType,
          handleType: 2,
        });
        if (res) {
          this.$message({
            type: 'success',
            message: `已举报`,
          });
          this.handleClose();
        }
      },

      handleClose() {
        this.hideReportCommentBox();
      },
    },
  }
</script>

<style lang="scss" scoped>
  @media screen and (min-width: 576px){
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
            padding-top: 10px;
            line-height: 25px;
            width: 100%;
            font-size: 22px;
            font-weight: bold;
            height: 25px;
          }
          .second-line {
            position: relative;
            width: 100%;
            font-size: 16px;
            margin-top: 0px;
            height: 18px;
          }

          .text-box {
            position: relative;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            font-size: 16px;
            height: 150px;
            .text-item {
              width: 100%;
              .text-container {
                margin-top: 10px;
                display: block;
                position: relative;
                padding-left: 35px;
                margin-bottom: 0px;
                cursor: pointer;
                font-size: 14px;
              }
              /* Hide the browser's default checkbox */
              .text-container input {
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
              .text-container input:checked + .checkmark {
                background-color: rgba(20, 20, 20, 1.0);
              }
              .text-container input:checked + .checkmark:after {
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
          }

          .confirm-btn {
            position: relative;
            cursor: pointer;
            text-align: center;
            margin-left: 240px;
            margin-top: 0px;
            width: 150px;
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
            margin-left: 305px;
            font-size: 30px;
            font-weight: bold;
            color: rgba(200, 200, 200, 0.8);
            &:hover {
              color: rgba(200, 200, 200, 0.9);
            }
          }

          .first-line {
            padding-left: 15px;
            padding-top: 10px;
            line-height: 25px;
            width: 100%;
            font-size: 22px;
            font-weight: bold;
            height: 25px;
          }
          .second-line {
            padding-left: 15px;
            position: relative;
            width: 100%;
            font-size: 16px;
            margin-top: 0px;
            height: 18px;
          }

          .text-box {
            padding-left: 15px;
            position: relative;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            font-size: 16px;
            height: 150px;
            .text-item {
              width: 100%;
              .text-container {
                margin-top: 10px;
                display: block;
                position: relative;
                padding-left: 35px;
                margin-bottom: 0px;
                cursor: pointer;
                font-size: 14px;
              }
              /* Hide the browser's default checkbox */
              .text-container input {
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
              .text-container input:checked + .checkmark {
                background-color: rgba(20, 20, 20, 1.0);
              }
              .text-container input:checked + .checkmark:after {
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
          }

          .confirm-btn {
            position: relative;
            cursor: pointer;
            text-align: center;
            margin: 0 auto;
            width: 100px;
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
