<template>
  <section class="main" >
    <div class="container" >
      <div class="content-box">
        <stuff-list/>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex';
  import StuffList from '../../components/stuff-list';

  export default {
    components: {
      StuffList
    },

    data() {
      return {
      }
    },

    created() {

    },

    mounted() {
    },

    watch: {
    },

    computed: {

    },

    methods: {
      ...mapActions({}),
    },
  }
</script>

<style lang="scss" scoped>
  .main {
    position: relative;
    margin: 0px auto;
    height: 100%;
    .container {
      position: relative;
      .content-box {
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
      }
    }
  }

</style>

<style lang="scss">
  .el-menu {
    width: 250px;
  }

</style>
