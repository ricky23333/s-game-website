<template>
  <section class="container">
    <div :class="expandSearchInputFlag?'search-wrap-active':'search-wrap'">
      <div class="search-box">
        <i class="el-icon-search" @click.stop="handleClickButton"></i>
        <div class="search-input">
          <input
            ref="searchDiv"
            placeholder="请输入搜索内容"
            maxlength="16"
            @keyup.enter="handleSearch(keyword)"
            v-model="keyword"
            id="searchBox"
          />
        </div>
      </div>

      <div class="search-history-container" v-if="searchHistory">
        <ul class="search-history-box"
            v-if="searchHistory.length > 0">
          <li class="history-text" v-for="(item, index) in searchHistory" :key="index"
              @click="handleSearch(item)">{{item}}
          </li>
          <li class="history-text"
              @click="handleClearSearch">清空历史
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "search",
    data() {
      return {
        keyword: '',
        expandSearchInputFlag: false,
      }
    },

    computed: {
      ...mapState({
        searchHistory: state => state.user.searchHistory,
      }),
    },

    mounted() {
      document.addEventListener('click', this.handleClickPublic);
      this.getSearchHistoryDate();
    },

    destroyed() {
      document.removeEventListener('click', this.handleClickPublic);
    },

    methods: {
      ...mapActions({
        getSearchHistoryDate: 'user/getSearchHistoryDate',
        clearSearchHistoryDate: 'user/clearSearchHistoryDate',
      }),

      handleClickButton() {
        if (this.expandSearchInputFlag) {
          if (this.keyword && this.keyword !== '') {
            this.handleSearch(this.keyword);
          }
          else {
            this.expandSearchInputFlag = false;
          }
        } else {
          this.expandSearchInputFlag = true;
          this.$refs.searchDiv.focus();
        }
      },

      async handleClearSearch() {
        await this.clearSearchHistoryDate();
        await this.getSearchHistoryDate();
      },

      async handleSearch(tempKeyword) {
        this.$emit('clickOnSearch', tempKeyword);
      },

      handleClickPublic(e) {
        const that = this;
        // 判断被点击的元素是不是aaa元素，不是的话，就隐藏之
        if (e.target.id !== 'searchBox') {
          that.expandSearchInputFlag = false;
        }
        if (e && e.stopPropagation) {
          //因此它支持W3C的stopPropagation()方法
          e.stopPropagation();
        } else {
          //否则，我们需要使用IE的方式来取消事件冒泡
          window.event.cancelBubble = true;
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .container {
    color: rgba(250, 250, 250, .75);
    position: relative;
    margin-right: 0px;

    .search-wrap, .search-wrap-active {
      position: absolute;
      transition: all 0.5s ease;
      -webkit-transition: all 0.5s ease; /* Safari */
      -moz-transition: all 0.5s ease;
      -o-transition: all 0.5s ease;
      cursor: pointer;
      display: flex;
      flex-wrap: wrap;
      .search-box {
        display: flex;
        flex-wrap: nowrap;
        i {
          transition: all 0.5s ease;
          -webkit-transition: all 0.5s ease; /* Safari */
          -moz-transition: all 0.5s ease;
          -o-transition: all 0.5s ease;
          &:hover {
            color: rgba(250, 250, 250, .9);
          }
        }

        .search-input {
          margin-top: -3px;
          height: 30px;
          overflow: hidden;
          display: flex;
          flex-wrap: nowrap;
          input {
            width: 100px;
            margin-left: 5px;
            outline-style: none;
            border: 0;
            color: rgba(250, 250, 250, .8);
            background-color: rgba(0, 0, 0, 0);
          }
        }
      }

      .search-history-container {
        overflow: hidden;
        transition: all 0.5s ease;
        -webkit-transition: all 0.5s ease; /* Safari */
        -moz-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
        font-size: 12px;
        margin-left: 25px;
        margin-top: -15px;

        .search-history-box {
          padding-top: 5px;
          padding-bottom: 10px;
          background: rgba(20, 20, 20, 0.95);
          border-radius: 1px;
          text-align: left;
          .history-text {
            margin-left: -30px;
            padding-top: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            &:hover {
              color: rgba(250, 250, 250, .9);
            }
          }
        }
      }
    }

  }

  .search-wrap {
    width: 22px;
    right: 0px;
    .search-box {
      .search-input {
        width: 0px;
      }
    }

    .search-history-container {
      height: 0px;
    }
  }

  .search-wrap-active {
    width: 127px;
    right: 0px;
    .search-box {
      .search-input {
        width: 105px;
      }
    }

    .search-history-container {
      width: 100px;
      height: 100%;
    }
  }

  @media screen and (max-width: 575.98px) {

  }
</style>
