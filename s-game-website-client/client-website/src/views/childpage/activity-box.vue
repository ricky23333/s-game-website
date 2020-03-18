<template>
  <section v-if="showActivityFlag">
    <v-lunar-new-year v-if="activityType===1" @close="handleClose"/>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import VLunarNewYear from '../../components/activity-box/lunar-newyear';

  export default {
    name: "activity-box",
    components: {
      VLunarNewYear,
    },
    data() {
      return {}
    },
    props: {
      activityType: {
        required: true,
      },
    },
    created() {

    },
    computed: {
      ...mapState({
        showActivityFlag: state => state.user.showActivityFlag,
      }),
    },
    methods: {
      handleClose() {
        this.$store.state.user.showActivityFlag = false;
      },
    }
  }
</script>

<style scoped>

</style>
