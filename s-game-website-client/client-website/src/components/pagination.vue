<template>
  <el-pagination
    background
    :layout="layouts"
    :page-count="paginationDate.total_page_count"
    :current-page="paginationDate.current_page_index"
    :page-size="paginationDate.per_page_count"
    :total="paginationDate.total"
    @current-change="changePage">
  </el-pagination>
</template>

<script>
  export default {
    name: "pagination",
    props: {
      // 存储导航栏名称以及对应路由
      paginationDate: {
        type: Object,
        required: true,
      },
      layouts: {
        type: String,
        required: true,
      }
    },

    methods: {
      changePage(page) {
        this.$emit('changePage', page);
      },
    }
  }
</script>

<style lang="scss">




</style>
