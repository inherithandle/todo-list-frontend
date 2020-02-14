// TodoBody.vue router candidate
<template>
    <div>
        <div class="pt-3 pb-2 mb-3 border-bottom">
            <h3>{{ title }}</h3>
        </div>

        <b-alert class="flex-grow-1" variant="info" show>
            Sidebar에서 Project를 선택하면, 할 일을 추가할 수 있습니다.
        </b-alert>

        <div class="card-body ml-5 mr-5">
            <div v-for="project in summary.projects" v-bind:key="project.projectNo">
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
    import DatePicker from './VDatePicker.vue'
    import DateUtil from '../utils/date-util.js'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

    export default {
        name: "Summary",
        props: ['summary-index', 'projects'],
        components: {
            DatePicker,
            FontAwesomeIcon,
        },
        mounted: function() {
        },
        computed: {
            title: function() {
                if (this.summaryIndex == 1) {
                    return '이번주 할 일'
                } else if (this.summaryIndex == 2) {
                    return '나중에 할 일'
                } else  {
                    return '오늘'
                }
            },
            summary: function() {
                let lambda = this.getDateCriterion()
                let summary = {}
                summary.projects = []
                summary.numOfTodos = 0
                for (let i = 0; i < this.projects.length; i++) {
                    let project = {}
                    project.projectName = this.projects[i].projectName
                    project.todos = this.projects[i].todos.filter(lambda)

                    if (project.todos.length > 0) {
                        summary.projects.push(project)
                        summary.numOfTodos += project.todos.length
                    }
                }
                return summary
            }
        },
        methods: {
            getDateCriterion: function() {
                if (this.summaryIndex == 1) {
                    return todo => !todo.completed && DateUtil.isInDays(todo.dueDate, 7)
                }
                else if (this.summaryIndex == 2) {
                    return todo => !todo.completed && DateUtil.isInDays(todo.dueDate, 30)
                }
                else {
                    return todo => !todo.completed && DateUtil.isToday(todo.dueDate)
                }
            },
            checkboxChanged: function() {
                this.$emit('checkbox-changed', todoId, projectNo)
            },
            dateUpdated: function(date, todoId, projectNo) {
                this.$emit('todo-due-date-modified', date, todoId, projectNo)
            },
            deleteTodoBtnClicked: function(todoId, projectNo) {
                this.$emit('todo-deleted', todoId, projectNo)
            },
        }
    }
</script>

<style scoped>

</style>
