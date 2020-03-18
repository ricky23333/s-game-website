<template>
    <div class="lin-container">
        <div class="lin-title">音频上传</div>
        <div class="lin-wrap">
            <el-form label-width="220px">
                <el-tooltip class="item" effect="dark" content="上传音频，音频最大不能超过256MB，支持'mp3'格式，同时上传数量不能超过10个"
                            placement="top">
                    <Span>添加音频</Span>
                </el-tooltip>
                <el-form-item>
                    <upload-audios
                            ref="uploadEle"
                            :action="'action'"
                            :limit="9"
                            :accept="'audio/mp3'"/>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import UploadAudios from '@/components/base/upload-audios'

    export default {
        name: 'AudiosUploadStage',

        components: {
            UploadAudios,
        },
        data() {
            return {
                initData: [],
                rules: {
                    maxSize: 5120,
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
