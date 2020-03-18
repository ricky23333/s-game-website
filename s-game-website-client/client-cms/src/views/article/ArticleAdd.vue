<template>
    <div class="container">
        <div class="title">新建文章</div>
        <div class="wrap">
            <article-editor ref="articleEditor" v-if="form&&public_Information&&public_Information.router_type"
                            :articleDate="form"
                            :articleTypeDate="public_Information.router_type"
                            @submitOnClick="submitArticleDate"
                            @resetOnClick="resetArticleDate"
            />
        </div>
    </div>
</template>

<script>
    import {mapActions, mapMutations} from 'vuex'
    import article from '@/models/article';
    import publicInformation from '@/models/public-information';
    import ArticleEditor from './ArticleEdit';

    export default {
        components: {
            ArticleEditor,
        },

        mounted() {
            this.checkPublicInformation();
        },

        watch: {
            // form(newVal) {
            //     console.log(11111, newVal);
            // },
        },

        data() {
            return {
                form: {
                    main_type: '',
                    child_type: '',
                    title: '',
                    article_describe: '',
                    cover_image_url: '',
                    head_bg_url: '',
                    head_media_url: '',
                    head_media_param: '',
                    keywords: '',
                    content: '',
                    hitcount: 0,
                    likecount: 0,
                    commentcount: 0,
                    author: '',
                    show_type: 0,
                },
            }
        },

        computed: {
            public_Information() {
                return this.$store.state.public_Information
            },
        },

        methods: {
            async submitArticleDate() {
                try {
                    this.handleTextContent();
                    const res = await article.addArticle(this.form)
                    if (res.error_code === 0) {
                        this.$message.success(`${res.msg}`)
                        this.resetArticleDate()
                    }
                } catch (error) {
                    this.$message.error(error.data.msg)
                    console.log(error)
                }
            },
            // 重置表单
            resetArticleDate() {
                this.form = {
                    main_type: this.public_Information.router_type[1].router_name,
                    child_type: this.public_Information.router_type[1].navInfo[0].titleRouter,
                    title: '',
                    article_describe: '',
                    cover_image_url: '',
                    head_bg_url: '',
                    head_media_url: '',
                    head_media_param: '',
                    keywords: '',
                    content: '',
                    hitcount: 0,
                    likecount: 0,
                    commentcount: 0,
                    author: '',
                    show_type: 0,
                }
                this.$nextTick(function () {
                    this.$refs.articleEditor.resetUI();
                })
            },

            ...mapActions(['setPublicInformation']),

            async checkPublicInformation() {
                if (!this.public_Information) {
                    try {
                        this.loading = true
                        const inform = await publicInformation.getPublicInformation()
                        this.setPublicInformation(inform);
                        this.loading = false
                    } catch (error) {
                        this.loading = false
                        this.$message.error(error.data.msg)
                        console.log(error)
                    }
                }
                this.form.main_type = this.public_Information.router_type[1].router_name;
                this.form.child_type = this.public_Information.router_type[1].navInfo[0].titleRouter;
            },

            handleTextContent() {
                // this.form.content = this.form.content.replace(/<body>/g, '').replace(/<\/body>/g, '').replace(/<html>/g, '').replace(/<\/html>/g, '').replace(/<head>/g, '').replace(/<\/head>/g, '').replace(/<!DOCTYPE html>/g, '').replace(/[\r\n]/g, "");

                // while (currentIndexPos >= 0) {
                //     let startPos = newText.indexOf('<video', currentIndexPos);
                //     currentIndexPos = startPos;
                //     let endPos = newText.indexOf('<\/video>', currentIndexPos);
                //     if (startPos < 0 || endPos < 0) break;
                //     let videoText = newText.substring(startPos, endPos);
                //
                //     let startPos0 = videoText.indexOf('style="');
                //     let endPos0 = videoText.indexOf(';"',startPos0);
                //     let videoStyle = videoText.substring(startPos0 + 7, endPos0);
                //
                //     let startPos1 = videoText.indexOf('poster="');
                //     let endPos1 = videoText.indexOf('"',startPos1);
                //     let videoPostUrl = videoText.substring(startPos1 + 8, endPos1);
                //
                //     let startPos2 = videoText.indexOf('width="');
                //     let endPos2 = videoText.indexOf('"',startPos2);
                //     let videoWidth = videoText.substring(startPos1 + 7, endPos2);
                //
                //     let startPos3 = videoText.indexOf('height="');
                //     let endPos3 = videoText.indexOf('"',startPos3);
                //     let videoHeight = videoText.substring(startPos1 + 7, endPos3);
                //
                //     let startPos4 = videoText.indexOf('src="');
                //     let endPos4 = videoText.indexOf('"',startPos4);
                //     let videoSrc = videoText.substring(startPos1 + 5, endPos4);
                //
                //     let startPos5 = videoSrc.indexOf('.');
                //     let endPos5 = videoSrc.indexOf('"',startPos5);
                //     let videoType = videoSrc.substring(startPos1 + 1, endPos5);
                //
                //     let videoType2;
                //     if(videoType){
                //         if(videoType==='mp4'){
                //             videoType2 = 'type:video/mp4';
                //         }else {
                //             videoType2 = 'type:video/x-flv';
                //         }
                //     }
                //
                //     if(videoText&&videoWidth&&videoHeight&&videoSrc&&videoType){
                //         let tempText = '<video-player '+'style="'+'width:'+videoWidth+';'+'height:'+videoHeight+';'+videoStyle+'"'
                //
                //     }else {
                //         this.$message.error('视频配置错误，请检查配置！');
                //     }
                //
                // }
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
