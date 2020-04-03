<template>
  <div class="footer-box" id="mainFooterBox">
    <section class="title-banner">
      <div class="game-name">
        <span>STELLARBUG</span>
      </div>
      <div class="links-container">
        <div class="links-box">
          <li v-for="(item,index) in  linkAry">
            <span class="link-text" @click.stop="handleClickLinks(item,index)"> {{item.name}} </span>
          </li>
        </div>
      </div>
    </section>

    <section class="info-banner">
      <section class="left-part">
        <div class="website-info-1">StellarBug(中文名《星虫》)（暂定）是一个基于Unity2D开发的像素风格的俯视角星际探索类沙盒游戏</div>
        <div class="website-info-2">
          游戏正处于早期开发阶段，目前仅我一人用爱发电独立制作中。。。若开发者对合作开发此游戏感兴趣，可通过邮箱526046576@qq.com联系我洽谈合作事宜；
          若玩家对游玩此游戏感兴趣，可关注收藏此网站，实时获取游戏开发动态，在评论区分享你的想法，并在不远的将来第一时间获取最新体验Demo。
          我将在网站上不定期分享游戏开发日志、技术文章、开源代码以及好玩的东西，欢迎大家常来看看o(∩_∩)o
        </div>
        <div class="website-info-3">
          Copyright © 2020 - 2020 AHYAYA. All Rights Reserved
        </div>
        <div class="links-container-bottom">
          <div class="links-box">
            <li v-for="(item,index) in  linkAry">
              <span class="link-text" @click.stop="handleClickLinks(item,index)"> {{item.name}} </span>
            </li>
          </div>
        </div>
      </section>

      <section class="right-part">
        <div class="fast-contact">
          <div class="title-text">给开发者留言</div>
          <div class="name-text">
            <div class="icon">
              <i class="icon el-icon-user-solid"></i>
            </div>
            <input type="text"
                   placeholder="您的姓名"
                   maxlength="16"
                   @keyup.enter="handleSubmit"
                   v-model="messageForm.nickname"/>
          </div>

          <div class="mail-text">
            <div class="icon">
              <i class="icon el-icon-message"></i>
            </div>
            <input type="email"
                   placeholder="您的邮箱"
                   maxlength="32"
                   @keyup.enter="handleSubmit"
                   v-model="messageForm.email"/>
          </div>

          <div class="message-text">
          <textarea
            placeholder="请输入留言(长度不超过300个字符)"
            maxlength="300"
            rows="5"
            @keyup.enter="handleSubmit"
            v-model="messageForm.content">
          </textarea>
            <!--<div class="font-count">{{messageForm.content.length}}/300</div>-->
          </div>

          <div class="identify">
            <div class="title">校验码</div>
            <div class="code-img" :key="needUpdateIdentifyFlag">
              <submit-identify @identifyCodeChange="handleIdentifyCodeUpdate" :width="'85px'" :height="'25px'"/>
            </div>
            <input type="number"
                   placeholder="校验码(必填)"
                   maxlength="16"
                   v-model="messageForm.identifyCodeNum"/>
          </div>

          <div class="confirm-button" @click.stop="handleSubmit">发送留言</div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import SubmitIdentify from '../components/submit-identify';

  export default {
    components: {
      SubmitIdentify,
    },

    data() {
      return {
        footerStyleIndex: 0,
        linkAry: [
          {name: '联系我们/CONTACT US', path: ''},
          {name: '用户协议', path: '/terms'},
          {name: '隐私政策', path: '/privacy'},
        ],
        currentIdentifyCode: null,
        needUpdateIdentifyFlag: false,
        messageForm: {
          nickname: '',
          email: '',
          content: '',
          identifyCodeNum: null,
        },
      }
    },

    mounted() {

    },

    computed: {},


    methods: {
      toPath(path) {
        this.$router.push(path);
      },

      ...mapActions({
        createComment: 'comment/createComment',
        showContactUsMessageBox: 'user/showContactUsMessageBox',
      }),

      handleClickLinks(item, index) {
        if (index === 0) {
          this.showContactUsMessageBox();
        } else {
          this.toPath(item.path);
        }
      },

      handleIdentifyCodeUpdate(newValue) {
        this.currentIdentifyCode = newValue;
      },

      async handleSubmit() {
        if (!this.messageForm) return;

        let tempCode = parseInt(this.messageForm.identifyCodeNum);
        let errMsg = '';
        if (tempCode !== this.currentIdentifyCode) errMsg = '验证码错误！';
        if (this.messageForm.nickname === '') errMsg = '必须填写用户昵称！';
        if (this.messageForm.email === '') errMsg = '必须填写用户邮箱！';
        if (!this.emailCheck(this.messageForm.email)) errMsg = '电子邮件地址格式错误！';
        if (this.messageForm.content === '') errMsg = '评论内容不能为空！';

        if (errMsg === '') {
          let res = await this.createComment({
            commentType: 2,
            nickname: this.messageForm.nickname,
            email: this.messageForm.email,
            content: this.messageForm.content,
          });

          if (res) {
            this.$message({
              type: 'success',
              message: `信息已发送`,
            });
            await this.resetMessageForm();
          }
        } else {
          this.$message({
            type: 'error',
            message: errMsg,
          });
        }
      },

      async resetMessageForm() {
        this.messageForm.nickname = '';
        this.messageForm.email = '';
        this.messageForm.content = '';
        this.messageForm.identifyCodeNum = null;
        this.needUpdateIdentifyFlag = !this.needUpdateIdentifyFlag;
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

    watch: {
      '$route'(to, from) {
      }
    },
  }
</script>

<style lang="scss" scoped>
  @media screen and (min-width: 1140px) {
    .footer-box {
      width: 1140px;
      margin: 0px auto;
      color: rgba(250, 250, 250, .7);
      .title-banner {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        border-bottom: 1px solid rgba(200, 200, 200, 0.45);
        .game-name {
          color: rgba(230, 230, 230, .9);
          font-size: 32px;
          font-weight: bold;
          span {
            line-height: 60px;
            cursor: pointer;
          }
        }

        .links-container {
          .links-box {
            display: flex;
            flex-wrap: nowrap;
            font-size: 16px;
            li {
              margin-left: 20px;
              list-style: none;
              line-height: 60px;
              .link-text {
                cursor: pointer;
                &:hover {
                  color: rgba(250, 250, 250, .9);
                }
              }
            }
          }
        }
      }

      .info-banner {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        .left-part {
          width: 60%;

          .website-info-1, .website-info-2, .website-info-3 {
            font-size: 14px;
            color: rgba(250, 250, 250, .6);
            line-height: 20px;
          }
          .website-info-1 {
            padding-top: 30px;
            height: 20px;
          }
          .website-info-2 {
            padding-top: 15px;
            height: 20px;
          }
          .website-info-3 {
            padding-top: 230px;
            height: 20px;
          }
          .links-container-bottom {
            display: none;
          }
        }

        .right-part {
          width: 365px;
          height: 380px;
          .fast-contact {
            .title-text {
              margin: 30px auto;
              font-size: 18px;
              font-weight: bold;
              line-height: 25px;
            }
            .name-text {
              margin: -10px auto;

            }

            .mail-text {
              margin: 15px auto;
            }
            .name-text, .mail-text {
              display: flex;
              flex-wrap: nowrap;
              .icon {
                background: rgba(20, 20, 20, 1.0);
                width: 40px;
                height: 35px;
                text-align: center;
                color: rgba(240, 240, 240, 0.75);
                font-size: 24px;
                line-height: 35px;
                border-radius: 2px;
                z-index: 100;
                margin-top: 1px;
              }
              input {
                margin-left: -40px;
                width: 360px;
                height: 33px;
                text-indent: 4em;
                color: rgba(250, 250, 250, .8);
                background: rgba(20, 20, 20, 0.8);
                border: 1px solid rgba(20, 20, 20, 1.0);
                border-radius: 2px;
              }

              input::-webkit-input-placeholder {
                text-indent: 4em;
                color: rgba(250, 250, 250, .6);
              }
              input:-moz-placeholder {
                text-indent: 4em;
                color: rgba(250, 250, 250, .6);
              }
              input :-ms-input-placeholder {
                text-indent: 4em;
                color: rgba(250, 250, 250, .6);
              }
            }

            .message-text {
              margin: -8px auto;
              .font-count {
                margin-top: 5px;
                font-size: 12px;
                color: rgba(250, 250, 250, .6);
              }
              textarea {
                width: 355px;
                color: rgba(250, 250, 250, .8);
                background: rgba(20, 20, 20, 0.8);
                border: 1px solid rgba(20, 20, 20, 1.0);
                border-radius: 2px;
              }
              textarea::-webkit-input-placeholder {
                color: rgba(250, 250, 250, .6);
              }
              textarea:-moz-placeholder {
                color: rgba(250, 250, 250, .6);
              }
              textarea :-ms-input-placeholder {
                color: rgba(250, 250, 250, .6);
              }
            }

            .identify {
              display: flex;
              flex-wrap: nowrap;
              margin-top: 15px;
              .title {
                font-size: 14px;
                width: 60px;
                height: 25px;
                line-height: 35px;
              }
              .code-img {
                height: 27px;
                background: rgba(20, 20, 20, 1.0);
                border-radius: 2px;
                border: 1px solid rgba(20, 20, 20, 1.0);
              }
              input {
                text-indent: 0.25em;
                text-align: left;
                margin-left: 10px;
                font-size: 14px;
                width: 187px;
                height: 25px;
                border-radius: 2px;
                border: 1px solid rgba(20, 20, 20, 1.0);
                color: rgba(250, 250, 250, .6);
                background: rgba(20, 20, 20, 0.8);
              }
              input::-webkit-outer-spin-button,
              input::-webkit-inner-spin-button {
                -webkit-appearance: none;
              }
              input[type="number"] {
                -moz-appearance: textfield;
              }
            }

            .confirm-button {
              font-size: 14px;
              margin-top: 15px;
              cursor: pointer;
              color: rgba(250, 250, 250, .8);
              border: 1px solid rgba(20, 20, 20, 1.0);
              border-radius: 2px;
              text-align: center;
              line-height: 30px;
              width: 120px;
              height: 28px;
              background: rgba(150, 45, 45, 1.0);
              transition: all .5s ease;
              -webkit-transition: all .5s ease; /* Safari */
              -moz-transition: all .5s ease;
              -o-transition: all .5s ease;
              &:hover {
                color: rgba(250, 250, 250, 1.0);
                background: rgba(200, 45, 45, 1.0);
              }
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 576px) and (max-width: 1139.98px) {
    .footer-box {
      width: 100%;
      margin: 0 auto;
      color: rgba(250, 250, 250, .7);
      .title-banner {
        margin-left: 20px;
        margin-right: 20px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        border-bottom: 1px solid rgba(200, 200, 200, 0.45);
        .game-name {
          color: rgba(230, 230, 230, .9);
          font-size: 0.5rem;
          font-weight: bold;
          span {
            line-height: 60px;
            cursor: pointer;
          }
        }

        .links-container {
          .links-box {
            display: flex;
            flex-wrap: nowrap;
            font-size: 0.25rem;

            li {
              margin-left: 10px;
              list-style: none;
              line-height: 60px;
              .link-text {
                cursor: pointer;
                &:hover {
                  color: rgba(250, 250, 250, .9);
                }
              }
            }
          }
        }
      }

      .info-banner {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        .left-part {
          width: 50%;
          .website-info-1, .website-info-2, .website-info-3 {
            padding-left: 20px;
            padding-right: 20px;
            font-size: 0.25rem;
            color: rgba(250, 250, 250, .6);
            line-height: 0.4rem;
          }
          .website-info-1 {
            padding-top: 30px;
            height: 20px;
          }
          .website-info-2 {
            padding-top: 15px;
            height: 20px;
          }
          .website-info-3 {
            padding-top: 200px;
            height: 20px;
          }
          .links-container-bottom {
            display: none;
          }
        }

        .right-part {
          width: 50%;
          .fast-contact {
            padding-left: 20px;
            padding-right: 20px;

            .title-text {
              text-align: right;
              margin: 30px auto;
              font-size: 18px;
              font-weight: bold;
              line-height: 25px;
            }
            .name-text {
              margin: -10px auto;
            }

            .mail-text {
              margin: 15px auto;
            }
            .name-text, .mail-text {
              float: right;
              display: flex;
              flex-wrap: nowrap;
              width: 85%;
              .icon {
                background: rgba(20, 20, 20, 1.0);
                width: 40px;
                height: 35px;
                text-align: center;
                color: rgba(240, 240, 240, 0.75);
                font-size: 24px;
                line-height: 35px;
                border-radius: 2px;
                z-index: 100;
                margin-top: 1px;
              }
              input {
                margin-left: -40px;
                width: 100%;
                height: 33px;
                text-indent: 4em;
                color: rgba(250, 250, 250, .8);
                background: rgba(20, 20, 20, 0.8);
                border: 1px solid rgba(20, 20, 20, 1.0);
                border-radius: 2px;
              }

              input::-webkit-input-placeholder {
                text-indent: 4em;
                color: rgba(250, 250, 250, .6);
              }
              input:-moz-placeholder {
                text-indent: 4em;
                color: rgba(250, 250, 250, .6);
              }
              input :-ms-input-placeholder {
                text-indent: 4em;
                color: rgba(250, 250, 250, .6);
              }
            }

            .message-text {
              margin: -8px auto;
              float: right;
              width: 85%;

              .font-count {
                margin-top: 5px;
                font-size: 12px;
                color: rgba(250, 250, 250, .6);
              }
              textarea {
                width: 98%;
                color: rgba(250, 250, 250, .8);
                background: rgba(20, 20, 20, 0.8);
                border: 1px solid rgba(20, 20, 20, 1.0);
                border-radius: 2px;
              }
              textarea::-webkit-input-placeholder {
                color: rgba(250, 250, 250, .6);
              }
              textarea:-moz-placeholder {
                color: rgba(250, 250, 250, .6);
              }
              textarea :-ms-input-placeholder {
                color: rgba(250, 250, 250, .6);
              }
            }

            .identify {
              width: 85%;
              float: right;
              display: flex;
              flex-wrap: nowrap;
              margin-top: 15px;
              .title {
                font-size: 0.2rem;
                width: 70px;
                height: 25px;
                line-height: 35px;
              }
              .code-img {
                height: 27px;
                background: rgba(20, 20, 20, 1.0);
                border-radius: 2px;
                border: 1px solid rgba(20, 20, 20, 1.0);
              }
              input {
                width: 60%;
                text-indent: 0.25em;
                text-align: left;
                margin-left: 10px;
                font-size: 14px;
                height: 25px;
                border-radius: 2px;
                border: 1px solid rgba(20, 20, 20, 1.0);
                color: rgba(250, 250, 250, .6);
                background: rgba(20, 20, 20, 0.8);
              }
              input::-webkit-outer-spin-button,
              input::-webkit-inner-spin-button {
                -webkit-appearance: none;
              }
              input[type="number"] {
                -moz-appearance: textfield;
              }
            }

            .confirm-button {
              float: right;
              font-size: 14px;
              margin-top: 15px;
              cursor: pointer;
              color: rgba(250, 250, 250, .8);
              border: 1px solid rgba(20, 20, 20, 1.0);
              border-radius: 2px;
              text-align: center;
              line-height: 30px;
              width: 120px;
              height: 28px;
              background: rgba(150, 45, 45, 1.0);
              transition: all .5s ease;
              -webkit-transition: all .5s ease; /* Safari */
              -moz-transition: all .5s ease;
              -o-transition: all .5s ease;
              &:hover {
                color: rgba(250, 250, 250, 1.0);
                background: rgba(200, 45, 45, 1.0);
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 575.98px) {
    .footer-box {
      width: 100%;
      margin: 0 auto;
      color: rgba(250, 250, 250, .7);
      .title-banner {
        margin-left: 20px;
        margin-right: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .game-name {
          color: rgba(230, 230, 230, .9);
          font-size: 24px;
          font-weight: bold;
          width: 100%;
          border-bottom: 1px solid rgba(200, 200, 200, 0.2);
          span {
            line-height: 60px;
            cursor: pointer;
          }
        }
        .links-container {
          display: none;
        }
      }

      .info-banner {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .left-part {
          width: 100%;
          padding-top: 10px;
          margin-left: 20px;
          margin-right: 20px;
          .website-info-1, .website-info-2, .website-info-3 {
            font-size: 12px;
            color: rgba(250, 250, 250, .6);
            line-height: 20px;
          }
          .website-info-1 {
          }
          .website-info-2 {
            padding-top: 10px;
          }
          .website-info-3 {
            padding-top: 10px;
          }
          .links-container-bottom {
            width: 100%;
            border-top:1px solid rgba(200, 200, 200, 0.2) ;
            border-bottom: 1px solid rgba(200, 200, 200, 0.2);
            margin-top: 10px;

            .links-box {
              display: flex;
              flex-wrap: nowrap;
              justify-content: space-between;
              font-size: 14px;
              margin-left: -10px;
              li {
                margin-left: 10px;
                list-style: none;
                line-height: 40px;
                .link-text {
                  cursor: pointer;
                  &:hover {
                    color: rgba(250, 250, 250, .9);
                  }
                }
              }
            }
          }
        }

        .right-part {
          width: 100%;
          .fast-contact {
            padding-left: 20px;
            padding-right: 20px;
            .title-text {
              text-align: left;
              margin: 10px auto;
              font-size: 16px;
              font-weight: bold;
              line-height: 40px;
            }
            .name-text {
              margin: -10px auto;
            }

            .mail-text {
              margin: 15px auto;
            }
            .name-text, .mail-text {

              display: flex;
              flex-wrap: nowrap;
              width: 100%;
              .icon {
                background: rgba(20, 20, 20, 1.0);
                width: 40px;
                height: 35px;
                text-align: center;
                color: rgba(240, 240, 240, 0.75);
                font-size: 24px;
                line-height: 35px;
                border-radius: 2px;
                z-index: 100;
                margin-top: 1px;
              }
              input {
                margin-left: -40px;
                width: 100%;
                height: 33px;
                text-indent: 4em;
                color: rgba(250, 250, 250, .8);
                background: rgba(20, 20, 20, 0.8);
                border: 1px solid rgba(20, 20, 20, 1.0);
                border-radius: 2px;
              }

              input::-webkit-input-placeholder {
                text-indent: 4em;
                color: rgba(250, 250, 250, .6);
              }
              input:-moz-placeholder {
                text-indent: 4em;
                color: rgba(250, 250, 250, .6);
              }
              input :-ms-input-placeholder {
                text-indent: 4em;
                color: rgba(250, 250, 250, .6);
              }
            }

            .message-text {
              margin: -8px auto;
              float: right;
              width: 100%;

              .font-count {
                margin-top: 5px;
                font-size: 12px;
                color: rgba(250, 250, 250, .6);
              }
              textarea {
                width: 98.2%;
                height: 40px;
                color: rgba(250, 250, 250, .8);
                background: rgba(20, 20, 20, 0.8);
                border: 1px solid rgba(20, 20, 20, 1.0);
                border-radius: 2px;
              }
              textarea::-webkit-input-placeholder {
                color: rgba(250, 250, 250, .6);
              }
              textarea:-moz-placeholder {
                color: rgba(250, 250, 250, .6);
              }
              textarea :-ms-input-placeholder {
                color: rgba(250, 250, 250, .6);
              }
            }

            .identify {
              width: 100%;
              float: right;
              display: flex;
              flex-wrap: wrap;
              margin-top: 15px;
              .title {
                font-size: 16px;
                width: 70px;
                height: 25px;
                line-height: 35px;
              }
              .code-img {
                height: 27px;
                background: rgba(20, 20, 20, 1.0);
                border-radius: 2px;
                border: 1px solid rgba(20, 20, 20, 1.0);
              }
              input {
                margin-top: 15px;
                width: 100%;
                text-indent: 0.25em;
                text-align: left;
                font-size: 14px;
                height: 25px;
                border-radius: 2px;
                border: 1px solid rgba(20, 20, 20, 1.0);
                color: rgba(250, 250, 250, .6);
                background: rgba(20, 20, 20, 0.8);
              }
              input::-webkit-outer-spin-button,
              input::-webkit-inner-spin-button {
                -webkit-appearance: none;
              }
              input[type="number"] {
                -moz-appearance: textfield;
              }
            }

            .confirm-button {
              float: right;
              font-size: 14px;
              margin-top: 15px;
              cursor: pointer;
              color: rgba(250, 250, 250, .8);
              border: 1px solid rgba(20, 20, 20, 1.0);
              border-radius: 2px;
              text-align: center;
              line-height: 30px;
              width: 120px;
              height: 28px;
              background: rgba(150, 45, 45, 1.0);
              transition: all .5s ease;
              -webkit-transition: all .5s ease; /* Safari */
              -moz-transition: all .5s ease;
              -o-transition: all .5s ease;
              &:hover {
                color: rgba(250, 250, 250, 1.0);
                background: rgba(200, 45, 45, 1.0);
              }
            }
          }
        }
      }
    }
  }
</style>

//修改子组件样式
<style lang="scss">
  .game-name * {
    font-family: 'Ipix';
  }
</style>
