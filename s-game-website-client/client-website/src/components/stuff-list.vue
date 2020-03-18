<template>
  <div class="stuff-list-container">
    <div class="stuff-list-wrap">
      <article-list-content :pagination="pagination" :article-list="articleList"
                            :hot-article-list="hotArticleList" @changePage="changePage"
                            @toPath="toPath"/>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import merge from 'webpack-merge';
  import ArticleListContent from './article-list-content';

  export default {
    components: {
      ArticleListContent,
    },

    data() {
      return {
        navIndex: 0,
      }
    },

    computed: {
      ...mapState({
        articleList: state => state.article.articleList,
        hotArticleList: state => state.article.hotArticleList,
        pagination: state => state.article.pagination,
      }),
      perPageCount: {
        get() {
          return this.$route.query.main_type === 'article' ? 6 : 9
        },
      }
    },


    watch: {
      '$route'(to, from) {
        this.setArticleType();
      }
    },

    created() {
      this.setArticleType();
      // 获取文章
      this.getArticleList();
      this.getHotArticleList();
    },

    methods: {
      ...mapActions({
        getArticleListDate: 'article/getArticleList',
        getHotArticleListDate: 'article/getHotArticleList',
      }),

      async setArticleType() {
        this.$router.replace({
          query: merge(this.$route.query, {
            main_type: this.$route.path.split('/')[1],
            child_type: this.$route.path.split('/')[2],
          })
        });
      },
      /**
       * 获取文章
       */
      async getArticleList() {
        const {page, desc, main_type, child_type, keyword} = this.$route.query;
        await this.getArticleListDate({
          page,
          perPageCount: this.perPageCount,
          desc,
          main_type,
          child_type,
          keyword,
        });
      },

      async getHotArticleList() {
        const {main_type, child_type} = this.$route.query;
        await this.getHotArticleListDate({
          main_type,
          child_type,
        });
      },

      /**
       * 切换页码
       */
      async changePage(page) {
        this.$router.replace({
          query: merge(this.$route.query, {
            page
          })
        });
        this.getArticleList();
      },

      /**
       * 切换文章排序方式
       */
      async changeArticleDesc(desc, index) {
        this.$router.replace({
          query: merge(this.$route.query, {
            desc
          })
        });
        this.navIndex = index;
        this.getArticleList();
      },

      // async downloadArticle(id) {
      //   await this.getArticleDetail(id);
      //   if (this.articleDetail) {
      //     let tempDate;
      //     if (this.articleDetail.length) {
      //       tempDate = this.articleDetail[0].content.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ').replace(/>/g, ' ').replace(/&nbsp;/g, ' ');
      //     } else {
      //       tempDate = this.articleDetail.content.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ').replace(/>/g, ' ').replace(/&nbsp;/g, ' ');
      //     }
      //
      //     //定义文件内容，类型必须为Blob 否则createObjectURL会报错
      //     let content = new Blob([JSON.stringify(tempDate)]);
      //     //生成url对象
      //     let urlObject = window.URL || window.webkitURL || window;
      //     let url = urlObject.createObjectURL(content);
      //     //生成<a></a>DOM元素
      //     let el = document.createElement('a');
      //     //链接赋值
      //     el.href = url;
      //     el.download = this.articleDetail.title + ".txt";
      //     //必须点击否则不会下载
      //     el.click();
      //     //移除链接释放资源
      //     urlObject.revokeObjectURL(url);
      //   }
      // },

      /**
       * 路由跳转
       */
      toPath(id) {
        this.$router.push(this.$route.path + '/' + id);
      },

      switchVideoListRoute(routePath) {
        this.$router.push(routePath);
      },
    }
  }
</script>

<style lang="scss" scoped>
  .stuff-list-container {
    width: 100%;
display: block;
    .stuff-list-wrap {
      width: 100%;
      display: block;
    }
  }
</style>


