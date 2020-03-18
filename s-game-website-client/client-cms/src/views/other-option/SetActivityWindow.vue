<template>
    <div class="container">
        <div class="title">修改活动弹窗</div>
        <div class="wrap">
            <window-editor ref="windowEditor" v-if="activityDate"
                           :activityDate="activityDate"
                           @submitOnClick="submitActivityDate"
                           @resetOnClick="resetActivityDate"/>
        </div>
    </div>
</template>

<script>
    import activityModel from '@/models/activity';
    import WindowEditor from './ActivityWindowEdit';

    export default {
        components: {
            WindowEditor,
        },

        mounted() {
            this.checkDate();
        },

        data() {
            return {
                activityDate: null,
            }
        },

        computed: {},

        methods: {
            async submitActivityDate(index) {
                try {
                    const res = await activityModel.editActivity({
                        activity_type: index,
                    })
                    if (res.error_code === 0) {
                        this.$message.success(`${res.msg}`);
                        this.activityDate.activity_type = index;
                    }
                } catch (error) {
                    this.$message.error(error.data.msg)
                    console.log(error)
                }
            },
            // 重置表单
            resetActivityDate() {
                this.$nextTick(function () {
                    this.$refs.windowEditor.resetUI();
                })
            },

            async checkDate() {
                try {
                    this.loading = true
                    this.activityDate = await activityModel.getActivity();
                    if (this.activityDate && this.activityDate.activity_name) {
                        let tempAry = this.activityDate.activity_name.split('*');
                        this.activityDate.activity_name = tempAry;
                    }
                    this.loading = false
                } catch (error) {
                    this.loading = false
                    this.$message.error(error.data.msg)
                    console.log(error)
                }
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
    }
</style>
