<template>
    <div class="container">
        <div class="wrap">
            <el-row>
                <el-col :lg="16" :md="20" :sm="24" :xs="24">
                    <el-form :model="audioDate" status-icon ref="audioDate" label-width="100px"
                             @submit.native.prevent>

                        <el-form-item id="audio-first-container">
                            <el-tooltip class="item" effect="dark"
                                        content="音乐名称，不填则显示url文件名" placement="top">
                                <Span>音乐名称</Span>
                            </el-tooltip>
                            <el-input size="medium" v-model="audioDate.audio_name"
                                      placeholder="请填写音乐名称"></el-input>
                        </el-form-item>

                        <el-form-item id="audio-second-container">
                            <el-tooltip class="item" effect="dark"
                                        content="音乐url" placement="top">
                                <Span>音乐url</Span>
                            </el-tooltip>
                            <el-input size="medium" v-model="audioDate.audio_url"
                                      placeholder="请填写音乐url"></el-input>
                        </el-form-item>

                        <el-form-item id="audio-third-container">
                            <el-tooltip class="item" effect="dark"
                                        content="音乐url" placement="top">
                                <Span>封面url</Span>
                            </el-tooltip>
                            <el-input size="medium" v-model="audioDate.cover_url"
                                      placeholder="请填写封面url"></el-input>
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
    import audio from '@/models/audio';

    export default {
        components: {},
        created() {
        },

        mounted() {

        },

        props: {
            audioDate: {},
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

<style lang="scss" >
    #audio-first-container {
        span {
            margin-left: -75px;
        }
        .el-input {
            margin-left: 70px;
            width: 80%;
        }
    }

    #audio-second-container {
        span {
            margin-left: -75px;
        }
        .el-input {
            margin-left: 70px;
            width: 80%;
        }
    }

    #audio-third-container {
        span {
            margin-left: -75px;
        }
        .el-input {
            margin-left: 70px;
            width: 80%;
        }
    }

    .submit {
        margin-left: -22px;
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