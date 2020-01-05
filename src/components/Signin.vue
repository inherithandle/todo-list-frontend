<template>
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto px-4 text-center">
            <form class="form-signin">
                <h1 class="h3 mb-3 font-weight-normal">로그인</h1>
                <b-alert v-model="loginFailed" variant="info" dismissible style="word-break: keep-all;">
                    ID 혹은 비밀번호가 올바르지 않습니다.
                </b-alert>
                <label for="userId" class="sr-only">ID</label>
                <input type="text" id="userId" class="form-control" placeholder="ID" v-model="userId" required="" autofocus="">
                <label for="password" class="sr-only">Password</label>
                <input type="password" id="password" class="form-control" placeholder="Password" v-model="password" required="">
                <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"> Remember me
                    </label>
                </div>
                <button class="btn btn-lg btn-primary btn-block" @click="signinClicked" formnovalidate>로그인</button>
                <div v-if="false">
                    <p>
                        for your information...
                    </p>
                    <p>
                        route.path: {{ this.$route.path }}
                    </p>
                    <p>
                        route.hash: {{ this.$route.hash }}
                    </p>
                    <p>
                        route.fullPath: {{ this.$route.fullPath }}
                    </p>
                </div>
                <div class="my-3">
                    <button
                        class="btn btn-lg btn-primary btn-block"
                        @click=""
                    >구글로 로그인하기</button>
                    <button
                        class="btn btn-lg btn-primary btn-block"
                        @click="signupClicked()"
                    >회원가입</button>
                </div>
            </form>
        </main>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import ApiFactory from '../js/api.js'
    export default {
        name: "Signin",
        data: function() {
            return {
                api: null,
                userId: "",
                password: "",
                loginFailed: false
            }
        },
        mounted: async function() {
            this.api = await ApiFactory.getAPI()
        },
        methods: {
            signinClicked: async function() {
                let response = await this.api.login(this.userId, this.password)
                if (response.data.login) {
                    Cookies.set('access-token', response.data.accessToken)
                    this.loginFailed = false

                    this.$store.commit({
                        type: 'login',
                        userId: this.userId,
                        login: response.data.login
                    })
                    this.$router.push('/')
                } else {
                    this.loginFailed = true
                }
            },
            signupClicked: function() {
                this.$router.push('/signup')
            }
        }
    }
</script>

<style scoped>
    .form-signin {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: 0 auto;
    }
    .form-signin .checkbox {
        font-weight: 400;
    }
    .form-signin .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
    }
    .form-signin .form-control:focus {
        z-index: 2;
    }
    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>