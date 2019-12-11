<template>

  <div>
    <Navigationbar></Navigationbar>
    <div class="container-fluid">
      <!-- main (sidebar + body) -->
      <TodoBody></TodoBody>
    </div>
  </div>
</template>

<script>
import Navigationbar from './Navbar.vue'
import TodoBody from './TodoBody.vue'

export default {
  data: function() {
    return {
      message: 'Hello Buttons World!'
    }
  },
  components: {
    Navigationbar,
    TodoBody
  }
}
</script>