<template>
  <div id="app">
    <AddProjectModal
      modal-id="add-project-modal"
    ></AddProjectModal>
    <ModifyTodoModal
      modal-id="modify-project-modal"
      v-if="api != null"
      v-bind:api="api"
      v-bind:todo="todoToBeModified"
    ></ModifyTodoModal>

    <Navigationbar></Navigationbar>
    <div class="container-fluid">
      <!-- main (sidebar + body) -->
      <router-view
        v-if="api != null"
        v-bind:api="api"
        v-on:modify-todo-modal-show="modifyTodoModalShow"
      ></router-view>
    </div>
  </div>
</template>

<script>
import ApiFactory from '../js/api.js'
import Navigationbar from './Navbar.vue'
import TodoBody from './TodoBody.vue'
import AddProjectModal from './AddProjectModal.vue'
import ModifyTodoModal from "./ModifyTodoModal.vue";

export default {
  data: function() {
    return {
      message: 'App',
      api: null,
      todoToBeModified: {}
    }
  },
  mounted: async function() {
    this.api = await ApiFactory.getAPI()
  },
  methods: {
    modifyTodoModalShow: function(todo) {
      this.todoToBeModified = todo
      this.$bvModal.show('modify-project-modal')
    }
  },
  components: {
    ModifyTodoModal,
    Navigationbar,
    TodoBody,
    AddProjectModal
  }
}
</script>