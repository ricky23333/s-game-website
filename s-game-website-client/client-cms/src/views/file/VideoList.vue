<template>
    <div class="lin-container">
        <div class="lin-title">视频列表</div>
        <div class="lin-wrap container">
            <div class="imgs-upload-container">
                <div class="img-box" @click="preview(item.url)" v-for="(item, index) in videoData" :key="index">
                    <!--<el-image class="thumb-item-img" :src="item.url" fit="cover"-->
                    <!--style="width: 100%; height: 100%;"></el-image>-->
                    <i id="video-icon" class="el-icon-video-camera-solid"></i>
                    <div class="control">
                        <div class="bottom-banner">
                            <div class="info" @click.stop="handleInfo(item)"><i class="el-icon-date"></i></div>
                            <div class="delete" @click.stop="handleDelete(item.id)"
                                 v-auth="{ auth: '删除视频', type: 'disabled'}"><i class="el-icon-delete"></i></div>
                            <div class="preview" @click.stop="preview(item.url)"><i class="el-icon-view"></i></div>
                            <div class="download" @click.stop="handleDownload(item.id)"><i class="el-icon-download"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 分页 -->
            <div class="pagination" v-if="page_meta">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :background="true"
                        :page-size="page_meta.per_page_count"
                        :current-page="page_meta.current_page_index"
                        v-if="refreshPagination"
                        layout="prev, pager, next, jumper"
                        :total="page_meta.total"
                ></el-pagination>
            </div>
        </div>
        <template>
            <!-- 弹窗 -->
            <div>
                <div class="video-dialog-container" v-if="dialogFormVisible" @click.self="handleClose">
                    <div class="video-dialog-box">
                        <!--<video v-if="currentVideoUrl&videoInfo"-->
                        <!--:src="currentVideoUrl"-->
                        <!--class="avatar video-avatar"-->
                        <!--controls="controls">-->
                        <!--您的浏览器不支持视频播放-->
                        <!--</video>-->
                        <video-player
                                v-if="currentVideoUrl&&videoInfo" :options="videoInfo.playerOption"
                                :style="videoInfo.videoStyleText"/>
                        <div class="video-close-btn" @click.self="handleClose">
                            X
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import file from '../../models/file.js'
    import Config from '../../config/index'
    import videoPlayer from '../../components/base/video-player/video-player'

    export default {
        components: {
            videoPlayer,
        },
        data() {
            return {
                dialogFormVisible: false,
                videoInfo: null,
                videoData: [],
                // 分页相关
                refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件
                currentVideoUrl: null,
                page_meta: {
                    current_page_index: 1,
                    per_page_count: 28,
                    total: 0,
                    total_page_count: 0,
                },
                playerOptions: {
                    controls: true,
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    language: 'zh-CN',
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    aspectRatio: '16:9',
                    autoplay: false,
                    loop: false,
                    muted: false,
                    notSupportedMessage: '此视频暂时无法播放',
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                    }
                },
            }
        },

        mounted() {
            this._getTableData();
        },

        methods: {
            // 获取数据
            async _getTableData() {
                try {
                    this.loading = true
                    const res = await file.getVideos({
                        type: 2,
                        page: this.page_meta.current_page_index,
                    });
                    if (res.page_meta) this.page_meta = res.page_meta;
                    this.videoData = [...res.date];
                    this.loading = false
                } catch (error) {
                    this.loading = false
                    this.$message.error(error.data.msg)
                    console.log(error)
                }
            },

            preview(url) {
                this.currentVideoUrl = url;
                let playerOption = {...this.playerOptions};
                let videoUrlAry = url.split('.');
                if (videoUrlAry.length !== 2) {
                    this.$message.error('无法识别的url地址');
                }

                if (videoUrlAry) {
                    if (videoUrlAry[1] === 'mp4') {
                        this.playerOptions.techOrder = ['html5'];
                        playerOption.sources = [{
                            type: 'video/mp4',
                            src: url,
                        }];
                    } else {
                        this.playerOptions.techOrder = ['flash'];
                        playerOption.sources = [{
                            type: 'video/x-flv',
                            src: url,
                        }];
                    }
                }

                let videoWidth = '640';
                let videoHeight = '360';
                let videoStyleText = 'style="' + 'width: ' + videoWidth + ';' + 'height: ' + videoHeight + ';' + '"';
                this.videoInfo = {
                    videoStyleText,
                    playerOption,
                }

                this.dialogFormVisible = true;
            },

            async handleInfo(item) {
                const h = this.$createElement;
                this.$msgbox({
                    title: '视频信息',
                    message: h('p', null, [
                        h('span', null, '文件ID: '),
                        h('i', {style: 'color: teal'}, item.id),
                        h('br', null, ''),
                        h('span', null, '文件名: '),
                        h('i', {style: 'color: teal'}, item.name.split('|')[0]),
                        h('br', null, ''),
                        h('span', null, '文件md5: '),
                        h('i', {style: 'color: teal'}, item.md5),
                        h('br', null, ''),
                        h('span', null, '文件url: '),
                        h('i', {style: 'color: teal'}, item.url),
                    ]),
                    confirmButtonText: '确定',
                }).then(action => {
                }).catch(() => {
                });
            },

            async handleDelete(id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(async () => {
                    this.loading = true;
                    const res = await file.deleteVideo(id);
                    if (res.error_code === 0) {
                        this.$message.success(`${res.msg}`)
                        setTimeout(() => {
                            this._getTableData()
                        }, 1000)
                    }
                }).catch((error) => {
                    this.loading = false;
                    if (error.data && error.data.msg) {
                        this.$message.error(error.data.msg)
                    }
                    console.log(error)
                });
            },

            async handleDownload(id) {
                window.open(Config.baseURL + '/file/download-video/' + id, '_blank');
            },

            // 切换分页
            async handleCurrentChange(val) {
                this.page_meta.current_page_index = val
                this.loading = true
                setTimeout(() => {
                    this._getTableData()
                }, 1000)
            },

            // 弹框 右上角 X
            handleClose() {
                this.dialogFormVisible = false
            },
        },
    }
