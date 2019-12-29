<template>
    <div class="modal fade" :id="modalId" tabindex="-1" role="dialog" :aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" :id="modalLabel">새로운 프로젝트를 추가하세요.</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
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
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
                    <button type="button" class="btn btn-primary" v-on:click="addProjectBtnClicked">프로젝트 추가</button>
                </div>
            </div>
        </div>
    </div>
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
            addProjectBtnClicked: async function() {
                this.errors = []
                if (!this.projectName) {
                    this.errors.push("프로젝트 이름을 입력하세요.")
                }

                let project = {}
                project.projectName = this.projectName
                project.todos = []

                if (this.errors.length == 0) {
                    this.projectName = ''
                    this.$eventHub.$emit('add-project-modal-submitted', project);
                    $(`#${this.modalId}`).modal('toggle')
                }
            }
        }
    }
</script>

<style scoped>

</style>