<template>
    <div class="container">
        <div class="wrap">
            <el-row>
                <el-col :lg="16" :md="20" :sm="24" :xs="24">
                    <el-form :model="articleDate" status-icon ref="articleDate" label-width="100px"
                             @submit.native.prevent>
                        <el-form-item id="article-select-container">
                            <el-tooltip class="item" effect="dark" content="当前编辑文章所属网页分类，必选项" placement="top">
                                <Span>文章类型</Span>
                            </el-tooltip>
                            <div class="select-first">
                                <el-select size="medium" v-model="selectMainTypeIndex" filterable placeholder="请选择主类型"
                                           style="width: 200px;" @change="changeArticleMainType">
                                    <el-option
                                            v-for="(item,index) in articleTypeDate"
                                            v-if="item.child_types"
                                            :key="item.tab_name"
                                            :label="item.tab_name"
                                            :value="index">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="article-select-second">
                                <el-select size="medium" v-model="selectChildTypeRouter" filterable placeholder="请选择子类型"
                                           style="width: 200px;" @change="changeArticleChildType">
                                    <el-option-group
                                            v-for="group in articleTypeDate[selectMainTypeIndex].navInfo"
                                            :key="group.titleName"
                                            :label="group.titleName">
                                        <el-option v-if="group.childNav"
                                                   v-for="item in group.childNav"
                                                   :key="item.titleName"
                                                   :label="item.titleName"
                                                   :value="item.titleRouter">
                                        </el-option>
                                        <el-option v-if="!group.childNav"
                                                   :key="group.titleName"
                                                   :label="group.titleName"
                                                   :value="group.titleRouter">
                                        </el-option>
                                    </el-option-group>
                                </el-select>
                            </div>
                        </el-form-item>

                        <el-form-item id="article-title-container">
                            <el-tooltip class="item" effect="dark" content="当前编辑文章标题" placement="top">
                                <Span>文章标题</Span>
                            </el-tooltip>
                            <el-input size="medium" v-model="articleDate.title"
                                      placeholder="请填写文章标题"
                            ></el-input>
                        </el-form-item>

                        <el-form-item id="article-describe-container">
                            <el-tooltip class="item" effect="dark" content="当前文章描述，请尽量精简，网页上若出现显示不全情况，自行斟酌控制长度"
                                        placement="top">
                                <Span>简介</Span>
                            </el-tooltip>
                            <el-input
                                    size="medium"
                                    type="textarea"
                                    :autosize="{ minRows: 1, maxRows: 8 }"
                                    placeholder="请填写文章简介"
                                    v-model="articleDate.article_describe">
                            </el-input>
                        </el-form-item>

                        <el-form-item id="article-image-container">
                            <el-tooltip class="item" effect="dark" content="当前文章封面url，默认分辨率250x170，必填项"
                                        placement="top">
                                <Span>封面</Span>
                            </el-tooltip>
                            <el-input size="medium" v-model="articleDate.cover_image_url"
                                      placeholder="请填写文章封面图地址"></el-input>
                        </el-form-item>

                        <el-form-item id="article-head-bg-container">
                            <el-tooltip class="item" effect="dark"
                                        content="当前文章标题底背景url，默认分辨率1920x300，或者填写背景渐变样式，格式为‘to left, rgba(115,104,118,.9) 0%, rgba(17,11,15,.9) 80%’必填项"
                                        placement="top">
                                <Span>头部背景/样式</Span>
                            </el-tooltip>
                            <el-input size="medium" v-model="articleDate.head_bg_url"
                                      placeholder="请填写文章头部背景地址"></el-input>
                        </el-form-item>

                        <el-form-item id="article-head-media-container">
                            <el-tooltip class="item" effect="dark"
                                        content="当前文章对应视频/音频/图集url,必填项,若为图集，格式为url+'&&'+'描述'+'|'"
                                        placement="top">
                                <Span>头部媒体地址</Span>
                            </el-tooltip>
                            <el-input size="medium" v-model="articleDate.head_media_url"
                                      placeholder="请填写文章头部媒体地址"></el-input>
                        </el-form-item>

                        <el-form-item id="article-head-param-container">
                            <el-tooltip class="item" effect="dark" content="当前文章标题底背景参数，可控制视频分辨率，或填写音频封面图url"
                                        placement="top">
                                <Span>头部背景参数</Span>
                            </el-tooltip>
                            <el-input size="medium" v-model="articleDate.head_media_param"
                                      placeholder="请填写文章头部背景参数"></el-input>
                        </el-form-item>

                        <el-form-item id="article-inform-container-1">
                            <div id="inform-box-1">
                                <el-tooltip class="item" effect="dark" content="当前文章作者，不填网页默认显示‘佚名’" placement="top">
                                    <Span>作者</Span>
                                </el-tooltip>
                                <el-input size="medium" v-model="articleDate.author"></el-input>
                                <el-tooltip class="item" effect="dark" content="当前文章关键词，每个词之间用'*'号间隔" placement="top">
                                    <Span>关键词</Span>
                                </el-tooltip>
                                <el-input size="medium" v-model="articleDate.keywords"></el-input>
                            </div>
                        </el-form-item>

                        <el-form-item id="article-inform-container-2">
                            <div id="inform-box-2">
                                <el-tooltip class="item" effect="dark" content="当前文章点击量，每被访问一次都会在当前基础上+1，也可自己填"
                                            placement="top">
                                    <Span>点击量</Span>
                                </el-tooltip>
                                <el-input size="medium" type="number" v-model="articleDate.hitcount"></el-input>
                                <el-tooltip class="item" effect="dark"
                                            content="当前文章点赞量"
                                            placement="top">
                                    <Span>点赞量</Span>
                                </el-tooltip>
                                <el-input size="medium" type="number" v-model="articleDate.likecount"></el-input>
                                <el-tooltip class="item" effect="dark"
                                            content="当前文章评论量"
                                            placement="top">
                                    <Span>评论量</Span>
                                </el-tooltip>
                                <el-input size="medium" type="number" v-model="articleDate.commentcount"></el-input>
                            </div>
                        </el-form-item>

                        <el-form-item id="article-inform-container-3">
                            <el-tooltip class="item" effect="dark"
                                        content="网站上文章banner的显示样式"
                                        placement="top">
                                <Span>显示样式</Span>
                            </el-tooltip>
                            <el-select size="medium" v-model="articleDate.show_type" filterable placeholder="请选择类型"
                                       style="width: 300px;">
                                <el-option
                                        v-for="(item,index) in showTypeArray"
                                        :key="item.type"
                                        :label="item.type"
                                        :value="index">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item id="article-inform-container-4">
                            <el-tooltip class="item" effect="dark"
                                        content="文章内容编辑器,视频文件只支持mp4格式，请在插入视频地址内写明文件格式后缀名"
                                        placement="top">
                                <Span>文章内容</Span>
                            </el-tooltip>
                            <tinymce ref="textEditor" @change="changeContent"
                                     upload_url=""
                                     :defaultContent="articleDate.content"/>
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
    import article from '@/models/article';
    import Tinymce from '@/components/base/tinymce'

    export default {
        components: {
            Tinymce
        },
        created() {

        },

        mounted() {
            this.resetUI();
        },

        props: {
            articleDate: {},
            articleTypeDate: {},
        },

        data() {
            return {
                selectMainTypeIndex: 1,
                selectChildTypeRouter: this.articleTypeDate[1].navInfo[0].titleRouter,
                submitVisible: false,
                resetVisible: false,
                showTypeArray: [
                    {
                        type: '标准样式(封面+标题+描述+其他信息)'
                    },
                    {
                        type: '简单样式(封面+标题+其他信息)'
                    },
                ],
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

            changeArticleMainType(value) {
                this.selectMainTypeIndex = value;
                if (this.articleTypeDate[this.selectMainTypeIndex].navInfo[0]) {
                    this.selectChildTypeRouter = this.articleTypeDate[this.selectMainTypeIndex].navInfo[0].titleRouter;
                }
                else {
                    this.selectChildTypeRouter = this.articleTypeDate[this.selectMainTypeIndex].navInfo[0].titleRouter;
                }
                this.articleDate.main_type = this.articleTypeDate[this.selectMainTypeIndex].router_name;
                this.articleDate.child_type = this.selectChildTypeRouter;
            },
            changeArticleChildType(value) {
                this.articleDate.child_type = value;
            },
            changeContent(value) {
                this.articleDate.content = value;
            },

            resetUI() {
                let tempMainTypeIndex = this.articleTypeDate.findIndex(item => item.router_name === this.articleDate.main_type);
                if (tempMainTypeIndex < 0) tempMainTypeIndex = 1;
                this.selectMainTypeIndex = tempMainTypeIndex;
                this.selectChildTypeRouter = this.articleDate.child_type;
                this.$refs.textEditor.resetContent();
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

    #inform-container-4 {
        span {
            margin-left: -75px;
        }
    }
</style>

<style lang="scss">
    #article-select-container {
        width: 100%;
        span {
            margin-left: -75px;
        }

        .el-form-item__content {
            display: flex;
            flex: 3;

            .select-first {
                margin-left: 20px;
                width: 30%;
            }

            .select-second {
                margin-left: 20px;
                width: 30%;
            }
        }
    }

    #article-title-container {
        span {
            margin-left: -75px;
        }
        .el-input {
            margin-left: 20px;
            width: 80%;
        }
    }

    #article-describe-container {
        span {
            margin-left: -75px;
        }
        .el-textarea {
            margin-left: 48px;
            width: 80%;
        }

    }

    #article-image-container, #article-head-bg-container, #article-head-media-container, #article-head-param-container {
        span {
            margin-left: -75px;
        }
        .el-input {
            margin-left: 48px;
            width: 80%;
        }
    }

    #article-inform-container-1 {
        display: flex;
        flex-wrap: nowrap;
        #inform-box-1 {
            margin-left: -105px;
            span {
                margin-left: 30px;
                width: 15%;
            }
            .el-input {
                margin-left: 48px;
                width: 25%;
            }
        }
    }

    #article-inform-container-2 {
        display: flex;
        flex-wrap: nowrap;
        #inform-box-2 {
            margin-left: -105px;
            span {
                margin-left: 30px;
                width: 5%;
            }
            .el-input {
                margin-left: 35px;
                width: 15%;
            }
        }
    }

    #article-inform-container-3 {
        span {
            margin-left: -75px;
        }
        .el-select {
            margin-left: 20px;
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