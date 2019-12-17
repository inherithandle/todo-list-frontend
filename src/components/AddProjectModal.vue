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
                    <div class="form-group">
                        <label for="project-name">프로젝트 이름</label>
                        <input class="form-control" id="project-name" type="text">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
                    <button type="button" class="btn btn-primary" v-on:click="AddProjectBtnClicked">프로젝트 추가</button>
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
                modalLabel: this.modalId + 'Label'
            }
        },
        methods: {
            AddProjectBtnClicked: function() {
                // call api
                // emit project name to the parent.
            }
        }
    }
</script>

<style scoped>

</style>