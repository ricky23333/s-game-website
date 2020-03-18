<template>
    <div class="container">
        <div class="homepage-info-top">
            <div class="top-box">
                <div class="welcome">
                    <div class="welcome-title">网站后台管理系统</div>
                    <div class="subtitle">
                        <div class="guide">管理员，你好，欢迎进入网站后台管理系统</div>
                        <div class="guide-2">{{dateString}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="homepage-info-bottom">
            <div class="editor-btn" v-auth="'修改告示板内容'">
                <el-button
                        width="300px"
                        type="primary"
                        size="mini"
                        @click="handleOpenEditor">编辑告示板内容
                </el-button>
            </div>
            <div class="bottom-box">
                <div class="bottom-content" v-html="boardContent">
                </div>
            </div>
        </div>

        <template>
            <!-- 弹窗 -->
            <div>
                <div class="dialog-container" v-if="dialogFormVisible" @click.self="handleClose">
                    <div class="dialog-box">
                        <div class="close-btn" @click.self="handleClose">
                            X
                        </div>
                        <el-form status-icon ref="" label-width="100px">
                            <el-form-item id="inform-container">
                                <el-tooltip class="item" effect="dark"
                                            content="修改告示板内容，所有登录后台管理系统的用户均能看到告示板信息，只有超级管理员账号才拥有修改内容的权限"
                                            placement="top">
                                    <Span>修改告示板内容</Span>
                                </el-tooltip>
                                <tinymce ref="textEditor" @change="changeContent"
                                         upload_url=""
                                         :defaultContent="editorBoardContent"/>
                            </el-form-item>

                            <el-form-item class="submit">
                                <el-popover
                                        placement="top"
                                        width="160"
                                        v-model="submitVisible">
                                    <p>确定保存到服务器吗？</p>
                                    <div style="text-align: right; margin: 0">
                                        <el-button size="mini" type="text" @click="submitVisible = false">取消</el-button>
                                        <el-button type="primary" size="mini"
                                                   @click="submitVisible = false;submitForm()">确定
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
                                        <el-button type="primary" size="mini" @click="resetVisible = false;resetForm()">
                                            确定
                                        </el-button>
                                    </div>
                                    <el-button id="resetBtn" slot="reference">重 置</el-button>
                                </el-popover>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import moment from 'moment';

    moment.locale('zh-cn');
    import cmsOption from '../../models/cms-option.js'
    import Tinymce from '@/components/base/tinymce'

    export default {
        components: {
            Tinymce
        },

        data() {
            return {
                dateString: '',
                timer: null,
                boardContent: '',
                editorBoardContent: '',
                dialogFormVisible: false,
                submitVisible: false,
                resetVisible: false,
            }
        },
        mounted() {

            let _this = this;
            this.timer = setInterval(() => {
                this.updateTime();
            }, 1000)
            this._getContentDate();
        },
        methods: {
            updateTime() {
                let week = "星期" + "日一二三四五六".charAt(moment().day());
                let now = moment().format("YYYY年MM月DD日 HH:mm:ss ") +''+ week;
                this.dateString = now;
            },
            async _getContentDate() {
                try {
                    this.loading = true
                    const res = await cmsOption.getCmsOptionContent();
                    if (res) {
                        this.boardContent = res;
                    }
                    this.loading = false
                } catch (error) {
                    this.loading = false
                    this.$message.error('获取留言板信息失败')
                    console.log(error)
                }
            },

            async _updateContentDate() {
                try {
                    this.loading = true
                    const res = await cmsOption.setCmsOptionContent({
                        content: this.editorBoardContent
                    });
                    if (res.error_code === 0) {
                        this.$message.success('留言板信息已更新')
                        setTimeout(() => {
                            this._getContentDate();
                            setTimeout(() => {
                                this.resetForm();
                            }, 200)
                        }, 1000)
                    }
                    this.loading = false
                } catch (error) {
                    this.loading = false
                    this.$message.error('获取留言板信息失败')
                    console.log(error)
                }
            },

            handleClose() {
                this.dialogFormVisible = false;
            },

            handleOpenEditor() {
                this.editorBoardContent = this.boardContent;
                this.dialogFormVisible = true;
            },

            changeContent(val) {
                this.editorBoardContent = val;
            },

            async submitForm() {
                await  this._updateContentDate();
            },

            resetForm() {
                this.editorBoardContent = this.boardContent;
                this.$refs.textEditor.resetContent();
            },
        },
        beforeDestroy() {
            if (this.timer) {
                clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
            }
        },
    }
</script>

<style scoped lang="scss">
    .container {
        padding-left: 20px;
        padding-right: 25px;
        padding-top: 20px;
        padding-bottom: 20px;
        .homepage-info-top {
            display: flex;
            flex: 1;
            height: 160px;
            width: 100%;
            .top-box {
                position: relative;
                overflow: hidden;
                width: 100%;
                height: 100%;
                box-shadow: 0px 2px 14px 0px rgba(243, 243, 243, 1);
                border-radius: 8px;
                background: rgba(69, 119, 255, 1) url('../../assets/img/about/header-bg.png') no-repeat right center;
                .welcome {
                    width: 100%;
                    height: 100%;
                    color: #fff;
                    margin-top: 20px;
                    margin-left: 20px;

                    .welcome-title {
                        margin: 0px auto;
                        font-size: 30px;
                        height: 31px;
                    }
                    .subtitle {
                        margin: 20px auto;
                        .guide-2 {
                            margin: 20px auto;
                        }
                    }
                }
            }
        }

        .homepage-info-bottom {
            margin: 10px auto;
            width: 100%;
            height: 680px;
            display: inline-block;

            .editor-btn {
                height: 25px;
                width: 100%;
            }
            .bottom-box {
                width: 100%;
                height: 95%;
                margin: 5px auto;
                border-radius: 8px;
                border: 1px solid rgba(50, 50, 50, 0.2);
                &:hover {
                    box-shadow: 1px 1px 14px 2px rgba(50, 50, 50, .2);
                }

                .bottom-content {
                    margin-top: 10px;
                    margin-left: 5px;
                    margin-right: 5px;
                }
            }
        }
    }

    @media screen and (max-width: 1200px) {
        .container .homepage-info .homepage-info-top {
            display: none;
        }
        .container .homepage-info .homepage-info-bottom {
            width: 100%;
        }
    }

    @media screen and (max-width: 1200px) {
        .container .homepage-info .homepage-info-top {
            width: 100%;
        }
    }
</style>

<style lang="scss">
    .dialog-container {
        /*top: 0%;*/

        position: absolute;
        top: 0px;
        left: 0px;

        /*position: fixed;*/
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
        .dialog-box {
            z-index: 1001;
            width: 75%;
            margin: 2.5% auto;
            background-color: rgba(255, 255, 255, 1.0);
            border-radius: 5px;

            .close-btn {
                cursor: pointer;
                position: absolute;
                top: 5%;
                right: 11%;
                font-size: 25px;
                font-weight: bold;
                width: 50px;
                height: 50px;
            }

            .el-form {

                width: 95%;
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
        }
    }
    .bottom-content {
        h1 {
            font-size: 36px;
            font-weight: bold;
        }

        span {
            font-size: 26px;
            line-height: 40px;
        }

    }
</style>
