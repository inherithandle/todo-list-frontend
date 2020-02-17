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
                let query = {
                    response_type: 'code',
                    redirect_uri: 'http://localhost:8080/google-signin-callback',
                    scope: 'openid email',
                    client_id: '768285404183-q27nonqv8mkccdfp5q4as2enfcpq4tdh.apps.googleusercontent.com',
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
