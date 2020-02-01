<template>
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto px-4">
            <h3 class="my-5 text-center">회원 가입</h3>
            <form class="form-signup">

                <div class="mb-3">
                    <b-alert v-model="hasErrors" variant="danger" style="word-break: keep-all;">
                        <ul>
                            <li v-for="error in errors">
                                {{ error }}
                            </li>
                        </ul>
                    </b-alert>
                </div>

                <div class="mb-3">
                    <b-alert v-model="uniqueId != '' && form.userId == uniqueId" variant="info" style="word-break: keep-all;">
                        {{ noDuplicateMessage }}
                    </b-alert>
                </div>


                <div class="mb-3">
                    <label for="id">ID</label>
                    <div class="row">
                        <div class="col-9">
                            <input type="text" maxlength="15" v-model="form.userId" class="form-control" id="id" placeholder="ID 한글 불가, 첫 글자는 반드시 영어로 해주세요.">
                        </div>
                        <div class="col-3">
                            <button @click="checkForDuplicate" class="btn btn-primary btn-block">중복 확인</button>
                        </div>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="password">비밀번호</label>
                    <input type="password" v-model="form.password" class="form-control" id="password" placeholder="8자 이상">

                </div>

                <div class="mb-3">
                    <label for="confirm-password">비밀번호 확인</label>
                    <input type="password" v-model="form.confirmPassword" class="form-control" id="confirm-password" placeholder="8자 이상">

                </div>

                <div class="mt-5 mx-auto">
                    <button @click="submit" class="btn btn-lg btn-primary btn-block">회원가입</button>
                </div>

            </form>
        </main>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    export default {
        name: "Signup",
        data: function() {
            return {
                form: {
                   userId: '',
                   password: '',
                   confirmPassword: ''
                },
                uniqueId: '',
                errors: [],
                noDuplicateMessage: ''
            }
        },
        computed: {
            hasErrors: function() {
                return this.errors.length > 0
            }
        },
        methods: {
            validateForm: function() {
                if (!this.form.userId) {
                    this.errors.push("아이디를 입력 하세요.")
                } else if (!/^[A-Za-z][A-Za-z0-9]{3,15}$/.test(this.form.userId)) {
                    this.errors.push("ID는 4자 이상 15이하, 한글 불가, 첫 글자는 반드시 영문자로 시작해주세요.")
                }

                if (!this.form.password) {
                    this.errors.push("비밀번호를 입력 하세요.")
                }

                if (this.form.password.length < 8 || this.form.confirmPassword.length < 8 ||
                    this.form.password.length > 20 || this.form.confirmPassword.length > 20) {
                    this.errors.push("비밀번호는 8자 이상으로 20자 이하로 입력해주세요.")
                }

                if (!this.form.confirmPassword) {
                    this.errors.push("비밀번호 확인을 입력하세요.")
                } else if (this.form.password != this.form.confirmPassword) {
                    this.errors.push("비밀번호가 비밀번호 확인과 일치하지 않습니다.")
                }

                if (!this.isDuplicateCheckDone(this.form.userId)) {
                    this.errors.push("ID 중복확인을 해주세요.")
                }

                return this.errors.length > 0
            },
            submit: async function() {
                this.errors = []

                if (this.validateForm()) {
                    return ;
                }

                let user = {
                    userId: this.form.userId,
                    password: this.form.password,
                    confirmPassword: this.form.confirmPassword
                }

                let response = await this.$api.signup(user)

                if (response.data.login) {
                    Cookies.set('access-token', response.data.accessToken)
                    this.$store.commit({
                        type: 'login',
                        userId: this.userId,
                        login: response.data.login
                    })
                    this.$router.push('/')
                }

            },
            checkForDuplicate: async function() {
                this.errors = []
                if (this.invalidUserId(this.form.userId)) {
                    this.errors.push("ID는 8자 이상 15이하, 한글 불가, 첫 글자는 반드시 영문자로 시작해주세요.")
                    return ;
                }

                if (this.isDuplicateCheckDone(this.form.userId)) {
                    return ;
                }

                let response = await this.$api.isDuplicate(this.form.userId)
                if (response.data.duplicate) {
                    this.errors.push(`${this.form.userId}는 이미 사용중인 아이디입니다.`)
                } else {
                    this.uniqueId = this.form.userId
                    this.noDuplicateMessage = `${this.form.userId}는 사용하실 수 있습니다.`
                }

            },
            isDuplicateCheckDone: function(id) {
                return id == this.uniqueId
            },
            invalidUserId: function(id) {
                return !/^[A-Za-z][A-Za-z0-9]{3,15}$/.test(id)
            }
        }
    }
</script>

<style scoped>
    .form-signup {
        width: 100%;
        max-width: 550px;
        padding: 15px;
        margin: 0 auto;
    }
</style>