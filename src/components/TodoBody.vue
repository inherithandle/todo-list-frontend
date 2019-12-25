<template>
    <div class="row">
        <!-- sidebar -->
        <Sidebar
        v-on:summary-clicked="summaryClicked"
        v-on:project-clicked="projectClicked"
        v-bind:projects="projects"
        v-bind:num-of-today-summary="todaySummary.numOfTodos"
        v-bind:num-of-week-summary="weekSummary.numOfTodos"
        v-bind:num-of-later-summary="laterSummary.numOfTodos"
        ></Sidebar>
        <main role="main" class="col-md-10 ml-sm-auto px-4">
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <h3>{{ currentScreen.title }}</h3>
            </div>

            <div class="d-flex mb-3">
                <div class="mr-2 flex-grow-1">
                    <input type="text" class="form-control todo-list-input" placeholder="What do you need to do today?">
                </div>
                <div class="mr-2">
                    <DatePicker
                      v-on:update-date="dateUpdated"
                      picker-id="new-todo-datepicker"
                      input-type="button"
                    ></DatePicker>
                </div>
                <div class="mr-2">
                    <button class="add btn btn-primary font-weight-bold todo-list-add-btn">추가</button>
                </div>
            </div>

            <div class="card-body ml-5 mr-5" v-if="currentScreen.isSummaryClicked">
                <div v-for="project in currentSummary.projects">
                    <h4 class="mb-4">{{ project.projectName }}</h4>
                    <ul class="d-flex flex-column border">
                        <li v-for="(todo, index) in project.todos" class="d-flex">
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input class="checkbox" type="checkbox"><i class="input-helper"></i></label>
                            </div>
                            <div class="align-self-center flex-grow-1">
                                {{ todo.text }}
                            </div>
                            <div class="align-self-center">
                                2019-12-10
                            </div>
                            <div class="align-self-center">
                                <!-- TODO: v-for 사용해서 dateUpdated에게 인덱스를 넘겨줘야한다. -->
                                <DatePicker
                                        v-on:update-date="dateUpdated"
                                        v-bind:picker-id="'todo-datepicker-' + index"
                                        input-type="icon"
                                ></DatePicker>
                            </div>
                            <div class="align-self-center">
                                <button class="btn"><i class="fas fa-trash"></i></button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="card-body ml-5 mr-5" v-if="!currentScreen.isSummaryClicked">
                <h4 class="mb-4">해야할 일</h4>
                <ul class="d-flex flex-column border">
                    <li v-for="(todo, index) in todos" class="d-flex">
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="checkbox" type="checkbox"><i class="input-helper"></i></label>
                        </div>
                        <div class="align-self-center flex-grow-1">
                            {{ todo.text }}
                        </div>
                        <div class="align-self-center">
                            2019-12-10
                        </div>
                        <div class="align-self-center">
                            <!-- TODO: v-for 사용해서 dateUpdated에게 인덱스를 넘겨줘야한다. -->
                            <DatePicker
                                    v-on:update-date="dateUpdated"
                                    v-bind:picker-id="'todo-datepicker-' + index"
                                    input-type="icon"
                            ></DatePicker>
                        </div>
                        <div class="align-self-center">
                            <button class="btn"><i class="fas fa-trash"></i></button>
                        </div>
                    </li>
                </ul>

                <h4 class="mt-4 mb-4">처리 완료</h4>
                <ul class="d-flex flex-column border">
                    <li v-for="todo in doneTodos" class="d-flex">
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="checkbox" type="checkbox" checked="true"><i class="input-helper"></i></label>
                        </div>
                        <div class="align-self-center flex-grow-1">
                            <del>{{ todo.text}}</del>
                        </div>
                        <div class="align-self-center">
                            2019-12-10 <!-- TODO: local, backend due date 추가 -->
                        </div>
                        <div class="align-self-center">
                            <button class="btn"><i class="fas fa-trash"></i></button>
                        </div>
                    </li>
                </ul>
            </div>
        </main>
    </div>
</template>

<script>
import Sidebar from './Sidebar.vue'
import DatePicker from './DatePicker.vue'
import ApiFactory from '../js/api.js'
import DateUtil from '../js/date-util.js'

const PROJECT_NOT_SELECTED = -1
export default {
    data: function() {
        return {
            currentScreen: {
                title: '오늘',
                isSummaryClicked: true,
                summaryIndex: 0
            },
            api: null,
            projects: {},
            currentIndex: PROJECT_NOT_SELECTED
        }
    },
    computed: {
        todos: function() {
            if (this.currentIndex == PROJECT_NOT_SELECTED)
                return []
            return this.projects[this.currentIndex].todos.filter(todo => !todo.completed)
        },
        doneTodos: function() {
            if (this.currentIndex == PROJECT_NOT_SELECTED)
                return []
            return this.projects[this.currentIndex].todos.filter(todo => todo.completed)
        },
        todaySummary: function() {
            let summary = {}
            summary.projects = []
            summary.numOfTodos = 0

            for (let i = 0; i < this.projects.length; i++) {
                let project = {}
                project.projectName = this.projects[i].projectName
                project.todos = this.projects[i].todos.filter(todo => !todo.completed && DateUtil.isToday(todo.dueDate))

                if (project.todos.length > 0) {
                    summary.projects.push(project)
                    summary.numOfTodos += project.todos.length
                }
            }
            return summary

        },
        weekSummary: function() {
            let summary = {}
            summary.projects = []
            summary.numOfTodos = 0

            for (let i = 0; i < this.projects.length; i++) {
                let project = {}
                project.projectName = this.projects[i].projectName
                project.todos = this.projects[i].todos.filter(todo => !todo.completed && DateUtil.isInDays(todo.dueDate, 7))

                if (project.todos.length > 0) {
                    summary.projects.push(project)
                    summary.numOfTodos += project.todos.length
                }
            }
            return summary
        },
        laterSummary: function() {
            let summary = {}
            summary.projects = []
            summary.numOfTodos = 0

            for (let i = 0; i < this.projects.length; i++) {
                let project = {}
                project.projectName = this.projects[i].projectName
                project.todos = this.projects[i].todos.filter(todo => !todo.completed && DateUtil.isInDays(todo.dueDate, 30))

                if (project.todos.length > 0) {
                    summary.projects.push(project)
                    summary.numOfTodos += project.todos.length
                }
            }
            return summary
        },
        currentSummary: function() {
            if (this.currentScreen.summaryIndex == 0)
                return this.todaySummary
            else if (this.currentScreen.summaryIndex == 1)
                return this.weekSummary
            else if (this.currentScreen.summaryIndex == 2)
                return this.laterSummary
        }
    },
    mounted: async function() {
        this.api = await ApiFactory.getAPI()
        let response = await this.api.isValidAccessToken()
        if (response.data.login) {
            this.$store.commit({
                type: 'login',
                userId: response.data.userId,
                login: response.data.login
            })

            // get projects
            this.projects = await this.api.getProjects().data
            console.log('projects response')
            console.log(this.projects)
        } else {
            this.$router.push('/signin')
        }

    },
    components: {
        DatePicker,
        Sidebar
    },
    methods: {
        summaryClicked: function(labelForSummary, index) {
            this.currentScreen.title = labelForSummary
            this.currentScreen.isSummaryClicked = true
            this.currentScreen.summaryIndex = index
        },
        projectClicked: function(label, index) {
            this.currentScreen.title = label
            this.currentScreen.isSummaryClicked = false
            this.currentIndex = index
        },
        dateUpdated: function(d) {
            console.log('datepicker picked!')
            console.log(d)
        }
    }
}
</script>

<style lang="scss">

</style>