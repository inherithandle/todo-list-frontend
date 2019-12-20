<template>
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto px-4 text-center">
            <form class="form-signin">
                <h1 class="h3 mb-3 font-weight-normal">로그인</h1>
                <label for="userId" class="sr-only">ID</label>
                <input type="email" id="userId" class="form-control" placeholder="ID" required="" autofocus="">
                <label for="password" class="sr-only">Password</label>
                <input type="password" id="password" class="form-control" placeholder="Password" required="">
                <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"> Remember me
                    </label>
                </div>
                <button class="btn btn-lg btn-primary btn-block" @click="signinClicked">로그인</button>
                <button class="btn btn-lg btn-primary btn-block">구글로 로그인하기</button>
                <button class="btn btn-lg btn-primary btn-block">회원가입</button>
                <p>
                    route.path: {{ this.$route.path }}
                </p>
                <p>
                    route.hash: {{ this.$route.hash }}
                </p>
                <p>
                    route.fullPath: {{ this.$route.fullPath }}
                </p>
            </form>
        </main>
    </div>
</template>

<script>
    export default {
        name: "Signin",
        methods: {
            signinClicked: function() {
                // check out form against DB..
                this.$router.push('/')
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