<template>
    <div class="container">
        <div class="wrap">
            <el-row>
                <el-col :lg="16" :md="20" :sm="24" :xs="24">
                    <el-form :model="replyDate" status-icon ref="replyDate" label-width="100px"
                             @submit.native.prevent>

                        <el-form-item id="reply-first-container">
                            <el-tooltip class="item" effect="dark" content="当前回复用户昵称，必选项" placement="top">
                                <Span>回复用户昵称</Span>
                            </el-tooltip>
                            <el-input size="medium" v-model="replyDate.nickname"></el-input>

                            <el-tooltip class="item" effect="dark" content="当前回复用户邮箱，必选项" placement="top">
                                <Span>回复用户邮箱</Span>
                            </el-tooltip>
                            <el-input size="medium" type="email" v-model="replyDate.email"></el-input>
                        </el-form-item>

                        <el-form-item id="reply-second-container">
                            <el-tooltip class="item" effect="dark" content="当前回复用户头像索引ID" placement="top">
                                <Span>回复用户头像索引</Span>
                            </el-tooltip>
                            <el-input size="medium" type="number" v-model="replyDate.head_icon_id"></el-input>

                            <el-tooltip class="item" effect="dark" content="当前回复所属评论ID，必选项" placement="top">
                                <Span>回复评论ID</Span>
                            </el-tooltip>
                            <el-input size="medium" type="number" v-model="replyDate.parent_comment_id"></el-input>

                            <el-tooltip class="item" effect="dark" content="当前回复所属评论的用户昵称，必选项" placement="top">
                                <Span>回复评论昵称</Span>
                            </el-tooltip>
                            <el-input size="medium"  v-model="replyDate.reply_user_name"></el-input>
                        </el-form-item>

                        <el-form-item id="reply-third-container">
                            <el-tooltip class="item" effect="dark" content="当前回复赞数" placement="top">
                                <Span>回复赞数</Span>
                            </el-tooltip>
                            <el-input size="medium" type="number" v-model="replyDate.likecount"></el-input>

                            <el-tooltip class="item" effect="dark" content="当前回复踩数" placement="top">
                                <Span>回复踩数</Span>
                            </el-tooltip>
                            <el-input size="medium" type="number" v-model="replyDate.hatecount"></el-input>

                            <el-tooltip class="item" effect="dark" content="当前回复举报数" placement="top">
                                <Span>回复举报数</Span>
                            </el-tooltip>
                            <el-input size="medium" type="number" v-model="replyDate.reportcount"></el-input>

                            <el-tooltip class="item" effect="dark" content="当前回复若被屏蔽，在前端显示为..." placement="top">
                                <Span>屏蔽回复</Span>
                            </el-tooltip>
                            <el-checkbox v-model="replyDate.cover_text"/>
                        </el-form-item>

                        <el-form-item id="reply-fourth-container">
                            <el-tooltip class="item" effect="dark" content="当前回复文字内容"
                                        placement="top">
                                <Span>回复内容</Span>
                            </el-tooltip>
                            <el-input
                                    size="medium"
                                    type="textarea"
                                    :autosize="{ minRows: 1, maxRows: 8 }"
                                    maxlength="300"
                                    placeholder="请填写回复"
                                    v-model="replyDate.content">
                            </el-input>
                        </el-form-item>

                        <el-form-item class="submit">
                            <el-popover
                                    placement="top"
                                    width="160"
                                    v-model="submitVisible">
                                <p>确定保存到服务器吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="submitVisible = false">取消</el-button>
                                    <el-button type="primary" size="mini" @click="submitVisible = false;submitForm()">确定
                                    </el-button>
                                </div>
                                <el-button id="submitBtn" slot="reference">保 存</el-button>
                            </el-popover>

                            <el-popover
                                    placement="top"
                                    width="160"
                                    v-model="resetVisible">
                                <p>确定重置已编辑内容吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="resetVisible = false">取消</el-button>
                                    <el-button type="primary" size="mini" @click="resetVisible = false;resetForm()">确定
                                    </el-button>
                                </div>
                                <el-button id="resetBtn" slot="reference">重 置</el-button>
                            </el-popover>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import Tinymce from '@/components/base/tinymce'

    export default {
        components: {
            Tinymce
        },
        created() {
        },

        mounted() {

        },

        props: {
            replyDate: {},
            replyTypeDate: {},
        },

        data() {
            return {
                submitVisible: false,
                resetVisible: false,
            }
        },
        methods: {
            // 提交表单
            submitForm() {
                this.$emit('submitOnClick');
            },
            // 重置表单
            resetForm() {
                this.$emit('resetOnClick');
            },

            resetUI() {

            },
        },
    }
</script>

<style lang="scss" scoped>
    .container {
        .wrap {
            padding: 20px;
            span {
                cursor: pointer;
            }
        }

        .submit {
            float: left;
        }
    }


</style>

<style lang="scss">
    #reply-first-container {
        width: 100%;
        margin-left: -95px;
        span {
            margin-left: 20px;
        }
        .el-input {
            margin-left: 20px;
            width: 30%;
        }
    }

    #reply-second-container {
        width: 100%;
        margin-left: -95px;
        span {
            margin-left: 20px;
        }
        .el-input {
            margin-left: 20px;
            width: 20%;
        }
    }

    #reply-third-container {
        width: 100%;
        margin-left: -95px;
        span {
            margin-left: 20px;
        }
        .el-input {
            margin-left: 20px;
            width: 13%;
        }
    }

    #reply-fourth-container {
        span {
            margin-left: -75px;
        }
        .el-textarea {
            margin-left: 18px;
            width: 80%;
        }

    }

    .submit {
        margin-left: -20px;
        .el-button {
            width: 200px;
            margin-left: 20px;
        }

        #submitBtn {
            background-color: #3963bc;
            color: #ffffff;
            &:hover {
                background-color: #0037ad;
            }
        }
    }
</style>