<template>
  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#" @click="goToHomeClicked">Todo App</a>
      <form class="form-inline col-md-6 my-auto" v-if="user.login">
          <input v-model="query" class="form-control form-control-dark w-75 mr-2" type="text" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-sm-0" type="submit" @click.prevent="searchButtonClicked">Search</button>
      </form>
      <ul class="navbar-nav px-3" style="flex-direction: row;" v-if="user.login">
            <li class="nav-item text-nowrap px-3">
                <a class="nav-link" href="#">{{ user.userId }}님</a>
            </li>
            <li class="nav-item text-nowrap px-3" @click.prevent="signoutClicked">
                <a class="nav-link" href="#">Sign out</a>
            </li>
      </ul>
    </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: mapState(['user']),
    data: function() {
        return {
            query: ''
        }
    },
    methods: {
        searchButtonClicked(e) {
            this.$router.push({
                name: 'search',
                query: {
                    query: this.query
                }
            })
        },
        async signoutClicked() {
            const accessToken = sessionStorage.getItem('access-token')
            if (!accessToken) {
                this.$router.push({
                    name: 'signin'
                })
            } else {
                this.$api.deleteToken(accessToken).finally(r => {
                    this.discardUser()
                    this.$router.push({
                        name: 'signin'
                    })
                })
            }
        },
        async discardUser() {
            this.$store.commit({
                type: 'login',
                userId: '',
                login: false
            })
        },
        goToHomeClicked() {
            if (!sessionStorage.getItem('access-token')) {
                this.$router.replace({
                    name: 'signin'
                })
            } else {
                this.$router.replace({
                    name: 'body'
                })
            }
        }
    }
}
</script>
