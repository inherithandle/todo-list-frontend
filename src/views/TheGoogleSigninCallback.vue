<template>
    <div>
        <h3 style="margin-top: 100px;">{{ h3 }}</h3>
        <h4 v-if="hasError">
            <router-link to="/signin" replace>돌아가기</router-link>
        </h4>
    </div>
</template>

<script>
    export default {
        name: "GoogleSigninCallback",
        data: function() {
            return {
                h3: '구글 계정으로 로그인 하고 있어요. 잠시 기다려주세요.',
                hasError: false,
            }
        },
        mounted: async function() {
            const code = this.$route.query.code
            if (!code) {
                this.h3 = "유효하지 않은 접근입니다."
                this.hasError = true
                return ;
            }

            let response = await this.$api.signinWithGoogle(code)
            if (response.status >= 500) {
                this.hasError = true
                this.h3 = 'backend 서버의 에러로 인해 현재 구글 로그인을 사용하실 수 없습니다.'
            } else if (response.data.login) {
                sessionStorage.setItem('access-token', response.data.accessToken)
                this.$store.commit({
                    type: 'login',
                    userId: this.userId,
                    login: response.data.login
                })
                this.$router.replace('/')
            } else {
                this.h3 = "유효하지 않은 접근입니다."
                this.hasError = true
            }
        }
    }


</script>

<style scoped>

</style>
