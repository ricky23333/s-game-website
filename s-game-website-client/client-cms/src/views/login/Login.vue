<template>
    <div class="login"
         :style="bgImgStyle">
        <div class="form-box" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)">

            <form class="login-form" autocomplete="off" @submit.prevent="throttleLogin()">
                <div class="title">
                    <h1 title="stellarbug">网站后台管理系统</h1>
                </div>
                <div class="form-item nickname">
                    <input type="text" v-model="form.username" autocomplete="off" placeholder="请填写用户名"
                           onfocus="this.placeholder=''" onblur="this.placeholder='请填写用户名'"/>
                </div>
                <div class="form-item password">
                    <input type="password" v-model="form.password" autocomplete="off" placeholder="请填写密码"
                           onfocus="this.placeholder=''" onblur="this.placeholder='请填写密码'"/>
                </div>
                <div id="checkbox-box">
                    <input id="checkbox" type="checkbox" v-model="form.autoLogin"/>
                    <span>下次自动登录</span>
                </div>
                <button class="submit-btn" type="submit">登 录</button>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapMutations} from 'vuex'
    import User from '@/lin/models/user'
    import PublicInformation from '@/models/public-information'
    import Utils from '@/lin/utils/util'

    export default {
        name: 'login',
        data() {
            return {
                loading: false, // 加载动画
                wait: 2000, // 2000ms之内不能重复发起请求
                throttleLogin: null, // 节流登录
                bgImgStyle: null,
                form: {
                    username: '',
                    password: '',
                    confirm_password: '',
                    autoLogin: false,
                },
            }
        },
        methods: {
            async autoLogin() {


            },

            async login() {
                const {username, password, autoLogin} = this.form
                try {
                    this.loading = true
                    User.saveUsernameAndPassword(username, password, autoLogin);
                    await User.getToken(username, password)
                    await this.getInformation()
                    const inform =  await PublicInformation.getPublicInformation()
                    this.setPublicInformation(inform)
                    this.loading = false
                    this.$router.push('/about')
                    this.$message.success('登录成功')
                } catch (e) {
                    this.loading = false
                    console.log(e)
                }
            },
            async getInformation() {
                try {
                    // 尝试获取当前用户信息
                    const user = await User.getAuths()
                    this.setUserAndState(user)
                    this.setUserAuths(user.auths)
                } catch (e) {
                    console.log(e)
                }
            },
            async register() {
                const obj = {
                    data: {
                        username: this.username,
                        password: this.password,
                        confirm_password: this.confirm_password,
                        email: this.email,
                    },
                }
                try {
                    await User.register(obj)
                    this.$message.success('注册成功！')
                } catch (e) {
                    console.log(e)
                }
            },
            ...mapActions(['setUserAndState']),
            ...mapActions(['setPublicInformation']),
            ...mapMutations({
                setUserAuths: 'SET_USER_AUTHS',
            }),
        },
        created() {
            // 节流登录
            this.throttleLogin = Utils.throttle(this.login, this.wait);
            this.bgImgStyle = 'background:' + 'url(\'./static/login/bg_' + Math.floor((Math.random() * 10) + 1) + '.jpg\')';
            let tempDate = User.getUsernameAndPassword();
            if (tempDate) {
                this.form.username = tempDate.username;
                this.form.password = tempDate.password;
                this.form.autoLogin = true;
            }
        },
        components: {},
    }
</script>

<style lang="scss">
    .login {
        width: 100%;
        height: 100%;
        background-size: auto;
        background: no-repeat center center;
        display: flex;
        .form-box {
            margin: 250px auto;
            display: flex;
            flex-wrap: wrap;
            width: 445px;
            color: rgba(50, 50, 50, 0.9);
            font-size: 30px;

            .logo {
                margin: 0 auto;
                width: 320px;
                height: 92px;
            }

            .login-form {
                margin: 20px auto;
                width: 100%;
                height: 380px;
                overflow: hidden;
                background-color: rgba(250, 250, 250, 0.9);
                box-shadow: 4px 4px 5px 0 rgba(0, 0, 0, .6);
                border-radius: 4px;
                .title {
                    margin: 30px auto;
                    height: 30px;
                    line-height: 37px;
                    h1 {
                        box-sizing: border-box;
                        text-align: center;
                        color: rgba(50, 50, 50, 0.9);
                        font-weight: bold;
                    }
                }
                .form-item {
                    width: 100%;
                    margin: 0px auto;

                    input {
                        margin: 20px auto;
                        width: 75%;
                        height: 50px;
                        color: #c4c9d2;
                        font-size: 18px;
                        box-sizing: border-box;
                        border-radius: 4px;
                        text-align: center;
                        border: 1px solid rgba(100, 100, 100, .6);
                    }

                }

                #checkbox-box {
                    height: 20px;
                    span {
                        position: relative;
                        top: -4px;
                        margin-left: 5px;
                        font-size: 18px;
                        text-align: left;
                        line-height: 30px;
                    }

                    #checkbox {
                        margin-top: 5px;
                        width: 20px;
                        height: 20px;
                    }
                }

                .submit-btn {
                    margin: 20px auto;
                    width: 75%;
                    height: 50px;
                    color: rgba(240, 240, 240, 1.0);
                    background-color: #3883d1;
                    font-size: 22px;
                    font-weight: bold;
                    text-align: center;
                    cursor: pointer;
                    border: 1px solid rgba(100, 100, 100, 0);
                    &:hover {
                        color: rgba(250, 250, 250, 1.0);
                        background-color: #409EFF;
                    }
                }
            }
        }
    }
</style>
