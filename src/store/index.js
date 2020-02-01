import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // Vuex requires Promise. If your supporting browsers do not implement Promise (e.g. IE), you can use a polyfill library, such as es6-promise.

const store = new Vuex.Store({
    state: {
        user: {
            userId: 'userId-default-value',
            login: false
        },
        modalTodo: {
            projectNo: 0,
            text: '',
            id: 0,
            dueDate: '',
            projects: []
        }
    },
    mutations: {
        login (state, payload) {
            state.user.userId = payload.userId
            state.user.login = payload.login
        },
        modalTodo(state, payload) {
            state.modalTodo.projectNo = payload.projectNo
            state.modalTodo.text = payload.text
            state.modalTodo.id = payload.id
            state.modalTodo.dueDate = payload.dueDate
            state.modalTodo.projects = payload.projects
        }
    }
})

export default store;