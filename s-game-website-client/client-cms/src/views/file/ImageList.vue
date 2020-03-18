<template>
    <div class="lin-container">
        <div class="lin-title">图片列表</div>
        <div class="lin-wrap container">
            <div class="imgs-upload-container">
                <div class="img-box" @click="preview(index)" v-for="(item, index) in imageData" :key="index">
                    <el-image class="thumb-item-img" :src="item.url" fit="cover"
                              style="width: 100%; height: 100%;"></el-image>
                    <div class="control">
                        <div class="bottom-banner">
                            <div class="info" @click.stop="handleInfo(item)"><i class="el-icon-date"></i></div>
                            <div class="delete" @click.stop="handleDelete(item.id)"
                                 v-auth="{ auth: '删除图片', type: 'disabled'}"><i class="el-icon-delete"></i></div>
                            <div class="preview" @click.stop="preview(index)"><i class="el-icon-view"></i></div>
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
    </div>
</template>

<script>
    import file from '../../models/file.js'
    import Config from '../../config/index'

    export default {
        data() {
            return {
                imageData: [],
                previewImageData: [],
                // 分页相关
                refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件
                page_meta: {
                    current_page_index: 1,
                    per_page_count: 28,
                    total: 0,
                    total_page_count: 0,
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
                    const res = await file.getImages({
                        type: 1,
                        page: this.page_meta.current_page_index,
                    });
                    if (res.page_meta) this.page_meta = res.page_meta;
                    this.imageData = [...res.date];
                    this.previewImageData = [];
                    this.imageData.forEach(item => {
                        this.previewImageData.push(item.url);
                    })
                    this.loading = false
                } catch (error) {
                    this.loading = false
                    this.$message.error(error.data.msg)
                    console.log(error)
                }
            },

            preview(index) {
                this.$imagePreview({
                    images: this.previewImageData,
                    index,
                })
            },

            async handleInfo(item) {
                const h = this.$createElement;
                this.$msgbox({
                    title: '图片信息',
                    message: h('p', null, [
                        h('span', null, '文件ID: '),
                        h('i', {style: 'color: teal'}, item.id),
                        h('br', null, ''),
                        h('span', null, '文件名: '),
                        h('i', {style: 'color: teal'}, item.name),
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
                    const res = await file.deleteImage(id);
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
                window.open(Config.baseURL + '/file/download-image/' + id, '_blank');
            },

            // 切换分页
            async handleCurrentChange(val) {
                this.page_meta.current_page_index = val
                this.loading = true
                setTimeout(() => {
                    this._getTableData()
                }, 1000)
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