</script>

<style lang="scss" scoped>
    .container {
        padding: 20px 30px;

        .imgs-upload-container {
            display: flex;
            flex-wrap: wrap;

            .img-box {
                border: 1px dashed #d9d9d9;
                border-radius: 3px;
                -webkit-transition: all 0.1s;
                transition: all 0.1s;
                color: #666666;
                margin-right: 1em;
                margin-bottom: 1em;
                width: 200px;
                height: 150px;
                font-size: 12px;
                text-align: center;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                line-height: 1.3;
                flex-direction: column;

                #video-icon {
                    font-weight: bold;
                    font-size: 48px;
                }

                .el-image {
                    width: 100%;
                    height: 100%;
                }

                .control {
                    display: flex;
                    flex-wrap: wrap;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                    -webkit-box-pack: center;
                    -ms-flex-pack: center;
                    justify-content: center;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    opacity: 0;
                    background-color: rgba(0, 0, 0, 0.3);
                    -webkit-transition: all 0.3s;
                    transition: all 0.3s;
                    -webkit-transition-delay: 0.1s;
                    transition-delay: 0.1s;

                    .bottom-banner {
                        display: flex;
                        width: 100%;
                        height: 20%;
                        flex: 4;
                        margin-top: 120px;
                        background-color: rgba(0, 0, 0, 0.3);
                        .preview, .delete, .info, .download {
                            cursor: pointer;
                            width: 25%;
                            color: rgba(250, 250, 250, .9);
                            font-size: 2em;
                            font-weight: bold;
                            transition: all 0.2s;
                            :hover {
                                color: white;
                            }
                        }
                    }
                }

                &:hover {
                    .control {
                        opacity: 1;
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    .video-dialog-container {
        position: absolute;

        top: 0px;
        left: 0px;

        /*position: fixed;*/
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;

        .video-dialog-box {
            z-index: 1001;
            width: 90%;
            margin: 2.5% auto;

            background-color: rgba(255, 255, 255, 1.0);
            border-radius: 5px;

            .video-close-btn {
                color: white;
                cursor: pointer;
                position: absolute;
                top: 1%;
                right: 3%;
                font-size: 25px;
                font-weight: bold;
                width: 50px;
                height: 50px;
            }
        }
    }
</style>
