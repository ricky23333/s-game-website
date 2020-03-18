<template>
    <div class="container">
        <div class="wrap">
            <div class="selector">
                <el-tooltip class="item" effect="dark" content="当前开启的活动弹窗的类型" placement="top">
                    <Span>活动弹窗类型</Span>
                </el-tooltip>
                <div class="select-first">
                    <el-select size="medium" v-model="selectActivityType" filterable placeholder="请选择类型"
                               style="width: 200px;" @change="changeActivityType">
                        <el-option
                                v-for="(item,index) in activityDate.activity_name"
                                :key="item"
                                :label="item"
                                :value="index">
                        </el-option>
                    </el-select>
                </div>
            </div>

            <div class="submit">
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
                    <p>确定重置已修改内容吗？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="resetVisible = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="resetVisible = false;resetForm()">确定
                        </el-button>
                    </div>
                    <el-button id="resetBtn" slot="reference">重 置</el-button>
                </el-popover>
            </div>
        </div>
    </div>
</template>

<script>
    import article from '@/models/article';

    export default {
        components: {},
        created() {

        },

        mounted() {
            this.resetUI();
        },

        props: {
            activityDate: {},
        },

        data() {
            return {
                submitVisible: false,
                resetVisible: false,
                selectActivityType: 0,
            }
        },
        methods: {
            // 提交表单
            submitForm() {
                this.$emit('submitOnClick', this.selectActivityType);
            },
            // 重置表单
            resetForm() {
                this.$emit('resetOnClick');
            },
            resetUI() {
                this.selectActivityType = this.activityDate.activity_type;
            },
            changeActivityType(index) {
                this.selectActivityType = index;
            }
        },
    }
</script>

<style lang="scss" scoped>
    .container {
        .wrap {
            .selector {
                display: flex;
                flex-wrap: nowrap;
                margin-left: 50px;
                .el-tooltip{
                  margin-top: 10px;
                }
                .select-first {
                    margin-left: 50px;
                }
            }
        }
    }
</style>

<style lang="scss">
    .submit {
        margin-top: 20px;
        margin-left: 30px;
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