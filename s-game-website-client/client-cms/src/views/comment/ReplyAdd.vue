<template>
    <div class="container">
        <div class="title">新建回复</div>
        <div class="wrap">
            <reply-editor ref="replyEditor" v-if="form"
                          :replyDate="form"
                          @submitOnClick="submitReplyDate"
                          @resetOnClick="resetReplyDate"/>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapMutations} from 'vuex'
    import comment from '@/models/comment';
    import ReplyEditor from './ReplyEdit';

    export default {
        components: {
            ReplyEditor,
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
                    parent_comment_id: 0,
                    reply_user_name: '',
                    likecount: 0,
                    hatecount: 0,
                    reportcount: 0,
                    cover_text: false,
                },
            }
        },

        computed: {},

        methods: {
            async submitReplyDate() {
                try {
                    let subForm = {...this.form}
                    const res = await comment.addReply(subForm);
                    if (res.error_code === 0) {
                        this.$message.success(`${res.msg}`)
                        this.resetReplyDate()
                    }
                } catch (error) {
                    if (error && error.data && error.data.error_code !== 0 && error.data.msg) {
                        this.$message.error(error.data.msg[0]);
                    }
                }
            },
            // 重置表单
            resetReplyDate() {
                this.form = {
                    nickname: '',
                    email: '',
                    head_icon_id: 0,
                    content: '',
                    parent_comment_id: 0,
                    reply_user_name: '',
                    likecount: 0,
                    hatecount: 0,
                    reportcount: 0,
                    cover_text: false,
                };
                this.$nextTick(function () {
                    this.$refs.replyEditor.resetUI();
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
