<template>
    <div class="lin-container">
        <div class="lin-title">图片上传</div>
        <div class="lin-wrap">
            <el-form label-width="220px">
                <el-tooltip class="item" effect="dark" content="上传图片，图片最大不能超过5M，支持'png','gif','svg','jpg','bmp'图片格式，可一次添加多个文件，同时上传数量不能超过8个"
                            placement="top">
                    <Span>添加图片</Span>
                </el-tooltip>
                <el-form-item>
                    <upload-imgs
                            ref="uploadEle"
                            :value="initData"
                            :auto-upload="true"
                            :preview="true"
                            :multiple="true"
                            :max-num="8"
                            :accept="'image/gif,image/png,image/jpeg,image/bmp,image/svg'"
                            :fit="'contain'"
                            :width="200"
                            :height="200"
                            :rules="rules"
                    />
                    <!--<div>-->
                        <!--<el-button @click="getValue('uploadEle')">打印图像数据</el-button>-->
                        <!--<el-button @click="doClear">清空</el-button>-->
                    <!--</div>-->
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import UploadImgs from '@/components/base/upload-imgs'

    /** 生成随机字符串 */
    function createId() {
        return Math.random()
            .toString(36)
            .substring(2)
    }

    export default {
        name: 'ImgsUploadStage1',

        components: {
            UploadImgs,
        },
        data() {
            return {
                initData: [],
                rules: {
                    maxSize: 5,
                    allowAnimated: 0,
                },
            }
        },
        // 计算属性设置
        computed: {},
        // 数据变更监听
        watch: {},
        mounted() {
        },
        // 当页面使用路由参数时, 参数部分变化触发的动作在本函数中操作
        // https://router.vuejs.org/zh/guide/advanced/navigation-guards.htmll#组件内的守卫
        // beforeRouteUpdate(to, from, next) {
        //   // this.name = to.params.name
        //   // this.init()
        //   // next()
        // },
        methods: {
            async beforeFuc() {
                this.$message.error('进入自定义校验函数, 并返回false终止上传')
                return false
            },
            async getValue(name) {
                console.log(await this.$refs[name].getValue())
                // eslint-disable-next-line
                alert('已获取数据, 打印在控制台中')
            },
            doClear() {
                this.$refs.uploadEle.clear()
            },

            // remoteFucAsync() {
            //     return Promise.resolve(false)
            // },
            // remoteFuc(file, cb) {
            //     setTimeout(() => {
            //         cb(false)
            //     }, 3000)
            // },
            // remoteFucSuccessAsync() {
            //     return Promise.resolve({
            //         id: createId,
            //         url: 'http://dev.koa.7yue.pro/assets/2019/06/30/abc823a9-5ef4-48e1-bdf6-dd4f0ab92482.jpg',
            //     })
            // },
            // remoteFucSuccess(file, cb) {
            //     setTimeout(() => {
            //         cb({
            //             id: createId,
            //             url: 'http://dev.koa.7yue.pro/assets/2019/06/30/abc823a9-5ef4-48e1-bdf6-dd4f0ab92482.jpg',
            //         })
            //     }, 3000)
            // },
        },
    }
</script>

<style scoped lang="scss">
    .lin-container {
        .lin-wrap {
            margin-left: 20px;
        }
    }
</style>
