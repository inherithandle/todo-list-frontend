<template>
    <div class="row">
        <Sidebar
        ref="sidebar"
        v-on:summary-clicked="summaryClicked"
        v-on:project-clicked="projectClicked"
        v-on:project-deleted="projectDeleted"
        v-bind:projects="projects"
        v-bind:num-of-today-summary="todaySummary.numOfTodos"
        v-bind:num-of-week-summary="weekSummary.numOfTodos"
        v-bind:num-of-later-summary="laterSummary.numOfTodos"
        ></Sidebar>
        <main role="main" class="col-md-10 ml-sm-auto px-4">
            <router-view
            v-bind:projects="projects"
            v-on:new-todo-added="newTodoAdded"
            v-on:modify-todo-modal-show="modifyTodoBtnClicked"
            v-on:todo-deleted="todoDeleted"
            v-on:todo-due-date-modified="dateUpdated"
            v-on:checkbox-changed="checkboxChanged"
            ></router-view>
        </main>
    </div>
</template>

<script>
import Sidebar from './Sidebar.vue'
import DatePicker from './DatePicker.vue'
import DateUtil from '../js/date-util.js'
import UrlUtil from '../js/url-util.js'
import Cookies from 'js-cookie'

const PROJECT_NOT_SELECTED = -1
export default {
    data: function() {
        return {
            currentScreen: {
                title: '오늘',
                isSummaryClicked: true,
                summaryIndex: 0
            },
            newTodo: {
                id: 0,
                text: '',
                completed: false,
                projectNo: 0,
                dueDate: DateUtil.getNowString()
            },
            showTodoFormError: false,
            errors: [],
            projects: {},
            currentIndex: PROJECT_NOT_SELECTED
        }
    },
    computed: {
        todaySummary: function() {
            let summary = {}
            summary.projects = []
            summary.numOfTodos = 0

            if (typeof this.projects[0] == 'undefined') {
                return summary
            }

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
        }

    },
    created: async function() {
        let googleCode = UrlUtil.getParameterByName('code')
        if (googleCode != null) {
            await this.processGoogleAuthorizationCode(googleCode)
        }

        let accessToken = Cookies.get('access-token')
        console.log(`access-token: ${accessToken}`)
        let response = await this.$api.isValidAccessToken(accessToken)
        if (response.data.login) {
            this.$store.commit({
                type: 'login',
                userId: response.data.userId,
                login: response.data.login
            })
            let projectResponse = await this.$api.getProjects()
            this.projects = projectResponse.data
            console.dir(this.projects)
        } else {
            console.log('not signed in.')
            this.$router.push('/signin')
        }

        this.$eventHub.$on('add-project-modal-submitted', this.addProject);
        this.$eventHub.$on('modify-project-modal-submitted', this.modifyTodo);
    },
    beforeDestroy() {
        this.$eventHub.$off('add-project-modal-submitted');
        this.$eventHub.$off('modify-project-modal-submitted');
    },
    beforeCreate: async function() {

    },
    mounted: function() {
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
            this.$router.push({
                name: 'project',
                query: {
                    projectIndex: index
                }
            })
        },
        dateUpdated: async function(date, todoId, projectNo) {
            let todo = this.getTodoByProjectNoAndTodoId(todoId, projectNo);
            let previousDate = todo.dueDate
            todo.dueDate = date
            try {
                console.log(`due date : ${todo.dueDate}`)
                await this.$api.modifyTodo(todo)
            } catch (error) {
                console.log(error)
                todo.dueDate = previousDate // rollback to the previous date.
            }
        },
        newTodoAdded: async function(todo) {
            let response = await this.$api.addTodo(todo)
            todo.id = response.data.id

            let project = this.getProjectByProjectNo(todo.projectNo)
            project.todos.push(todo)
        },
        addProject: async function(project) {
            let response = await this.$api.addProject(project)
            if (response.data.projectNo > 0) {
                project.projectNo = response.data.projectNo
                this.projects.push(project)
            }
        },
        modifyTodo: async function(todoToBe) {
            let todo = this.getTodoByProjectNoAndTodoId(todoToBe.id, todoToBe.previousProjectNo)

            if (this.isTodoChanged(todo, todoToBe)) {
                if (todo.projectNo != todoToBe.projectNo) {
                    let project = this.getProjectByProjectNo(todo.projectNo)
                    let projectToBe = this.getProjectByProjectNo(todoToBe.projectNo)

                    // delete todo from project
                    let index = project.todos.findIndex(t => t.id == todo.id)
                    project.todos.splice(index, 1)

                    // push todo to projectToBe
                    projectToBe.todos.push(todo)
                    todo.projectNo = todoToBe.projectNo

                    let projectIndex = this.projects.findIndex(p => p.projectNo == projectToBe.projectNo)
                    this.$refs.sidebar.projectClicked(projectIndex, projectToBe.projectName)
                }

                todo.dueDate = todoToBe.dueDate
                todo.text = todoToBe.text
                await this.$api.modifyTodo(todoToBe)
            }

        },
        todoDeleted: async function(todoId, projectNo) {
            let todo = {}
            todo.id = todoId
            todo.projectNo = projectNo
            await this.$api.deleteTodo(todo)

            let project = this.getProjectByProjectNo(projectNo)
            let todoIndex = project.todos.findIndex(t => t.id == todoId)
            project.todos.splice(todoIndex, 1)
        },
        modifyTodoBtnClicked: function(todoTobeModified) {
            this.$emit('modify-todo-modal-show', todoTobeModified)
        },
        checkboxChanged: async function(todoId, projectNo) {
            let todo = this.getTodoByProjectNoAndTodoId(todoId, projectNo);
            try {
                await this.$api.modifyTodo(todo)
            } catch (error) {
                todo.completed = !todo.completed
            }
        },
        getProjectByProjectNo: function(projectNo) {
            let project = this.projects.find(p => p.projectNo == projectNo)
            if (project === undefined) {
                throw Error(`no such project with projectNo ${projectNo}`)
            }
            return project
        },
        getTodoByProjectNoAndTodoId: function(todoId, projectNo) {
            let todo = this.getProjectByProjectNo(projectNo).todos.find(t => t.id == todoId)
            if (todo === undefined) {
                throw Error(`no such todo with todoId ${todoId}`)
            }
            return todo
        },
        isTodoChanged: function(todo, todoToBe) {
            if (todo.dueDate != todoToBe.dueDate)
                return true
            else if (todo.text != todoToBe.text)
                return true
            else if (todo.projectNo != todoToBe.projectNo)
                return true
            return false
        },
        projectDeleted: async function(projectNo) {
            if (window.confirm("Are you sure to delete this project?")) {
                await this.$api.deleteProject(projectNo)
                let projectIndex = this.projects.findIndex(p => p.projectNo == projectNo)
                this.projects.splice(projectIndex, 1)
            }
        },
        processGoogleAuthorizationCode: async function(code) {
            let response = await this.$api.signinWithGoogle(code)
            if (response.data.login) {
                Cookies.set('access-token', response.data.accessToken)
            }
        }
    }
}
</script>

<style lang="scss">

</style>