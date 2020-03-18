<template>
  <div :class="commentType===0?'comment-container-normal':'comment-container-reply'">
    <div class="comment-editor-box">
      <div class="title-text">评论区</div>
      <div class="send-comment">
        <div class="user-icon" id="userIcon">
          <div class="current-icon">
            <img :src="userIconUrlConfig[commentForm.head_icon_id]"
                 @click.stop="handleClickUserIcon"/>
          </div>
          <ul :class="showUserIconListFlag?'all-icon-list-active':'all-icon-list'"
              v-if="userIconUrlConfig.length > 0">
            <li class="icon-box" v-for="(item, index) in userIconUrlConfig" :key="index"
                @click="handleChangeUserIcon(index)">
              <img :src="item"/>
            </li>
          </ul>
        </div>

        <div class="comment-form">
          <textarea
            placeholder="想说点什么..."
            maxlength="300"
            v-model="commentForm.content"></textarea>

          <div class="warning-text">
            <div class="left">【请勿发布：广告 / 与内容无关 / 谩骂挑衅 / 人身攻击 / 代理发行 / 封建迷信 / 色情、政治内容的评论，违规内容将被删除或更改】</div>
            <div class="right">{{commentForm.content.length}}/300</div>
          </div>


          <div class="user-info">
            <div class="nickname-box">
              <span>昵称</span>
              <input type="text"
                     placeholder="*必填"
                     maxlength="16"
                     v-model="commentForm.nickname"/>
            </div>
            <div class="email-box">
              <span>邮箱</span>
              <input type="email"
                     placeholder="*必填,不会公开显示"
                     maxlength="32"
                     v-model="commentForm.email"/>
            </div>
          </div>

          <div class="identify">
            <div class="title">校验码</div>
            <div class="code-img" :key="needUpdateIdentifyFlag">
              <submit-identify @identifyCodeChange="handleIdentifyCodeUpdate"/>
            </div>
            <input type="number"
                   placeholder="*校验码(必填)"
                   maxlength="16"
                   v-model="commentForm.identifyCodeNum"/>
          </div>

          <div class="save-user">
            <label class="container">本地缓存用户昵称、头像和邮箱信息
              <input type="checkbox" v-model="commentForm.saveUserInfo">
              <span class="checkmark"></span>
            </label>
          </div>

          <div class="submit-button" @click.stop="handleSubmit">发表评论</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import SubmitIdentify from '../components/submit-identify';

  export default {
    name: "comment-editor",

    props: {
      //0普通评论  1回复评论
      commentType: {
        type: Number,
        default: 0,
        required: true,
      },

      parentArticleId: {
        type: Number,
        required: false,
      },

      parentCommentId: {
        type: Number,
        required: false,
      },
      replyUserName: {
        type: String,
        required: false,
      },
    },

    created() {

    },

    mounted() {
      this.resetCommentForm();
      document.addEventListener('click', this.handleClickPublic);
    },

    destroyed() {
      document.removeEventListener('click', this.handleClickPublic);
    },

    components: {
      SubmitIdentify,
    },

    data() {
      return {
        showUserIconListFlag: false,
        currentIdentifyCode: null,
        oriUserDate: null,
        needUpdateIdentifyFlag: false,
        commentForm: {
          nickname: '',
          email: '',
          head_icon_id: 0,
          content: '',
          saveUserInfo: false,
          identifyCodeNum: null,
        },
      }
    },

    computed: {
      ...mapState({
        userIconUrlConfig: state => state.user.userIconUrlConfig,
      }),
    },

    methods: {
      ...mapActions({
        createComment: 'comment/createComment',
        getLocalUserDate: 'user/getLocalStorageUserDate',
        setLocalUserDate: 'user/setLocalStorageUserDate',
        deleteLocalUserDate: 'user/clearLocalStorageUserDate',
        needUpdateCommentDate: 'comment/enableNeedUpdateComment',
        hideCommentEditorShowIndex: 'comment/hideCommentEditorShowIndex',
      }),

      handleClickPublic(e) {
        const that = this;
        // 判断被点击的元素是不是aaa元素，不是的话，就隐藏之
        if (e.target.id === 'userIcon') {
          that.showUserIconListFlag = !that.showUserIconListFlag;
        }
        else {
          that.showUserIconListFlag = false;
        }
        if (e && e.stopPropagation) {
          //因此它支持W3C的stopPropagation()方法
          e.stopPropagation();
        } else {
          //否则，我们需要使用IE的方式来取消事件冒泡
          window.event.cancelBubble = true;
        }
      },

      handleClickUserIcon() {
        this.showUserIconListFlag = !this.showUserIconListFlag;
      },

      handleIdentifyCodeUpdate(newValue) {
        this.currentIdentifyCode = newValue;
      },

      async handleSubmit() {
        if (!this.commentForm) return;

        let tempCode = parseInt(this.commentForm.identifyCodeNum);
        let errMsg = '';
        if (tempCode !== this.currentIdentifyCode) errMsg = '验证码错误！';
        if (this.commentForm.nickname === '') errMsg = '必须填写用户昵称！';
        if (this.commentForm.email === '') errMsg = '必须填写用户邮箱！';
        if (!this.emailCheck(this.commentForm.email)) errMsg = '电子邮件地址格式错误！';
        if (this.commentForm.content === '') errMsg = '评论内容不能为空！';
        if (this.commentType === 1 && (!this.parentCommentId || !this.replyUserName)) errMsg = '无法获取该条评论信息，请刷新后重试！';

        if (errMsg === '') {
          let res;
          if (this.commentType === 0) {
            res = await this.createComment({
              commentType: this.commentType,
              nickname: this.commentForm.nickname,
              email: this.commentForm.email,
              head_icon_id: this.commentForm.head_icon_id,
              content: this.commentForm.content,
              article_id: this.parentArticleId,
            });
          }
          else {
            if (this.parentCommentId && this.replyUserName) {
              res = await this.createComment({
                commentType: this.commentType,
                nickname: this.commentForm.nickname,
                email: this.commentForm.email,
                head_icon_id: this.commentForm.head_icon_id,
                content: this.commentForm.content,
                parent_comment_id: this.parentCommentId,
                reply_user_name: this.replyUserName,
              });
            }
          }

          if (res) {
            this.$message({
              type: 'success',
              message: `评论发表成功`,
            });
            await this.hideCommentEditorShowIndex();
            if (this.commentForm.saveUserInfo) {
              await this.setLocalUserDate({
                nickname: this.commentForm.nickname,
                email: this.commentForm.email,
                head_icon_id: this.commentForm.head_icon_id,
              });
              this.oriUserDate = await this.getLocalUserDate();
            } else {
              await this.deleteLocalUserDate();
            }
            await this.resetCommentForm();
            await this.needUpdateCommentDate();
          }
        } else {
          this.$message({
            type: 'error',
            message: errMsg,
          });
        }
      },

      async resetCommentForm() {
        this.oriUserDate = await this.getLocalUserDate();
        if (this.oriUserDate && this.oriUserDate.nickname && this.oriUserDate.email && this.oriUserDate.head_icon_id.toString()) {
          this.commentForm.saveUserInfo = true;
          this.commentForm.nickname = this.oriUserDate.nickname;
          this.commentForm.email = this.oriUserDate.email;
          this.commentForm.head_icon_id = this.oriUserDate.head_icon_id;
        } else {
          this.commentForm.saveUserInfo = false;
          this.commentForm.nickname = '';
          this.commentForm.email = '';
          this.commentForm.head_icon_id = 0;
          await this.deleteLocalUserDate();
        }
        this.commentForm.content = '';
        this.commentForm.identifyCodeNum = null;
        this.needUpdateIdentifyFlag = !this.needUpdateIdentifyFlag;
      },

      handleChangeUserIcon(newIndex) {
        this.commentForm.head_icon_id = newIndex;
      },

      emailCheck(emailStr) {
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!myreg.test(emailStr)) { //正则验证不通过，格式不对
          return false;
        } else {
          return true;
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  @media screen and (min-width: 1140px) {
    .comment-container-normal, .comment-container-reply {
      width: 100%;
      .comment-editor-box {
        width: 75%;
        margin: 30px auto;
        .title-text {
          font-size: 18px;
          font-weight: bold;
          height: 30px;
        }
        .send-comment {
          width: 100%;
          margin: 30px auto;
          display: flex;
          flex: 2;
          .user-icon {
            height: 70px;
            .current-icon {
              border-radius: 50%;
              background: rgba(20, 20, 20, 0.5);
              box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
              width: 55px;
              height: 55px;
              overflow: hidden;
              cursor: pointer;
              img {
                width: 55px;
                height: 55px;
              }
            }
            .all-icon-list, .all-icon-list-active {
              z-index: 10;
              position: absolute;
              transition: all .25s ease;
              -webkit-transition: all .25s ease; /* Safari */
              -moz-transition: all .25s ease;
              -o-transition: all .25s ease;
              overflow: hidden;
              list-style: none;
              display: flex;
              flex-wrap: wrap;
              justify-content: normal;
              background: rgba(250, 250, 250, 1.0);
              box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.4);
              padding-left: 5px;
              .icon-box {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
                margin-left: 10px;
                margin-top: 5px;
                img {
                  cursor: pointer;
                  width: 50px;
                  height: 50px;
                }
                &:hover {
                  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.4);
                }
              }
            }

            .all-icon-list {
              width: 0px;
              height: 0px;
            }
            .all-icon-list-active {
              width: 310px;
              height: 200px;
            }
          }

          .comment-form {
            width: 100%;
            margin-left: 20px;
            margin-top: 0px;
            textarea {
              padding-left: 0.75em;
              font-size: 16px;
              width: 98%;
              height: 170px;
              border-radius: 4px;
              border: 1px solid rgba(0, 0, 0, 0);
              color: rgba(20, 20, 20, 0.9);
              background: rgba(20, 20, 20, 0.1);
            }
            textarea::-webkit-input-placeholder {
              color: rgba(20, 20, 20, .6);
            }
            textarea::-moz-placeholder {
              color: rgba(20, 20, 20, .6);
            }
            textarea::-ms-input-placeholder {
              color: rgba(20, 20, 20, .6);
            }

            .user-info, .identify {
              display: flex;
              flex-wrap: nowrap;
              input {
                text-indent: 0.25em;
                text-align: left;
                margin-left: 10px;
                font-size: 14px;
                width: 200px;
                height: 30px;
                border-radius: 4px;
                border: 1px solid rgba(0, 0, 0, 0);
                color: rgba(20, 20, 20, 0.9);
                background: rgba(20, 20, 20, 0.1);
              }
              input::-webkit-outer-spin-button,
              input::-webkit-inner-spin-button {
                -webkit-appearance: none;
              }
              input[type="number"] {
                -moz-appearance: textfield;
              }
            }

            .save-user {
              .container {
                margin-top: 10px;
                display: block;
                position: relative;
                padding-left: 35px;
                margin-bottom: 0px;
                cursor: pointer;
                font-size: 14px;
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

            .warning-text {
              display: flex;
              flex-wrap: nowrap;
              justify-content: space-between;
              font-size: 12px;
              color: rgba(20, 20, 20, 0.5);
              line-height: 15px;
            }

            .user-info {
              margin: 15px auto;
              display: flex;
              flex-wrap: nowrap;
              justify-content: space-between;
              .nickname-box, .email-box {
                width: 100%;
                span {
                  font-size: 16px;
                  font-weight: normal;
                }
              }
            }

            .identify {
              input {
                margin-top: 3px;
                width: 100px;
              }
              .title {
                font-size: 14px;
                line-height: 40px;
              }
              .code-img {
                margin-top: 3px;
                align-items: center;
                height: 35px;
                margin-left: 10px;
                background: rgba(0, 0, 0, 0.05);
                border-radius: 2px;
              }
            }

            .submit-button {
              cursor: pointer;
              text-align: center;
              margin-top: 15px;
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

    .comment-container-reply {
      .comment-editor-box {
        margin-left: 0px;
        .title-text {
          display: none;
        }
        .send-comment {

          .user-info {

            .nickname-box, .email-box {
              input {
                width: 160px;
              }

            }

          }
        }
      }

    }
  }

  @media screen and (min-width: 576px) and (max-width: 1139.98px) {
    .comment-container-normal, .comment-container-reply {
      width: 100%;
      .comment-editor-box {
        width: 100%;
        margin: 10px auto;
        .title-text {
          font-size: 18px;
          font-weight: bold;
          height: 30px;
        }
        .send-comment {
          width: 100%;
          margin: 0px auto;
          display: flex;
          flex: 2;
          .user-icon {
            height: 70px;
            .current-icon {
              border-radius: 50%;
              background: rgba(20, 20, 20, 0.5);
              box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
              width: 40px;
              height: 40px;
              overflow: hidden;
              cursor: pointer;
              img {
                width: 40px;
                height: 40px;
              }
            }
            .all-icon-list, .all-icon-list-active {
              z-index: 10;
              position: absolute;
              transition: all .25s ease;
              -webkit-transition: all .25s ease; /* Safari */
              -moz-transition: all .25s ease;
              -o-transition: all .25s ease;
              overflow: hidden;
              list-style: none;
              display: flex;
              flex-wrap: wrap;
              justify-content: normal;
              background: rgba(250, 250, 250, 1.0);
              box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.4);
              padding-left: 5px;
              .icon-box {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
                margin-left: 10px;
                margin-top: 5px;
                img {
                  cursor: pointer;
                  width: 50px;
                  height: 50px;
                }
                &:hover {
                  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.4);
                }
              }
            }

            .all-icon-list {
              width: 0px;
              height: 0px;
            }
            .all-icon-list-active {
              width: 310px;
              height: 200px;
            }
          }

          .comment-form {
            width: 100%;
            margin-left: 10px;
            margin-top: 0px;
            padding-right: 10px;
            textarea {
              padding-left: 0.75em;
              font-size: 16px;
              width: 98%;
              height: 170px;
              border-radius: 4px;
              border: 1px solid rgba(0, 0, 0, 0);
              color: rgba(20, 20, 20, 0.9);
              background: rgba(20, 20, 20, 0.1);
            }
            textarea::-webkit-input-placeholder {
              color: rgba(20, 20, 20, .6);
            }
            textarea::-moz-placeholder {
              color: rgba(20, 20, 20, .6);
            }
            textarea::-ms-input-placeholder {
              color: rgba(20, 20, 20, .6);
            }

            .user-info, .identify {
              display: flex;
              flex-wrap: nowrap;
              input {
                text-indent: 0.25rem;
                text-align: left;
                margin-left: 10px;
                font-size: 12px;
                width: 60%;
                height: 30px;
                border-radius: 4px;
                border: 1px solid rgba(0, 0, 0, 0);
                color: rgba(20, 20, 20, 0.9);
                background: rgba(20, 20, 20, 0.1);
              }
              input::-webkit-outer-spin-button,
              input::-webkit-inner-spin-button {
                -webkit-appearance: none;
              }
              input[type="number"] {
                -moz-appearance: textfield;
              }
            }

            .save-user {
              .container {
                margin-top: 10px;
                display: block;
                position: relative;
                padding-left: 35px;
                margin-bottom: 0px;
                cursor: pointer;
                font-size: 14px;
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

            .warning-text {
              display: flex;
              flex-wrap: nowrap;
              justify-content: space-between;
              font-size: 12px;
              color: rgba(20, 20, 20, 0.5);
              line-height: 15px;
            }

            .user-info {
              margin: 15px auto;
              display: flex;
              flex-wrap: nowrap;
              justify-content: space-between;
              .nickname-box, .email-box {
                width: 100%;
                span {
                  font-size: 16px;
                  font-weight: normal;
                }
              }
            }

            .identify {
              input {
                margin-top: 3px;
                width: 100px;
              }
              .title {
                font-size: 14px;
                line-height: 40px;
              }
              .code-img {
                margin-top: 3px;
                align-items: center;
                height: 35px;
                margin-left: 10px;
                background: rgba(0, 0, 0, 0.05);
                border-radius: 2px;
              }
            }

            .submit-button {
              cursor: pointer;
              text-align: center;
              margin-top: 15px;
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

    .comment-container-reply {
      .comment-editor-box {
        margin-left: 0px;
        .title-text {
          display: none;
        }
        .send-comment {

          .user-info {

            .nickname-box, .email-box {
              input {
                width: 160px;
              }

            }

          }
        }
      }

    }
  }

  @media screen and (max-width: 575.98px) {
    .comment-container-normal, .comment-container-reply {
      width: 100%;
      .comment-editor-box {
        width: 100%;
        margin: 0px auto;
        .title-text {
          font-size: 18px;
          font-weight: bold;
          height: 30px;
        }
        .send-comment {
          width: 100%;
          margin: 0px auto;
          display: flex;
          flex: 2;
          .user-icon {
            height: 70px;
            .current-icon {
              border-radius: 50%;
              background: rgba(20, 20, 20, 0.5);
              box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
              width: 40px;
              height: 40px;
              overflow: hidden;
              cursor: pointer;
              img {
                width: 40px;
                height: 40px;
              }
            }
            .all-icon-list, .all-icon-list-active {
              z-index: 10;
              position: absolute;
              transition: all .25s ease;
              -webkit-transition: all .25s ease; /* Safari */
              -moz-transition: all .25s ease;
              -o-transition: all .25s ease;
              overflow: hidden;
              list-style: none;
              display: flex;
              flex-wrap: wrap;
              justify-content: normal;
              background: rgba(250, 250, 250, 1.0);
              box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.4);
              padding-left: 5px;
              .icon-box {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
                margin-left: 10px;
                margin-top: 5px;
                img {
                  cursor: pointer;
                  width: 50px;
                  height: 50px;
                }
                &:hover {
                  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.4);
                }
              }
            }

            .all-icon-list {
              width: 0px;
              height: 0px;
            }
            .all-icon-list-active {
              width: 310px;
              height: 200px;
            }
          }

          .comment-form {
            width: 100%;
            margin-left: 10px;
            margin-top: 0px;
            padding-right: 10px;
            textarea {
              padding-left: 0.75em;
              font-size: 16px;
              width: 98%;
              height: 170px;
              border-radius: 4px;
              border: 1px solid rgba(0, 0, 0, 0);
              color: rgba(20, 20, 20, 0.9);
              background: rgba(20, 20, 20, 0.1);
            }
            textarea::-webkit-input-placeholder {
              color: rgba(20, 20, 20, .6);
            }
            textarea::-moz-placeholder {
              color: rgba(20, 20, 20, .6);
            }
            textarea::-ms-input-placeholder {
              color: rgba(20, 20, 20, .6);
            }

            .save-user {
              .container {
                margin-top: 10px;
                display: block;
                position: relative;
                padding-left: 35px;
                margin-bottom: 0px;
                cursor: pointer;
                font-size: 14px;
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

            .warning-text {
              display: flex;
              flex-wrap: nowrap;
              justify-content: space-between;
              font-size: 12px;
              color: rgba(20, 20, 20, 0.5);
              line-height: 15px;
            }

            .user-info {
              display: flex;
              flex-wrap: wrap;
              input {
                text-indent: 0.25rem;
                text-align: left;
                margin-top: 5px;
                font-size: 12px;
                width: 100%;
                height: 30px;
                border-radius: 4px;
                border: 1px solid rgba(0, 0, 0, 0);
                color: rgba(20, 20, 20, 0.9);
                background: rgba(20, 20, 20, 0.1);
              }
              input::-webkit-outer-spin-button,
              input::-webkit-inner-spin-button {
                -webkit-appearance: none;
              }
              input[type="number"] {
                -moz-appearance: textfield;
              }
              .nickname-box, .email-box {
                width: 100%;
                margin: 5px auto;
                span {
                  font-size: 16px;
                  font-weight: normal;
                }
              }
            }

            .identify {
              input {
                width: 100%;
                text-indent: 0.25rem;
                text-align: left;
                margin-top: 5px;
                font-size: 12px;
                height: 30px;
                border-radius: 4px;
                border: 1px solid rgba(0, 0, 0, 0);
                color: rgba(20, 20, 20, 0.9);
                background: rgba(20, 20, 20, 0.1);
              }
              .title {
                font-size: 14px;
                line-height: 40px;
              }
              .code-img {
                align-items: center;
                height: 35px;
                width: 100px;
                background: rgba(0, 0, 0, 0.05);
                border-radius: 2px;
              }
            }

            .submit-button {
              cursor: pointer;
              text-align: center;
              margin-top: 15px;
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

    .comment-container-reply {
      .comment-editor-box {
        margin-left: 0px;
        .title-text {
          display: none;
        }
        .send-comment {

          .user-info {

            .nickname-box, .email-box {
              input {

              }
            }
          }
        }
      }

    }
  }
</style>
