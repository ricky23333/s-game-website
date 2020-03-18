<template>
    <!-- 列表页面 -->
    <div class="tableSample">
        <!-- 头 -->
        <div class="header">
            <div class="header-left"><p class="title">反馈列表</p></div>
            <div class="header-right">
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
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="ID">
                                    <span>{{ props.row.id }}</span>
                                </el-form-item>
                                <el-form-item label="用户昵称">
                                    <span>{{ props.row.nickname }}</span>
                                </el-form-item>
                                <el-form-item label="用户邮箱">
                                    <span>{{ props.row.email }}</span>
                                </el-form-item>
                                <el-form-item label="文本">
                                    <span>{{ props.row.content }}</span>
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
                        <el-button v-if="scope.row.delete_at"
                                   type="primary"
                                   size="mini"
                                   plain
                                   @click="handleRecover(scope.row)"
                                   v-auth="{ auth: '恢复反馈', type: 'disabled'}">恢复
                        </el-button>
                        <el-button
                                type="danger"
                                size="mini"
                                plain
                                @click="handleDelete(scope.row)"
                                v-auth="{ auth: '删除反馈', type: 'disabled'}">删除
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
    </div>
</template>
<script>
    import comment from '../../models/comment.js'

    export default {
        components: {

        },
        data() {
            return {
                tableData: [],
                loading: false,
                Hidden: true, // 默认隐藏自定义排序列
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
                tableColumn: [
                    {prop: 'id', label: 'ID', width: 60, noRepeat: true,},
                    {prop: 'nickname', label: '用户昵称', width: 100},
                    {prop: 'email', label: '用户邮箱', width: 100},
                    {prop: 'content', label: '文本', width: 200},
                    {prop: 'create_at', label: '创建时间', width: 85},
                    {prop: 'update_at', label: '更新时间', width: 85},
                    {prop: 'delete_at', label: '删除时间', width: 85},
                ],
            }
        },
        computed: {},

        created() {
            // 定制列
            this.tempCheckList = this.tableColumn.map(v => v.label).slice()
            this.checkList = this.tableColumn.map(v => v.label)
            this.filterTableColumn = this.tableColumn.filter(v => this.checkList.indexOf(v.label) > -1)
        },

        mounted() {
            this._getTableData();
        },

        methods: {
            // 获取数据
            async _getTableData() {
                try {
                    this.loading = true
                    const res = await comment.getAdvises({
                        page: this.page_meta.current_page_index,
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

            // handleEdit(index, row) {
            //     if (!row) return;
            //     this.editorAdviseIndex = index;
            //     this.editorAdviseDate = {...row};
            //     this.dialogFormVisible = true;
            // },

            async handleDelete(row) {
                this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(async () => {
                    this.loading = true;
                    const res = await comment.deleteAdvise(row.id);
                    console.log(1111,res);
                    if (res.error_code === 0) {
                        this.dialogFormVisible = false;
                        // this.editorAdviseDate = null;
                        // this.editorAdviseIndex = 0;
                        this.$message.success(`${res.msg}`)
                        setTimeout(() => {
                            this._getTableData()
                        }, 1000)
                    }
                }).catch((error) => {
                    this.dialogFormVisible = false
                    // this.editorAdviseDate = null;
                    // this.editorAdviseIndex = 0;
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
                    let id = row.id;
                    const res = await comment.recoverAdvise({
                        id,
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

            // // 弹框 右上角 X
            // handleClose() {
            //     this.dialogFormVisible = false
            //     this.editorAdviseDate = null;
            //     this.editorAdviseIndex = 0;
            // },

            // async submitAdviseDate() {
            //     try {
            //         this.loading = true;
            //         const res = await advise.editAdvise(this.editorAdviseDate.id, this.editorAdviseDate)
            //         if (res.error_code === 0) {
            //             this.dialogFormVisible = false
            //             this.editorAdviseDate = null;
            //             this.editorAdviseIndex = 0;
            //             this.$message.success(`${res.msg}`)
            //             setTimeout(() => {
            //                 this._getTableData()
            //             }, 1000)
            //         }
            //         this.loading = false;
            //     } catch (error) {
            //         console.log(error);
            //         this.dialogFormVisible = false
            //         this.editorAdviseDate = null;
            //         this.editorAdviseIndex = 0;
            //         this.loading = false;
            //         this.$message.error('参数错误，反馈修改上传失败')
            //     }
            // },
            // // 重置表单
            // resetAdviseDate() {
            //     let row = this.tableData[this.editorAdviseIndex];
            //     this.editorAdviseDate = {...row};
            //     this.$refs.adviseEditor.resetUI();
            // },
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

    .dialog-container {
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;

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
