<template>
    <div class="container">
        <div class="title">新建评论</div>
        <div class="wrap">
            <comment-editor ref="commentEditor" v-if="form"
                            :commentDate="form"
                            @submitOnClick="submitCommentDate"
                            @resetOnClick="resetCommentDate"/>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapMutations} from 'vuex'
    import comment from '@/models/comment';
    import CommentEditor from './CommentEdit';

    export default {
        components: {
            CommentEditor,
        },

        created() {

        },
        data() {
            return {
                form: {
                    nickname: '',
                    email: '',
                    head_icon_id: 0,
                    content: '',
                    article_id: 0,
                    likecount: 0,
                    hatecount: 0,
                    reportcount: 0,
                    cover_text: false,
                },
            }
        },

        computed: {},

        methods: {
            async submitCommentDate() {
                try {
                    let subForm = {...this.form}
                    const res = await comment.addComment(subForm);
                    if (res.error_code === 0) {
                        this.$message.success(`${res.msg}`)
                        this.resetCommentDate()
                    }
                } catch (error) {
                    if (error && error.data && error.data.error_code !== 0 && error.data.msg) {
                        this.$message.error(error.data.msg[0]);
                    }
                }
            },
            // 重置表单
            resetCommentDate() {
                this.form = {
                    nickname: '',
                    email: '',
                    head_icon_id: 0,
                    content: '',
                    article_id: 0,
                    likecount: 0,
                    hatecount: 0,
                    reportcount: 0,
                    cover_text: false,
                };
                this.$nextTick(function () {
                    this.$refs.commentEditor.resetUI();
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    .container {
        .title {
            height: 59px;
            line-height: 59px;
            color: $parent-title-color;
            font-size: 16px;
            font-weight: 500;
            text-indent: 40px;
            border-bottom: 1px solid #dae1ec;
        }

        .wrap {
            padding: 20px;
        }

        .submit {
            float: left;
        }
    }
</style>
