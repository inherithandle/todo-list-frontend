<template>
  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Todo App</a>
      <form class="form-inline col-md-6 my-auto" v-if="this.$route.path != '/signin'">
          <input class="form-control form-control-dark w-75 mr-2" type="text" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-sm-0" type="submit" @click="searchButtonClicked">Search</button>
      </form>
      <ul class="navbar-nav px-3" style="flex-direction: row;" v-if="this.$route.path != '/signin'">
            <li class="nav-item text-nowrap px-3">
                <a class="nav-link" href="#">{{"최규태"}}님</a>
            </li>
            <li class="nav-item text-nowrap px-3">
                <router-link to="/signin" class="nav-link">Sign out</router-link>
            </li>
      </ul>
    </nav>
</template>

<script>
export default {
  methods: {
        searchButtonClicked(e) {
            alert('search btn clicked')
        }
  }
}
</script>
