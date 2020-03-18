<template>
  <div class="comment-container" v-if="commentDate">
    <div class="comment-wrap">
      <div class="user-icon">
        <img :src="userIconUrlConfig[commentDate.head_icon_id]"/>
      </div>
      <div class="comment-box">
        <div class="first-line">
          <div class="user-name">{{commentDate.nickname}}</div>
          <div class="post-user" v-if="commentDate.reply_user_name"><i class="icon el-icon-caret-right"></i>
            {{commentDate.reply_user_name}}
          </div>
          <div class="time"><span>·</span> {{this.$store.getters['user/translateDateInfo'](commentDate.create_at)}}
          </div>
        </div>
        <div class="second-line">{{commentDate.cover_text?coverText:commentDate.content}}</div>
        <div class="third-line">
          <div class="like" @click.stop="handleClickBtn(0)">
            <i class="icondianzan1 el-iconfont"></i>
            <span>{{commentDate.likecount?commentDate.likecount:0}}</span>
          </div>
          <div class="hate" @click.stop="handleClickBtn(1)">
            <i class="icondianzan1 el-iconfont"></i>
            <span>{{commentDate.hatecount?commentDate.hatecount:0}}</span>
          </div>
          <div class="reply" @click.stop="handleClickReplyBtn">回复</div>
          <div class="point">·</div>
          <div class="report" @click.stop="handleClickReportBtn">举报</div>
        </div>
        <div class="reply-editor"
             v-if="(!commentDate.parent_comment_id&&commentDate.id===showCommentEditorIndex.normalId)||(commentDate.parent_comment_id&&commentDate.id===showCommentEditorIndex.replyId)">
          <comment-editor :comment-type="1"
                          :parent-comment-id="commentDate.parent_comment_id?commentDate.parent_comment_id:commentDate.id"
                          :reply-user-name="commentDate.nickname"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import CommentEditor from '../components/comment-editor';
  import MessageBoxReport from '../components/message-box-report';

  export default {
    name: "comment-banner",

    components: {
      CommentEditor,
      MessageBoxReport
    },

    data() {
      return {
        commentHandleFlag: {
          likeHateThisCommentFlag: false,
          reportThisCommentFlag: false,
        }
      }
    },

    props: {
      //0普通评论  1回复评论
      commentType: {
        type: Number,
        default: 0,
        required: true,
      },
      commentDate: {
        required: true,
      },
    },
    created() {

    },

    mounted() {
      this.handleCommentDate();
    },

    watch: {},

    computed: {
      ...mapState({
        userIconUrlConfig: state => state.user.userIconUrlConfig,
        showCommentEditorIndex: state => state.comment.showCommentEditorIndex,
      }),

      coverText: {
        get() {
          let str = '';
          if (this.commentDate && this.commentDate.content) {
            for (let i = 0; i < this.commentDate.content.length; i++) {
              str += '.'
            }
          }
          return str;
        },
      }
    },

    methods: {
      ...
        mapActions({
          handleCommentOnClick: 'comment/handleComment',
          changeCommentEditorShowIndex: 'comment/changeCommentEditorShowIndex',
          showReportCommentBox: 'comment/showReportCommentBox',
        }),

      async handleClickBtn(tempHandleType) {
        if (((tempHandleType === 0 || tempHandleType === 1) && this.commentHandleFlag.likeHateThisCommentFlag) || (tempHandleType === 2 && this.commentHandleFlag.reportThisCommentFlag)) {
          this.$message({
            type: 'error',
            message: `已操作`,
          });
          return;
        }
        if (this.commentDate && this.commentDate.id) {
          let res = await this.handleCommentOnClick({
            id: this.commentDate.id,
            commentType: this.commentType,
            handleType: tempHandleType,
          });
          if (res) {
            if (tempHandleType === 0) {
              this.commentHandleFlag.likeHateThisCommentFlag = true;
              this.commentDate.likecount++;
            }
            else if (tempHandleType === 1) {
              this.commentHandleFlag.likeHateThisCommentFlag = true;
              this.commentDate.hatecount++;
            } else if (tempHandleType === 2) {
              this.commentHandleFlag.reportThisCommentFlag = true;
            }
          }
        }
      },

      async handleClickReplyBtn() {
        if (this.commentDate.parent_comment_id) {
          await this.changeCommentEditorShowIndex([null, this.commentDate.id]);
        } else {
          await  this.changeCommentEditorShowIndex([this.commentDate.id, null]);
        }
      },

      handleCommentDate() {
        if (!this.commentDate) return;
        this.commentHandleFlag.likeHateThisCommentFlag = this.$store.getters['comment/checkCommentHandle'](this.commentDate.id, this.commentType, 0);
        this.commentHandleFlag.reportThisCommentFlag = this.$store.getters['comment/checkCommentHandle'](this.commentDate.id, this.commentType, 1);
      },

      handleClickReportBtn() {
        this.showReportCommentBox([this.commentDate.parent_comment_id ? 1 : 0, this.commentDate.id]);
      },
    },
  }
