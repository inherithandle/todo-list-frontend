<template>
    <b-modal
        :id="modalId"
        @ok="addProjectBtnClicked"
        title="새로운 프로젝트를 추가하세요."
        ok-title="프로젝트 추가"
        cancel-title="닫기">

        <div class="mb-3 alert alert-danger" role="alert" v-if="errors.length">
            <ul>
                <li v-for="error in errors">
                    {{ error }}
                </li>
            </ul>
        </div>

        <div class="form-group">
            <label for="project-name">프로젝트 이름</label>
            <input class="form-control" id="project-name" v-model="projectName" type="text">
        </div>
    </b-modal>
</template>

<script>
    export default {
        name: "Modal",
        props: ['modal-id'],
        data: function() {
            return {
                modalLabel: this.modalId + 'Label',
                projectName: '',
                errors: []
            }
        },
        methods: {
            addProjectBtnClicked: async function(e) {
                this.errors = []
                if (!this.projectName) {
                    this.errors.push("프로젝트 이름을 입력하세요.")
                    e.preventDefault()
                }

                let project = {}
                project.projectName = this.projectName
                project.todos = []

                if (this.errors.length == 0) {
                    this.projectName = ''
                    this.$eventHub.$emit('add-project-modal-submitted', project);
                }
            }
        }
    }
</script>

<style scoped>

</style>