<template>
    <div class="container">
        <div class="title">新建音乐</div>
        <div class="wrap">
            <audio-editor ref="audioEditor" v-if="form"
                              :audioDate="form"
                              @submitOnClick="submitAudioDate"
                              @resetOnClick="resetAudioDate"
            />
        </div>
    </div>
</template>

<script>
    import {mapActions, mapMutations} from 'vuex'
    import audio from '@/models/audio';
    import AudioEditor from './AudioEdit';

    export default {
        components: {
            AudioEditor,
        },

        created() {

        },

        data() {
            return {
                form: {
                    audio_name: '',
                    audio_url: 0,
                    cover_url: '',
                },
            }
        },

        computed: {},

        methods: {
            async submitAudioDate() {
                try {
                    const res = await audio.addAudio(this.form)
                    if (res.error_code === 0) {
                        this.$message.success(`${res.msg}`)
                        this.resetAudioDate()
                    }
                } catch (error) {
                    this.$message.error(error.data.msg)
                    console.log(error)
                }
            },
            // 重置表单
            resetAudioDate() {
                this.form = {
                    audio_name: '',
                    audio_url: 0,
                    cover_url: '',
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

        .submit {
            float: left;
        }
    }
</style>