</script>

<style lang="scss" scoped>
  @media screen and (min-width: 1140px) {
    .comment-container {
      width: 100%;
      .comment-wrap {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        .user-icon {
          border-radius: 50%;
          background: rgba(20, 20, 20, 0.5);
          box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
          width: 55px;
          min-width: 55px;
          height: 55px;
          overflow: hidden;
          img {
            width: 55px;
            height: 55px;
          }
        }

        .comment-box {
          transition: height .5s ease;
          -webkit-transition: height .5s ease;
          -moz-transition: height .5s ease;
          -o-transition: height .5s ease;
          display: flex;
          flex-wrap: wrap;
          padding-left: 15px;
          padding-top: 10px;
          height: 100%;
          overflow: hidden;
          .first-line, .third-line {
            text-align: left;
            padding-bottom: 10px;
            display: flex;
            flex-wrap: nowrap;
            width: 100%;
          }
          .first-line {
            .user-name {
              line-height: 25px;
              font-size: 16px;
              font-weight: bold;
              color: rgba(20, 20, 20, 0.85);
            }
            .post-user, .time {
              padding-left: 0.5em;
              line-height: 25px;
              font-size: 13px;
              color: #9ea7b4;
              span {
                font-size: 16px;
                font-weight: bold;
              }
            }
          }
          .second-line {
            word-break: break-word;
            padding-right: 20px;
            text-align: left;
            padding-bottom: 10px;
            font-weight: normal;
            font-size: 18px;
            color: rgba(20, 20, 20, 0.85);
          }

          .third-line {
            font-size: 13px;
            color: #9ea7b4;

            .hate, .like {
              cursor: pointer;
            }
            .hate {
              display: flex;
              flex-wrap: nowrap;
              margin-left: 1em;

              i {
                line-height: 20px;
                display: block;
                transform: rotate(180deg);
                -ms-transform: rotate(180deg); /* IE 9 */
                -moz-transform: rotate(180deg); /* Firefox */
                -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
                -o-transform: rotate(180deg); /* Opera */
              }
              span {
                margin-left: 0.25em;
              }
            }
            .reply {
              cursor: pointer;
              margin-left: 2em;
            }
            .point {
              font-size: 14px;
              margin-left: 0.5em;
              font-weight: bold;
            }
            .report {
              cursor: pointer;
              margin-left: 0.5em;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1139.8px) {
    .comment-container {
      width: 100%;
      .comment-wrap {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        .user-icon {
          border-radius: 50%;
          background: rgba(20, 20, 20, 0.5);
          box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
          width: 40px;
          min-width: 40px;
          height: 40px;
          overflow: hidden;
          img {
            width: 40px;
            height: 40px;
          }
        }

        .comment-box {
          transition: height .5s ease;
          -webkit-transition: height .5s ease;
          -moz-transition: height .5s ease;
          -o-transition: height .5s ease;
          display: flex;
          flex-wrap: wrap;
          padding-left: 15px;
          padding-top: 10px;
          height: 100%;
          .first-line, .third-line {
            text-align: left;
            padding-bottom: 10px;
            display: flex;
            flex-wrap: nowrap;
            width: 100%;
          }
          .first-line {
            .user-name {
              line-height: 25px;
              font-size: 16px;
              font-weight: bold;
              color: rgba(20, 20, 20, 0.85);
            }
            .post-user, .time {
              padding-left: 0.5em;
              line-height: 25px;
              font-size: 13px;
              color: #9ea7b4;
              span {
                font-size: 16px;
                font-weight: bold;
              }
            }
          }
          .second-line {
            word-break: break-word;
            padding-right: 20px;
            text-align: left;
            padding-bottom: 10px;
            font-weight: normal;
            font-size: 18px;
            color: rgba(20, 20, 20, 0.85);
          }
          .third-line {
            font-size: 13px;
            color: #9ea7b4;

            .hate, .like {
              cursor: pointer;
            }
            .hate {
              display: flex;
              flex-wrap: nowrap;
              margin-left: 1em;

              i {
                line-height: 20px;
                display: block;
                transform: rotate(180deg);
                -ms-transform: rotate(180deg); /* IE 9 */
                -moz-transform: rotate(180deg); /* Firefox */
                -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
                -o-transform: rotate(180deg); /* Opera */
              }
              span {
                margin-left: 0.25em;
              }
            }
            .reply {
              cursor: pointer;
              margin-left: 2em;
            }
            .point {
              font-size: 14px;
              margin-left: 0.5em;
              font-weight: bold;
            }
            .report {
              cursor: pointer;
              margin-left: 0.5em;
            }
          }
          .reply-editor {
            margin-left: -55px;
          }
        }
      }
    }
  }
</style>
