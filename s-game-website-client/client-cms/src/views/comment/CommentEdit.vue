<template>
    <div class="container">
        <div class="wrap">
            <el-row>
                <el-col :lg="16" :md="20" :sm="24" :xs="24">
                    <el-form :model="commentDate" status-icon ref="commentDate" label-width="100px"
                             @submit.native.prevent>

                        <el-form-item id="comment-first-container">
                            <el-tooltip class="item" effect="dark" content="当前评论用户昵称，必选项" placement="top">
                                <Span>评论用户昵称</Span>
                            </el-tooltip>
                            <el-input size="medium" v-model="commentDate.nickname"></el-input>

                            <el-tooltip class="item" effect="dark" content="当前评论用户邮箱，必选项" placement="top">
                                <Span>评论用户邮箱</Span>
                            </el-tooltip>
                            <el-input size="medium" type="email" v-model="commentDate.email"></el-input>
                        </el-form-item>

                        <el-form-item id="comment-second-container">
                            <el-tooltip class="item" effect="dark" content="当前评论所属文章ID，必选项" placement="top">
                                <Span>评论文章ID</Span>
                            </el-tooltip>
                            <el-input size="medium" type="number" v-model="commentDate.article_id"></el-input>

                            <el-tooltip class="item" effect="dark" content="当前评论用户头像索引ID" placement="top">
                                <Span>评论用户头像索引</Span>
                            </el-tooltip>
                            <el-input size="medium" type="number" v-model="commentDate.head_icon_id"></el-input>
                        </el-form-item>

                        <el-form-item id="comment-third-container">
                            <el-tooltip class="item" effect="dark" content="当前评论赞数" placement="top">
                                <Span>评论赞数</Span>
                            </el-tooltip>
                            <el-input size="medium" type="number" v-model="commentDate.likecount"></el-input>

                            <el-tooltip class="item" effect="dark" content="当前评论踩数" placement="top">
                                <Span>评论踩数</Span>
                            </el-tooltip>
                            <el-input size="medium" type="number" v-model="commentDate.hatecount"></el-input>

                            <el-tooltip class="item" effect="dark" content="当前评论举报数" placement="top">
                                <Span>评论举报数</Span>
                            </el-tooltip>
                            <el-input size="medium" type="number" v-model="commentDate.reportcount"></el-input>

                            <el-tooltip class="item" effect="dark" content="当前评论若被屏蔽，在前端显示为..." placement="top">
                                <Span>屏蔽评论</Span>
                            </el-tooltip>
                            <el-checkbox v-model="commentDate.cover_text"/>
                        </el-form-item>

                        <el-form-item id="comment-fourth-container">
                            <el-tooltip class="item" effect="dark" content="当前评论文字内容"
                                        placement="top">
                                <Span>评论内容</Span>
                            </el-tooltip>
                            <el-input
                                    size="medium"
                                    type="textarea"
                                    :autosize="{ minRows: 1, maxRows: 8 }"
                                    maxlength="300"
                                    placeholder="请填写评论"
                                    v-model="commentDate.content">
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
    import comment from '@/models/comment';
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
            commentDate: {},
            commentTypeDate: {},
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
    #comment-first-container {
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

    #comment-second-container {
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

    #comment-third-container {
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

    #comment-fourth-container {
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