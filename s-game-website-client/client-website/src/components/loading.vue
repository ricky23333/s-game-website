<template>
  <section class="loading-container">
    <transition name="fade" mode="out-in">
      <div class="loading-wrap" v-if="isLoading">
        <div class="loading-box">
          <img src="static/images/homepage/spinner.svg">
        </div>
        <div class="loading-text">{{loadingText}}</div>
      </div>
    </transition>
  </section>
</template>

<script>
  import {mapGetters, mapState} from 'vuex';
  export default {
    name: "loading",
    // props: ['text'],
    data() {
      return {}
    },
    computed: {
      ...mapGetters('loading', [
        'isLoading',
        'loadingText'
      ]),
    },
    mounted() {
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .loading-container {
    .loading-wrap {
      position: fixed;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.85);
      color: rgba(250, 250, 250, 0.95);
      padding-top: 300px;
      .loading-box {
        width: 100%;
        height: 100px;
        display: flex;
        text-align: center;
        align-items: center;
        img {
          margin: 0px auto;
          width: 40px;
          height: 40px;
          -webkit-animation: loader 1s linear infinite; /*Safari and Chrome*/
          animation: loader 1s linear infinite; /*IE9以上支持*/
          -o-animation: loader 1s linear infinite;
          -moz-animation: loader 1s linear infinite;
        }
      }

      .loading-text {
        width: 100%;
        text-align: center;
        align-items: center;
        font-size: 18px;
      }
    }
  }

  /*loading转圈动画*/
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
    transition: all .6s ease;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
