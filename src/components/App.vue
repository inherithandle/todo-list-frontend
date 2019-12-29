<template>
  <div id="app">
    <AddProjectModal
      modal-id="addProjectModal"
    ></AddProjectModal>
    <Navigationbar></Navigationbar>
    <div class="container-fluid">
      <!-- main (sidebar + body) -->
      <router-view
        v-if="api != null"
        v-bind:api="api"
      ></router-view>
    </div>
  </div>
</template>

<script>
import ApiFactory from '../js/api.js'
import Navigationbar from './Navbar.vue'
import TodoBody from './TodoBody.vue'
import AddProjectModal from './AddProjectModal.vue'

export default {
  data: function() {
    return {
      message: 'App',
      api: null
    }
  },
  mounted: async function() {
    this.api = await ApiFactory.getAPI()
  },
  components: {
    Navigationbar,
    TodoBody,
    AddProjectModal
  }
}
</script>