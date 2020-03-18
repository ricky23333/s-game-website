<template>
    <!-- 列表页面 -->
    <div class="tableSample">
        <!-- 头 -->
        <div class="header">
            <div class="header-left"><p class="title">文章列表</p></div>
            <div class="header-right" v-if="public_Router">
                <div class="select-first">
                    <el-select size="medium" v-model="selectMainTypeIndex" filterable placeholder="请选择主类型"
                               style="width: 200px;" @change="changeArticleMainType">
                        <el-option
                                v-for="(item,index) in public_Router"
                                v-if="item.child_types"
                                :key="item.tab_name"
                                :label="item.tab_name"
                                :value="index">
                        </el-option>
                    </el-select>
                </div>
                <div class="select-second">
                    <el-select size="medium" v-model="selectChildTypeRouter" filterable placeholder="请选择子类型"
                               style="width: 200px;" @change="changeArticleChildType">
                        <el-option-group
                                v-for="group in public_Router[selectMainTypeIndex].navInfo"
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
                <div class="search-box">
                    <lin-search @query="onQueryChange" @click="onSearchClick" placeholder="请输入关键字"/>
                </div>
                <div style="margin-left:30px">
                    <el-button type="primary" @click="dialogTableVisible = !dialogTableVisible">列操作</el-button>
                </div>
            </div>
        </div>
        <!-- 表格 -->
        <div class="table-main">
            <el-dialog top="5vh" width="60%" :visible.sync="dialogTableVisible">
                <!-- 定制列 -->
                <span>选择要展示的列:</span>
                <el-checkbox-group v-model="checkList" @change="handleChange" class="m-20">
                    <el-checkbox
                            :disabled="item === 'id' || item === '标题'"
                            :label="item"
                            v-for="item in tempCheckList"
                            :key="item"
                    />
                </el-checkbox-group>
                <!-- 固定列 -->
                <span>选择固定在左侧的列:</span>
                <el-checkbox-group v-model="fixedLeftList" class="m-20">
                    <el-checkbox
                            :disabled="fixedRightList.indexOf(item) > -1 || checkList.indexOf(item) === -1"
                            :label="item"
                            v-for="item in tempCheckList"
                            :key="item"
                    />
                </el-checkbox-group>
                <span>选择固定在右侧的列:</span>
                <el-checkbox-group v-model="fixedRightList" class="m-20">
                    <el-checkbox
                            :disabled="fixedLeftList.indexOf(item) > -1 || checkList.indexOf(item) === -1"
                            :label="item"
                            v-for="item in tempCheckList"
                            :key="item"
                    />
                </el-checkbox-group>
            </el-dialog>

            <el-table
                    :data="tableData"
                    @row-dblclick="rowClick"
                    @expand-change="expandChange"
                    v-loading="loading"
                    id="out-table'">
                <!-- 展示摘要 -->
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <div class="summary">
                            <img :src="props.row.cover_image_url" alt/>
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="ID">
                                    <span>{{ props.row.id }}</span>
                                </el-form-item>
                                <el-form-item label="文章标题">
                                    <span>{{ props.row.title }}</span>
                                </el-form-item>
                                <el-form-item label="文章描述">
                                    <span>{{ props.row.article_describe }}</span>
                                </el-form-item>
                                <el-form-item label="文章封面图">
                                    <span>{{ props.row.cover_image_url }}</span>
                                </el-form-item>
                                <el-form-item label="头部背景图">
                                    <span>{{ props.row.head_bg_url }}</span>
                                </el-form-item>
                                <el-form-item label="头部媒体url">
                                    <span>{{ props.row.head_media_url }}</span>
                                </el-form-item>
                                <el-form-item label="头部媒体参数">
                                    <span>{{ props.row.head_media_param }}</span>
                                </el-form-item>
                                <el-form-item label="文章内容">
                                    <span>{{ props.row.content }}</span>
                                </el-form-item>
                                <el-form-item label="作者">
                                    <span>{{ props.row.author }}</span>
                                </el-form-item>
                                <el-form-item label="关键词">
                                    <span>{{ props.row.keyword }}</span>
                                </el-form-item>
                                <el-form-item label="点击量">
                                    <span>{{ props.row.hitcount }}</span>
                                </el-form-item>
                                <el-form-item label="点赞量">
                                    <span>{{ props.row.likecount }}</span>
                                </el-form-item>
                                <el-form-item label="评论量">
                                    <span>{{ props.row.commentcount }}</span>
                                </el-form-item>
                                <el-form-item label="显示类型">
                                    <span>{{ props.row.show_type }}</span>
                                </el-form-item>
                                <el-form-item label="创建时间">
                                    <span>{{ props.row.create_at }}</span>
                                </el-form-item>
                                <el-form-item label="更新时间">
                                    <span>{{ props.row.update_at }}</span>
                                </el-form-item>
                                <el-form-item label="删除时间">
                                    <span>{{ props.row.delete_at }}</span>
                                </el-form-item>
                            </el-form>
                        </div>
                    </template>
                </el-table-column>
                <!-- 开始循环 -->
                <template v-for="item in filterTableColumn">
                    <!-- 正常表单列 -->
                    <el-table-column id="table-column"
                                     v-bind:key="item.label"
                                     v-if="!item.noRepeat"
                                     :prop="item.prop"
                                     :label="item.label"
                                     :show-overflow-tooltip="true"
                                     :fixed="item.fixed ? item.fixed : false"
                                     :width="item.width ? item.width : ''"
                    ></el-table-column>
                    <!-- 排序 ID -->
                    <el-table-column
                            label="ID"
                            :prop="item.prop"
                            sortable
                            v-bind:key="item.label"
                            :fixed="item.fixed ? item.fixed : false"
                            :width="item.width ? item.width : ''"
                            v-if="item.label === 'ID'"
                    ></el-table-column>
                </template>
                <!-- 操作列 -->
                <el-table-column label="操作" fixed="right" width="200">
                    <template slot-scope="scope">
                        <el-button
                                type="primary"
                                size="mini"
                                plain
                                @click="handleEdit(scope.$index, scope.row)"
                                v-auth="{ auth: '更新文章', type: 'disabled'}">编辑
                        </el-button>
                        <el-button v-if="scope.row.delete_at"
                                   type="primary"
                                   size="mini"
                                   plain
                                   @click="handleRecover(scope.row)"
                                   v-auth="{ auth: '恢复文章', type: 'disabled'}">恢复
                        </el-button>
                        <el-button
                                type="danger"
                                size="mini"
                                plain
                                @click="handleDelete(scope.row)"
                                v-auth="{ auth: '删除文章', type: 'disabled'}">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

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
                <div class="article-dialog-container" v-if="dialogFormVisible" @click.self="handleClose">
                    <div class="dialog-box">
                        <article-editor id="artilce-editor" ref="articleEditor"
                                        v-if="editorArticleDate&&public_Router"
                                        :articleDate="editorArticleDate"
                                        :articleTypeDate="public_Router"
                                        @submitOnClick="submitArticleDate"
                                        @resetOnClick="resetArticleDate"/>
                        <div class="close-btn" @click.self="handleClose">
                            X
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
    import LinSearch from '@/components/base/search/lin-search'
    import article from '../../models/article.js'
    import {mapActions, mapMutations} from 'vuex'
    import publicInformation from '@/models/public-information';
    import ArticleEditor from './ArticleEdit';

    export default {
        components: {
            LinSearch,
            ArticleEditor,
        },
        data() {
            return {
                selectMainTypeIndex: 1,
                selectChildTypeRouter: '',
                tableData: [],
                loading: false,
                Hidden: true, // 默认隐藏自定义排序列
                searchKeyword: '',
                // 定制列相关
                checkList: [],
                filterTableColumn: [],
                // 分页相关
                refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件
                page_meta: {
                    current_page_index: 1,
                    per_page_count: 12,
                    total: 0,
                    total_page_count: 0,
                },
                // 固定列相关
                dialogTableVisible: false,
                fixedLeftList: [],
                fixedRightList: [],
                value: '',
                // 单元格编辑相关
                editRow: 0,
                showTooltip: true,
                dialogFormVisible: false, // 控制弹窗显示
                editorArticleDate: null,
                editorArticleIndex: 0,
                tableColumn: [
                    {prop: 'id', label: 'ID', width: 75, noRepeat: true,},
                    {prop: 'title', label: '文章标题', width: 150,},
                    {prop: 'article_describe', label: '文章描述', width: 150},
                    {prop: 'cover_image_url', label: '封面图片', width: 100},
                    {prop: 'head_bg_url', label: '头部背景', width: 100},
                    {prop: 'head_media_url', label: '头部媒体', width: 100},
                    {prop: 'head_media_param', label: '头部参数', width: 100},
                    {prop: 'content', label: '文章内容', width: 200},
                    {prop: 'author', label: '作者', width: 50},
                    {prop: 'keywords', label: '关键词', width: 60},
                    {prop: 'hitcount', label: '点击量', width: 60},
                    {prop: 'likecount', label: '点赞', width: 60},
                    {prop: 'commentcount', label: '点踩', width: 60},
                    {prop: 'show_type', label: '显示类型', width: 60},
                    {prop: 'create_at', label: '创建时间', width: 85},
                    {prop: 'update_at', label: '更新时间', width: 85},
                    {prop: 'delete_at', label: '删除时间', width: 85},
                ],
            }
        },
        computed: {
            public_Router() {
                if (!this.$store.state.public_Information) return null;
                return this.$store.state.public_Information.router_type;
            },
        },
        created() {
            // 获取数据
            this.checkPublicInformation();

            // 定制列
            this.tempCheckList = this.tableColumn.map(v => v.label).slice()
            this.checkList = this.tableColumn.map(v => v.label)
            this.filterTableColumn = this.tableColumn.filter(v => this.checkList.indexOf(v.label) > -1)
        },
        methods: {
            // 获取数据
            async _getTableData() {
                try {
                    this.loading = true
                    const res = await article.getArticles({
                        main_type: this.public_Router[this.selectMainTypeIndex].router_name,
                        child_type: this.selectChildTypeRouter,
                        page: this.page_meta.current_page_index,
                        keyword: this.searchKeyword,
                    });
                    if (res.page_meta) this.page_meta = res.page_meta;
                    res.date.map(item => {
                        const temp = item
                        temp.editFlag = false
                        return ''
                    })
                    this.tableData = [...res.date]
                    this.loading = false
                } catch (error) {
                    this.loading = false
                    this.$message.error(error.data.msg)
                    console.log(error)
                }
            },

            rowClick(val) {

            },

            // 定制列
            handleChange() {
                this.filterTableColumn = this.tableColumn.filter(v => this.checkList.indexOf(v.label) > -1)
            },
            showRowOperateModal() {
            },


            expandChange(row, expandedRows) {
            },

            // 切换分页
            async handleCurrentChange(val) {
                this.page_meta.current_page_index = val
                this.loading = true
                setTimeout(() => {
                    this._getTableData()
                }, 1000)
            },

            // 搜索
            onQueryChange(query) {
                this.searchKeyword = query.trim();
            },

            async onSearchClick() {
                await this._getTableData()
            },

            ...mapActions(['setPublicInformation']),
            async checkPublicInformation() {
                if (!this.public_Router) {
                    try {
                        this.loading = true
                        const inform = await publicInformation.getPublicInformation()
                        this.setPublicInformation(inform)
                        this.loading = false
                        this.selectMainTypeIndex = 1;
                        this.selectChildTypeRouter = this.public_Router[this.selectMainTypeIndex].navInfo[0].childNav[0].titleRouter;
                    } catch (error) {
                        this.loading = false
                        this.$message.error(error.data.msg)
                        console.log(error)
                    }
                }
            },

            handleEdit(index, row) {
                if (!row) return;
                this.editorArticleIndex = index;
                this.editorArticleDate = {...row};
                this.dialogFormVisible = true;
            },
            async handleDelete(row) {
                this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(async () => {
                    this.loading = true;
                    let main_type = row.main_type;
                    let child_type = row.child_type;
                    const res = await article.deleteArticle(row.id, {
                        main_type,
                        child_type
                    });
                    if (res.error_code === 0) {
                        this.dialogFormVisible = false;
                        this.editorArticleDate = null;
                        this.editorArticleIndex = 0;
                        this.$message.success(`${res.msg}`)
                        setTimeout(() => {
                            this._getTableData()
                        }, 1000)
                    }
                }).catch((error) => {
                    this.dialogFormVisible = false
                    this.editorArticleDate = null;
                    this.editorArticleIndex = 0;
                    this.loading = false;
                    if (error.data && error.data.msg) {
                        this.$message.error(error.data.msg)
                    }
                    console.log(error)
                });
            },
            async handleRecover(row) {
                this.$confirm('此操作将恢复并在网页上显示该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(async () => {
                    this.loading = true;
                    let main_type = row.main_type;
                    let child_type = row.child_type;
                    let id = row.id;
                    const res = await article.recoverArticle({
                        id,
                        main_type,
                        child_type,
                    });
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

            changeArticleMainType(value) {
                this.selectMainTypeIndex = value;
                if (this.public_Router[this.selectMainTypeIndex].navInfo[0].childNav) {
                    this.selectChildTypeRouter = this.public_Router[this.selectMainTypeIndex].navInfo[0].childNav[0].titleRouter;
                }
                else {
                    this.selectChildTypeRouter = this.public_Router[this.selectMainTypeIndex].navInfo[0].titleRouter;
                    this.page_meta.current_page_index = 1;
                }
            },
            changeArticleChildType(value) {

            },

            // 弹框 右上角 X
            handleClose() {
                this.dialogFormVisible = false
                this.editorArticleDate = null;
                this.editorArticleIndex = 0;
            },

            async submitArticleDate() {
                try {
                    this.loading = true;
                    this.handleTextContent();
                    this.editorArticleDate.oriMainType = this.tableData[this.editorArticleIndex].main_type;
                    this.editorArticleDate.oriChildType = this.tableData[this.editorArticleIndex].child_type;
                    const res = await article.editArticle(this.editorArticleDate.id, this.editorArticleDate)
                    if (res.error_code === 0) {
                        this.dialogFormVisible = false
                        this.editorArticleDate = null;
                        this.editorArticleIndex = 0;
                        this.$message.success(`${res.msg}`)
                        setTimeout(() => {
                            this._getTableData()
                        }, 1000)
                    }
                    this.loading = false;
                } catch (error) {
                    this.dialogFormVisible = false
                    this.editorArticleDate = null;
                    this.editorArticleIndex = 0;
                    this.loading = false;
                    this.$message.error(error.data.msg)
                    console.log(error)
                }
            },
            // 重置表单
            resetArticleDate() {
                let row = this.tableData[this.editorArticleIndex];
                this.editorArticleDate = {...row};
                this.$refs.articleEditor.resetUI();
            },

            handleTextContent() {
                // this.form.content = this.form.content.replace(/<body>/g, '').replace(/<\/body>/g, '').replace(/<html>/g, '').replace(/<\/html>/g, '').replace(/<head>/g, '').replace(/<\/head>/g, '').replace(/<!DOCTYPE html>/g, '').replace(/[\r\n]/g, "");
            },
        },

        watch: {
            // 监听固定列变化
            fixedLeftList() {
                this.filterTableColumn.map((item, index) => {
                    if (this.fixedLeftList.indexOf(item.label) > -1) {
                        this.$set(this.filterTableColumn[index], 'fixed', 'left')
                    } else if (this.fixedRightList.indexOf(item.label) === -1) {
                        this.$set(this.filterTableColumn[index], 'fixed', false)
                    }
                    return ''
                })
            },
            fixedRightList() {
                this.filterTableColumn.map((item, index) => {
                    if (this.fixedRightList.indexOf(item.label) > -1) {
                        this.$set(this.filterTableColumn[index], 'fixed', 'right')
                    } else if (this.fixedLeftList.indexOf(item.label) === -1) {
                        this.$set(this.filterTableColumn[index], 'fixed', false)
                    }
                    return ''
                })
            },
            selectChildTypeRouter() {
                this.page_meta.current_page_index = 1;
                if (this.public_Router) {
                    this._getTableData();
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    .tableSample {
        padding: 0 0 30px;

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 30px;
            border-bottom: 1px solid #dae1ed;

            .header-left {
                float: left;

                .title {
                    height: 59px;
                    line-height: 59px;
                    color: $parent-title-color;
                    font-size: 16px;
                    font-weight: 500;
                }
            }

            .header-right {
                float: right;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }

        .table-main {
            padding: 0 30px;
            margin-top: 30px;
        }

        .top-operate {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            margin-top: 30px;
        }

        .sort-input {
            width: 50px;
            background: none;
            justify-content: space-around;
        }

        .table-edit {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            .content {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .cell-icon {
                cursor: pointer;
                color: #3963bc;
                font-size: 16px;
            }

            .cell-icon-edit {
                display: flex;
                margin-left: 20px;
                width: 50px;
                justify-content: space-between;

                .cell-cancel {
                    cursor: pointer;
                    color: #3963bc;
                    font-size: 16px;
                }

                .cell-save {
                    cursor: pointer;
                    color: #3963bc;
                    font-size: 16px;
                    margin-right: -20px;
                }
            }
        }

        .m-20 {
            margin-bottom: 10px;
            margin-top: 5px;
        }

        .summary {
            display: flex;
            justify-content: flex-start;
            flex-direction: row;

            img {
                width: 135px;
                height: 135px;
            }

            .demo-table-expand {
                font-size: 0;
                margin-left: 30px;
                display: flex;
                flex-direction: column;

                label {
                    width: 90px;
                    color: #99a9bf;
                }

                .el-form-item {
                    height: 35px;
                    width: 800px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-right: 0;
                    margin-bottom: 0;
                    display: flex;
                    flex-direction: row;
                }
            }
        }

        .pagination {
            display: flex;
            justify-content: flex-end;
            margin: 20px;
        }
    }

    // dialog
    .tableSample /deep/ .el-dialog__footer {
        text-align: left;
        padding-left: 30px;
    }

    .tableSample /deep/ .el-dialog__header {
        padding-left: 30px;
    }

    .tableSample /deep/ .el-dialog__body {
        padding: 30px;
    }
</style>

<style lang="scss">
    .header-right {
        .select-first, .select-second, .search-box {
            margin-left: 20px;
        }
    }

    .table-main {
        #table-column {
            text-align: center;
        }
        .cell {
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-left: 10px;
        }

        .el-table__expand-column {
            .cell {
                padding-left: 15px;
                width: 18px;
                text-align: center;
            }
        }

        td {
            align-items: center;
            .cell {
                align-items: center;
                width: 90%;
            }
        }

        th {
            text-align: center;
            /*overflow: hidden;*/
            /*text-overflow: ellipsis;*/
            /*white-space: nowrap;*/
            .cell {
                text-align: center;
            }
        }
    }

    .article-dialog-container {
        /*top: 0%;*/
        position: absolute;
        top: 0px;
        left: 0px;
        /*position: fixed;*/
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 1700px;
        .dialog-box {
            z-index: 1001;
            width: 90%;
            margin: 2.5% auto;

            background-color: rgba(255, 255, 255, 1.0);
            border-radius: 5px;

            .close-btn {
                cursor: pointer;
                position: fixed;
                top: 12%;
                right: 4%;
                font-size: 25px;
                font-weight: bold;
                width: 50px;
                height: 50px;
            }
        }
    }

</style>
