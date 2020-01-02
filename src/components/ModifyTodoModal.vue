<template>
    <b-modal
            :id="modalId"
            @ok="modifyTodoModalBtnClicked"
            title="수정"
            ok-title="수정하기"
            cancel-title="닫기">

        <div class="mb-3 alert alert-danger" role="alert" v-if="errors.length">
            <ul>
                <li v-for="error in errors">
                    {{ error }}
                </li>
            </ul>
        </div>

        <div class="form-group">
            <div class="mb-4">
                <label for="todo-text">Todo:</label>
                <input class="form-control" id="todo-text" v-model="todo.text" type="text">
            </div>
            <div class="my-4">
                <label>프로젝트:</label>
                <b-form-select
                        v-model="todo.projectNo"
                        :options="getProjectSelectBox"
                ></b-form-select>
            </div>

            <div class="my-4">
                <label>마감일:</label>
                <DatePicker
                        :initial-date="todo.dueDate"
                        v-on:update-date="datePickerUpdated"
                        picker-id="modify-todo-datepicker"
                        input-type="text"
                        input-class="form-control"
                ></DatePicker>
            </div>

        </div>
    </b-modal>
</template>

<script>
    import DatePicker from './DatePicker.vue'
    export default {
        name: "ModifyTodoModal",
        props: ['modal-id', 'todo', 'project-no'],
        computed: {
            getProjectSelectBox: function() {
                if (this.todo.projects === undefined) {
                    return []
                }

                return this.todo.projects.map(p => {
                    return {
                        text: p.projectName,
                        value: p.projectNo
                    }
                })
            }
        },
        data: function() {
            return {
                errors: []
            }
        },
        methods: {
            modifyTodoModalBtnClicked: function(e) {
                this.errors = []
                if (!this.todo.text) {
                    this.errors.push('할 일을 입력하세요.')
                    e.preventDefault()
                } else {
                    this.$eventHub.$emit('modify-project-modal-submitted', this.todo);
                }
            },
            datePickerUpdated: function(val) {
                this.todo.dueDate = val
            }
        },
        components: {
            DatePicker
        }
    }
</script>

<style scoped>

</style>