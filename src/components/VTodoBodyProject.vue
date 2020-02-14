// TodoBody.vue router candidate
<template>
    <div>
        <div class="pt-3 pb-2 mb-3 border-bottom">
            <h3>{{ projects[projectIndex].projectName }}</h3>
        </div>

        <b-alert class="mb-3" v-model="showTodoFormError" variant="danger" dismissible>
            <ul>
                <li v-for="error in errors">
                    {{ error }}
                </li>
            </ul>
        </b-alert>

        <div class="d-flex mb-3">
            <div class="mr-2">
                <VueDatePicker
                    input-class="form-control"
                    :language="ko"
                    format="마감일: yyyy-MM-dd"
                    v-model="newTodo.dueDate"
                ></VueDatePicker>
            </div>
            <div class="mr-2 flex-grow-1">
                <input v-model="newTodo.text" type="text" class="form-control todo-list-input" placeholder="할 일을 입력하세요.">
            </div>

            <div class="mr-2">
                <button @click="addTodoButtonClicked" class="add btn btn-primary font-weight-bold todo-list-add-btn">추가</button>
            </div>
        </div>

        <div class="card-body ml-5 mr-5">
            <h4 class="mb-4">해야할 일</h4>
            <div class="flex-grow-1 alert alert-primary" role="alert" v-if="todos.length == 0">
                할 일을 추가하세요.
            </div>
            <ul class="d-flex flex-column border" v-if="projects[projectIndex].todos.length > 0">
                <li v-for="(todo, index) in todos" class="d-flex" v-bind:key="todo.id">
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
                        <button class="btn" @click="modifyTodoBtnClicked(todo)">
                            <FontAwesomeIcon icon="pencil-alt"></FontAwesomeIcon>
                        </button>
                    </div>
                    <div class="align-self-center">
                        <button class="btn" @click="deleteTodoBtnClicked(todo.id, todo.projectNo)">
                            <FontAwesomeIcon icon="trash"></FontAwesomeIcon>
                        </button>
                    </div>
                </li>
            </ul>

            <h4 class="mt-4 mb-4">처리 완료</h4>
            <div class="flex-grow-1 alert alert-primary" role="alert" v-if="doneTodos.length == 0">
                완료한 일이 없습니다.
            </div>
            <ul class="d-flex flex-column border" v-if="doneTodos.length > 0">
                <li v-for="todo in doneTodos" class="d-flex" v-bind:key="todo.id">
                    <div class="form-check">
                        <label class="form-check-label">
                            <input class="checkbox" type="checkbox"
                                   v-model="todo.completed"
                                   @change="checkboxChanged(todo.id, todo.projectNo)"
                            ><i class="input-helper"></i></label>
                    </div>
                    <div class="align-self-center flex-grow-1">
                        <del>{{ todo.text}}</del>
                    </div>
                    <div class="align-self-center">
                        {{ todo.dueDate.substring(0, 10) }}
                    </div>
                    <div class="align-self-center">
                        <button @click="deleteTodoBtnClicked(todo.id, todo.projectNo)" class="btn"><i class="fas fa-trash"></i></button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import DateUtil from '../utils/date-util.js'
    import DatePicker from './VDatePicker.vue'
    import { ko } from 'vuejs-datepicker/dist/locale'
    import VueDatePicker from 'vuejs-datepicker'
    import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
    export default {
        components: {
            DatePicker,
            VueDatePicker,
            FontAwesomeIcon,
        },
        props: ['project-index', 'projects'],
        data: function() {
            return {
                newTodo: {
                    id: 0,
                    text: '',
                    completed: false,
                    projectNo: 0,
                    dueDate: new Date()
                },
                showTodoFormError: false,
                errors: [],
                ko: ko,
            }
        },
        name: "Project",
        computed: {
            todos: function() {
                return this.projects[this.projectIndex].todos.filter(todo => !todo.completed)
            },
            doneTodos: function() {
                return this.projects[this.projectIndex].todos.filter(todo => todo.completed)
            }
        },
        methods: {
            addTodoButtonClicked: async function() {
                this.errors = []
                if (!this.newTodo.text) {
                    this.errors.push('할 일을 입력하세요.')
                }
                if (!this.newTodo.dueDate) {
                    this.errors.push('마감일을 설정하세요.')
                }

                if (this.errors.length == 0) {
                    this.showTodoFormError = false
                    let todo = {}
                    todo.projectNo = this.projects[this.projectIndex].projectNo
                    todo.text = this.newTodo.text
                    todo.completed = false
                    console.log(`new todo due date: ${this.newTodo.dueDate}`)
                    console.log(`new todo due date time stamp: ${DateUtil.getTimeStampString(this.newTodo.dueDate)}`)
                    todo.dueDate = DateUtil.getTimeStampString(this.newTodo.dueDate)
                    this.$emit('new-todo-added', todo)
                    this.clearNewTodoObject()
                } else {
                    this.showTodoFormError = true
                }
            },
            modifyTodoBtnClicked: function(todo) {
                let todoToBeModified = {}
                todoToBeModified.text = todo.text
                todoToBeModified.id = todo.id
                todoToBeModified.dueDate = todo.dueDate
                todoToBeModified.projectNo = todo.projectNo
                todoToBeModified.projects = this.projects
                todoToBeModified.previousProjectNo = todo.projectNo
                this.$emit('modify-todo-modal-show', todoToBeModified)
            },
            deleteTodoBtnClicked: async function(todoId, projectNo) {
                this.$emit('todo-deleted', todoId, projectNo)
            },
            dateUpdated: function(date, todoId, projectNo) {
                this.$emit('todo-due-date-modified', date, todoId, projectNo)
            },
            checkboxChanged: function(todoId, projectNo) {
                this.$emit('checkbox-changed', todoId, projectNo)
            },
            trashCanClicked: function(todoId, projectNo) {
                this.$emit('trash-can-clicked', todoId, projectNo)
            },
            clearNewTodoObject: function() {
                this.newTodo.id = 0
                this.newTodo.text = ''
                this.newTodo.completed = false
                this.newTodo.projectNo = 0
                this.newTodo.dueDate = new Date()
            }
        }
    }
</script>

<style scoped>

</style>
