<template>
    <h3 style="margin-top: 100px;">{{ h3 }}</h3>
</template>

<script>
    export default {
        name: "GoogleSigninCallback",
        data: function() {
            return {
                h3: '구글 계정으로 로그인 하고 있어요. 잠시 기다려주세요.'
            }
        },
        mounted: async function() {
            let code = this.$route.query.code
            if (!code) {
                this.h3 = "유효하지 않은 접근입니다."
                return ;
            }

            let response = await this.$api.signinWithGoogle(code)
            if (response.data.login) {
                sessionStorage.setItem('access-token', response.data.accessToken)
                this.$store.commit({
                    type: 'login',
                    userId: this.userId,
                    login: response.data.login
                })
                this.$router.replace('/')
            } else {
                this.h3 = "유효하지 않은 접근입니다."
            }
        }
    }


</script>

<style scoped>

</style>
