<template>
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto px-4 text-center">
            <form class="form-signin">
                <h1 class="h3 mb-3 font-weight-normal">로그인</h1>
                <b-alert v-model="loginFailed" variant="info" dismissible style="word-break: keep-all;">
                    ID 혹은 비밀번호가 올바르지 않습니다.
                </b-alert>

                <b-alert class="mb-3" v-model="showSigninFormError" variant="danger" dismissible>
                    <ul>
                        <li v-for="error in errors">
                            {{ error }}
                        </li>
                    </ul>
                </b-alert>

                <label for="userId" class="sr-only">ID</label>
                <input type="text" id="userId" class="form-control" placeholder="ID" v-model="userId" autofocus="">
                <label for="password" class="sr-only">Password</label>
                <input type="password" id="password" class="form-control" placeholder="Password" v-model="password">
                <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"> Remember me
                    </label>
                </div>
                <button class="btn btn-lg btn-primary btn-block" @click.prevent="signinClicked">로그인</button>
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
                    <SigninWithGoogleButton
                        class="btn btn-lg btn-primary btn-block"
                    >구글로 로그인하기</SigninWithGoogleButton>
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
    import SigninWithGoogleButton from "../components/VSigninWithGoogleButton.vue";
    export default {
        name: "Signin",
        components: {SigninWithGoogleButton},
        data: function() {
            return {
                userId: "",
                password: "",
                loginFailed: false,
                showSigninFormError: false,
                errors: []
            }
        },
        beforeCreate: function() {
            console.log('signin vue before create')
        },
        mounted: function() {
            console.log('signin vue mounted')
        },
        methods: {
            btn: function(e) {
                alert('btn clicked.')
            },
            signinClicked: async function() {
                this.errors = []
                this.showSigninFormError = false

                if (!this.userId) {
                    this.errors.push('ID를 입력하세요.')
                    this.showSigninFormError = true
                }
                if (!this.password) {
                    this.errors.push('비밀번호를 입력하세요.')
                    this.showSigninFormError = true
                }

                if (this.errors.length > 0) {
                    return ;
                }

                let response = await this.$api.login(this.userId, this.password)
                if (response.data.login) {
                    Cookies.set('access-token', response.data.accessToken)
                    this.loginFailed = false

                    this.$store.commit({
                        type: 'login',
                        userId: this.userId,
                        login: response.data.login
                    })
                    this.$router.push('/')
                    console.log('hello world')
                } else {
                    this.loginFailed = true
                }
            },
            signupClicked: function() {
                this.$router.push('/signup')
            },
            signinWithGoogleClicked: function() {
                //
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