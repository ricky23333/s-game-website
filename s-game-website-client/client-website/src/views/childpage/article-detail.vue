<template>
  <div class="article-detail-container">
    <div class="article-detail-wrap">
      <div class="text-container">
        <article-detail-content :articleDetail="articleDetail"/>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import merge from 'webpack-merge';
  import ArticleDetailContent from '../../components/article-detail-content';

  export default {
    name: "article-detail",

    components: {
      ArticleDetailContent
    },

    data() {
      return {
        // 文章ID
        id: this.$route.params.id,
        articleDetail: null,
        selectArticleIndex: 0,
      }
    },

    watch: {
      updateAllCommentFlag: function () {
        if (this.updateAllCommentFlag) {
          this.getCommentListDate();
        }
      }
    },

    created() {
      this.setArticleType();
      if (!this.id) {
        this.getSpecialArticle();
      } else {
        this.getArticle();
      }
    },

    computed: {
      ...mapState({
        articleDetailDate: state => state.article.articleDetail,
        updateAllCommentFlag: state => state.comment.updateAllCommentFlag,
      }),
    },

    methods: {
      ...mapActions({
        getArticleDetail: 'article/getArticleDetail',
        getCommentList: 'comment/getCommentList',

      }),

      setArticleType() {
        this.$router.replace({
          query: merge(this.$route.query, {
            main_type: this.$route.path.split('/')[1],
          })
        });
      },

      /**
       * 获取文章详情
       * @returns 文章详情
       */
      async getArticle() {
        let res = await this.getArticleDetail({
          id: this.id,
        });

        if (this.articleDetailDate) {
          this.articleDetail = this.articleDetailDate;
          document.title = this.articleDetail.title;
        }
      },

      async getCommentListDate() {
        let res = await this.getCommentList({
          id: this.id,
        });
        if (res && res.status === 200) {
          if (this.articleDetail) {
            this.articleDetail.comment_date = res.data;
          }
        }
      },

      //不通过id，获取关于/隐私政策/用户条款 文章内容
      async getSpecialArticle() {
        if(this.$route.matched[0].name === "关于"||this.$route.matched[0].name === "隐私政策"||this.$route.matched[0].name === "用户协议"){
          let res = await this.getArticleDetail({
            main_type: this.$route.query.main_type,
          });
          if (this.articleDetailDate) {
            this.articleDetail = this.articleDetailDate;
            document.title = this.articleDetail.title;
          }
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .article-detail-container {
    display: flex;
    margin: 0px auto;
    overflow: hidden;
    .article-detail-wrap {
      width: 100%;
      margin-top: 0px;
      margin-left: 0px;

      .text-container {

      }
    }
  }
</style>


