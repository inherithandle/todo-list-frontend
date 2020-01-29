<template>
    <button class=""
            @click="signinWithGoogleClicked"
    ><slot></slot></button>
</template>

<script>
    export default {
        name: "SigninWithGoogleButton",
        prop: ['class', 'abc'],
        methods: {
            signinWithGoogleClicked: function() {
                // backend 토큰 있으면, 그냥 로그인해주기
                // 쿠키 구글 토큰 뒤져서 없으면 리다이렉트
                // BE토큰 없고, 구글 토큰 있으면, BE에게 보내줘서 BE토큰 발급받기
                let query = {
                    response_type: 'code',
                    redirect_uri: 'http://localhost:8080/html/index.html',
                    scope: 'openid email',
                    client_id: '768285404183-q27nonqv8mkccdfp5q4as2enfcpq4tdh.apps.googleusercontent.com', // TODO 상수화
                }
                this.$router.push({
                    path: '/redirect-to-google',
                    query: query
                })
            }
        }
    }
</script>

<style scoped>

</style>