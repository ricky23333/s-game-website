<template>
    <div class="upload-audios-container">
        <div class="audio_box">
            <el-form>
                <div class="drop-upload-container">
                    <el-form-item :label-width="formLabelWidth">
                        <el-upload
                                multiple
                                drag
                                ref="uploadFiles"
                                :action="action"
                                :limit="limit"
                                :auto-upload="autoUpload"
                                :accept="accept"
                                :before-upload="beforeUploadFile"
                                :on-remove="handleRemove"
                                :on-change="fileChange"
                                :on-exceed="exceedFile"
                                :http-request="handleUpload"
                                :file-list="fileList"
                        >
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">
                                拖拽上传文件
                                <br/>
                                <em> 支持mp3格式 大小不超过256MB</em>
                            </div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item class="item-container">
                        <el-button
                                size="small"
                                type="primary"
                                @click.native="submitUpload"
                        >上 传
                        </el-button>
                        <el-button size="small" @click.native="uploadCancle">清 空
                        </el-button>
                    </el-form-item>
                </div>
            </el-form>

        </div>
    </div>
</template>

<script>

    export default {
        props: {
            action: {
                required: true,
                type: String
            },
            limit: {
                required: true,
                type: Number
            },
            autoUpload: {
                type: Boolean,
                default: false
            },
            accept: {
                required: true,
                type: String
            }
        },
        data() {
            return {
                formLabelWidth: "80px",
                userIds: sessionStorage.getItem("userid"),
                fileList: [],
                files: []
            };
        },
        methods: {
            // 文件超出个数限制时的钩子
            exceedFile(files, fileList) {
                // console.log("===exceed===");
                let limit_num = `${this.limit}`;
                let total_num = `${files.length + fileList.length}`;

                this.$notify.warning({
                    title: '警告',
                    message: `只能选择 ${this.limit} 个文件，当前共选择了 ${files.length + fileList.length} 个`
                });
            },
            // 文件状态改变时的钩子
            fileChange(file, fileList) {
                // console.log("===change===");
            },
            // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
            beforeUploadFile(file) {
                // console.log("before upload");
                // console.log(file);
                let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
                const isAcceptFiles = extension === "mp3";
                if (!isAcceptFiles) this.$message.error('仅支持mp3格式');

                let size = file.size / 1024 / 1024;
                const isAcceptSize = size < 256;
                if (!isAcceptSize) if (!isAcceptFiles) this.$message.error('文件大小不能超过256MB')
                return isAcceptFiles && isAcceptSize;
            },
            // 点击x时执行的钩子函数
            handleRemove(file, fileList) {
                // console.log("===remove===");
            },

            handleUpload(raw) {
                this.files.push(raw.file);
            },
            submitUpload() {
                this.$refs.uploadFiles.submit();
                if (this.files.length <= 0) this.$message.error('请先添加文件');
                const data = {}
                this.files.forEach((item, index) => {
                    data[`file_${index}`] = item
                })

                return this.$axios({
                    method: 'post',
                    url: '/file/upload-audio',
                    data,
                }).then(res => {
                    if (!Array.isArray(res) || res.length === 0) {
                        throw new Error('音频上传失败');
                    }
                    this.$message.success('上传成功');
                    this.uploadCancle();
                }).catch(err => {
                    this.uploadCancle();
                    let msg = '音频上传失败, 请重试'
                    if (err.msg) {
                        // eslint-disable-next-line
                        msg = err.msg
                    } else if (err.message) {
                        msg = err.message
                    }
                    console.error(err)
                    this.$message.error(msg)
                })
            },
            uploadCancle() {
                // console.log("===Cancle===");
                this.$refs.uploadFiles.clearFiles();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .excel-upload-input {
        display: none;
        z-index: -9999;
    }

    .drop {
        border: 2px dashed #bbb;
        width: 600px;
        /* height: 160px; */
        line-height: 160px;
        margin: 0 auto;
        font-size: 24px;
        border-radius: 5px;
        text-align: center;
        color: #bbb;
        position: relative;
    }

    .drop-upload-container {
        width: 450px;
    }

    .item-container {
        margin: 0 auto;
        /* text-align: center; */
        padding-left: 80px;
    }
</style>

