//服务启动时主组件，页面入口文件 ，所有页面都是在App.vue下进行切换
<template>
  <div id="app" class="app" :key="refreshPageFlag">
    <div id="app-box" :style="{
	            'transformOrigin':'center top',
	            'transform':`scale(${scaleNum/100},${scaleNum/100})`,
	            '-webkit-transform':`scale(${scaleNum/100}, ${scaleNum/100})`,
	            '-moz-transform':`scale(${scaleNum/100},${scaleNum/100})`,
	            '-o-transform':`scale(${scaleNum/100},${scaleNum/100})`,
	            '-ms-transform':`scale(${scaleNum/100},${scaleNum/100})`
	        }">
      <router-view :key="currentMainRouter" class="router-views"/>
      <main-bg/>
      <main-footer/>
    </div>
    <main-header/>
    <v-loading/>
    <help-tools/>
    <slide-nav/>
    <MessageReportBox/>
    <MessageContactUsBox/>
    <MessageAudioBox/>
  </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex';
  import MainHeader from './components/main-header';
  import VLoading from './components/loading';
  import MainFooter from './components/main-footer';
  import SlideNav from './components/slide-nav-banner';
  import HelpTools from './components/help-tools';
  import MainBg from './components/main-background';
  import MessageReportBox from './components/message-box-report'
  import MessageContactUsBox from './components/message-box-contact'
  import MessageAudioBox from './components/message-box-audio'

  export default {
    name: 'App',

    components: {
      MainHeader,
      VLoading,
      MainFooter,
      SlideNav,
      HelpTools,
      MainBg,
      MessageReportBox,
      MessageContactUsBox,
      MessageAudioBox,
    },

    data() {
      return {}
    },

    computed: {
      ...mapGetters('loading', [
        'isLoading',
        'loadingText'
      ]),

      ...mapState({
        scaleNum: state => state.helpTools.scaleNum,
        refreshPageFlag: state => state.helpTools.refreshPageFlag,
        guestDate: state => state.user.guestDate,
      }),

      currentMainRouter() {
        return this.$route.path.split('/')[1];
      },
    },

    methods: {},

    created() {
    },
  }
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    background: #f8f8f8;
  }

  ul {
    list-style: none;
  }

  .app * {
    font-family: Open Sans, Helvetica Neue, Arial, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
  }

  /*引入element-icon*/
  #app [class*=" el-icon-"], #app [class^=el-icon-] {
    font-family: element-icons !important
  }

  /*开启字体抗锯齿效果*/
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
  }

  #app img[lazy=loading] {
    -webkit-animation: loader 1s linear infinite; /*Safari and Chrome*/
    animation: loader 1s linear infinite; /*IE9以上支持*/
    position: relative;
    margin: 12% auto;
    width: 15%;
    height: 15%;
  }

  #app img[lazy=error] {
    position: relative;
    margin: 12% auto;
    width: 30%;
    height: 30%;
  }

  #app div[lazy=loading] {
    background: no-repeat;
    position: relative;
    margin: 15% auto;
    width: 100px;
    height: 100px;
  }

  #app div[lazy=error] {
    background: no-repeat;
    position: relative;
    margin: 15% auto;
    width: 200px;
    height: 200px;
  }

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
