<template>
  <section class="container">
    <transition name="fade" mode="out-in">
      <section class="wrap" v-if="showContactUsMessageFlag">
        <div class="box">
          <i @click.stop="handleClose" class="icon el-icon-close"></i>
          <div class="first-line">联系我们/CONTACT US</div>
          <ul class="text-box">
            <li class="text-item" v-for="(item,index) in  contactTextConfig" :key="index">
              <span class="left">{{item.title}}</span>
              <span class="right">{{item.content}}</span>
            </li>
          </ul>
          <div @click.stop="handleConfirm" class="confirm-btn">确认</div>
        </div>
      </section>
    </transition>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "message-box-contact",

    data() {
      return {
        contactTextConfig: [
          {
            title: 'QQ',
            content: '526046576',
          },
          {
            title: '邮箱',
            content: '526046576@qq.com',
          },
        ],
      }
    },

    created() {

    },

    mounted() {

    },

    watch: {},

    computed: {
      ...mapState({
        showContactUsMessageFlag: state => state.user.showContactUsMessageFlag,
      }),
    },

    methods: {
      ...
        mapActions({
          hideContactUsMessageBox: 'user/hideContactUsMessageBox',
        }),

      async handleConfirm() {
        this.handleClose();
      },

      handleClose() {
        this.hideContactUsMessageBox();
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
          margin: 12.8% auto;
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
            padding-top: 10px;
            line-height: 25px;
            width: 100%;
            font-size: 22px;
            font-weight: bold;
            height: 25px;
          }
          .text-box {
            position: relative;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-top: -0px;
            margin-left: -30px;
            list-style: none;
            font-size: 16px;

            padding-right: 25px;
            .text-item {
              width: 100%;
              height: 50px;
              background: rgba(220, 220, 220, 1.0);
              display: flex;
              flex-wrap: nowrap;
              justify-content: space-between;
              border-radius: 3px;
              span {
                width: 50%;
                font-size: 16px;
                line-height: 50px;
              }

              .left {
                padding-left: 10px;
                text-align: left;
                font-weight: bold;
              }
              .right {
                padding-right: 10px;
                text-align: right;
              }
            }
          }

          .confirm-btn {
            position: relative;
            cursor: pointer;
            text-align: center;
            margin-left: 240px;
            margin-top: 0px;
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
            padding-top: 10px;
            line-height: 25px;
            width: 100%;
            font-size: 22px;
            font-weight: bold;
            height: 25px;
          }
          .text-box {
            position: relative;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-top: -0px;
            margin-left: -30px;
            list-style: none;
            font-size: 16px;
            padding-right: 10px;

            .text-item {
              width: 100%;
              height: 50px;
              background: rgba(220, 220, 220, 1.0);
              display: flex;
              flex-wrap: nowrap;
              justify-content: space-between;
              border-radius: 3px;
              span {
                width: 50%;
                font-size: 16px;
                line-height: 50px;
              }

              .left {
                padding-left: 10px;
                text-align: left;
                font-weight: bold;
              }
              .right {
                padding-right: 20px;
                text-align: right;
              }
            }
          }

          .confirm-btn {
            position: relative;
            cursor: pointer;
            text-align: center;
            margin: 0px auto;
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
