// TodoBody.vue router candidate
<template>
    <div>
        <div class="pt-3 pb-2 mb-3 border-bottom">
            <h3>{{ $route.query.query }} 검색결과</h3>

        </div>

        <div class="d-flex mb-3">
            <b-alert class="flex-grow-1" variant="info" v-if="searchResult.projects.length > 0" show>
                Sidebar에서 Project를 선택하면, 할 일을 추가할 수 있습니다.
            </b-alert>
        </div>

        <div class="d-flex mb-3">
            <b-alert class="flex-grow-1" variant="danger" v-if="searchResult.projects.length == 0" show>
                검색결과가 없습니다.
            </b-alert>
        </div>

        <div class="card-body ml-5 mr-5">
            <div v-for="project in searchResult.projects" v-bind:key="project.projectNo">
                <h4 class="mb-4">{{ project.projectName }}</h4>
                <ul class="d-flex flex-column border" v-if="project.todos.length > 0">
                    <li v-for="todo in project.todos" class="d-flex" v-bind:key="todo.id">
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="checkbox" type="checkbox"
                                       v-model="todo.completed"
                                       @change="checkboxChanged(todo.id, todo.projectNo)"
                                ><i class="input-helper"></i></label>
                        </div>
                        <div class="align-self-center flex-grow-1">
                            {{ todo.text }}
                        </div>
                        <div class="align-self-center">
                            {{ todo.dueDate.substring(0, 10) }}
                        </div>
                        <div class="align-self-center">
                            <button @click="deleteTodoBtnClicked(todo.id, todo.projectNo)" class="btn">
                                <FontAwesomeIcon icon="trash"></FontAwesomeIcon>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
    export default {
        name: "SearchResult",
        props: ['projects'],
        computed: {
            searchResult: function() {
                let query = this.$route.query.query
                let criterion = todo => todo.text.toLowerCase().indexOf(query.toLowerCase()) != -1
                let searchResult = {}
                searchResult.projects = []
                searchResult.numOfTodos = 0
                for (let i = 0; i < this.projects.length; i++) {
                    let project = {}
                    project.projectName = this.projects[i].projectName
                    project.todos = this.projects[i].todos.filter(criterion)

                    if (project.todos.length > 0) {
                        searchResult.projects.push(project)
                        searchResult.numOfTodos += project.todos.length
                    }
                }
                return searchResult
            }
        },
        methods:  {
            deleteTodoBtnClicked: function(todoId, projectNo) {
                this.$emit('todo-deleted', todoId, projectNo)
            },
            checkboxChanged: function(todoId, projectNo) {
                this.$emit('checkbox-changed', todoId, projectNo)
            },
        },
        components: {
            FontAwesomeIcon,
        }
    }
</script>

<style scoped>

</style>
