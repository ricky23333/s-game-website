<template>
  <div class="comment-list-container">
    <div class="comment-list-wrap">
      <div class="title-text">共{{commentListDate?commentListDate.length:0}}条评论</div>
      <div class="comment-box" v-if="commentListDate&&commentListDate.length>0">
        <div class="comment-item" v-for="(bigItem,bigIndex) in  commentListDate" :key="bigIndex">
          <comment-banner :comment-date="bigItem" :comment-type="0"/>
          <div class="reply-box">
            <li class="reply-item" v-for="(item,index) in  bigItem.reply_list" :key="index">
              <comment-banner :comment-date="item" :comment-type="1"/>
            </li>
          </div>
        </div>
      </div>
      <div class="no-comment-box" v-else>暂无评论</div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import CommentBanner from '../components/comment-banner';

  export default {
    components: {
      CommentBanner,
    },

    props: {
      commentListDate: {
        required: true,
      },
    },
    methods: {
      ... mapActions({}),
    },
  }
</script>

<style lang="scss" scoped>
  @media screen and (min-width: 1140px) {
    .comment-list-container {
      width: 100%;
      .comment-list-wrap {
        width: 75%;
        margin: 20px auto;
        .title-text {
          font-size: 22px;
          font-weight: bold;
          color: rgba(20, 20, 20, 0.85);
          height: 50px;
          border-bottom: 1px solid rgba(20, 20, 20, 0.15);
        }
        .comment-box {
          width: 100%;
          list-style: none;
          margin: 20px auto;
          .comment-item {
            width: 100%;
            .reply-box {
              list-style: none;
              margin-left: 60px;
            }
          }
        }
        .no-comment-box {
          padding-top: 50px;
          padding-bottom: 40px;
          text-align: center;
          font-size: 24px;
          font-weight: bold;
        }
      }
    }
  }

  @media screen and (max-width: 1139.8px) {
    .comment-list-container {
      width: 100%;
      .comment-list-wrap {
        width: 100%;
        margin: 20px auto;
        .title-text {
          font-size: 18px;
          font-weight: bold;
          color: rgba(20, 20, 20, 0.85);
          height: 40px;
          border-bottom: 1px solid rgba(20, 20, 20, 0.15);
        }
        .comment-box {
          width: 100%;
          list-style: none;
          margin: 10px auto;
          .comment-item {
            width: 100%;
            .reply-box {
              list-style: none;
              margin-left: 60px;
            }
          }
        }
        .no-comment-box {
          padding-top: 50px;
          padding-bottom: 40px;
          text-align: center;
          font-size: 24px;
          font-weight: bold;
        }
      }
    }
  }
</style>
