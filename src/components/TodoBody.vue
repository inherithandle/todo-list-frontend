<template>
    <div class="row">
        <!-- sidebar -->
        <Sidebar></Sidebar>
        <main role="main" class="col-md-10 ml-sm-auto px-4">
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <h3>오늘</h3>
            </div>

            <div class="d-flex mb-3">
                <div class="mr-2 flex-grow-1">
                    <input type="text" class="form-control todo-list-input" placeholder="What do you need to do today?">
                </div>
                <div class="mr-2">
                    <button class="add btn btn-primary font-weight-bold todo-list-add-btn">마감일 설정하기</button>
                </div>
                <div class="mr-2">
                    <button class="add btn btn-primary font-weight-bold todo-list-add-btn">추가</button>
                </div>
            </div>

            <div class="card-body ml-5 mr-5">
                <h4 class="mb-4">해야할 일</h4>
                <ul class="d-flex flex-column border">
                    <li class="d-flex">
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="checkbox" type="checkbox"><i class="input-helper"></i></label>
                        </div>
                        <div class="align-self-center flex-grow-1">
                            For what reason would it be advisable.
                        </div>

                        <div class="align-self-center">
                            2019-12-10
                        </div>
                        <div class="align-self-center">
                            <button class="btn"><i class="fas fa-calendar-alt"></i></button>
                        </div>
                        <!-- X표시 -->
                        <div class="align-self-center">
                            <button class="btn"><i class="fas fa-trash"></i></button>
                        </div>
                    </li>

                    <li class="d-flex">
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="checkbox" type="checkbox"><i class="input-helper"></i></label>
                        </div>
                        <div class="align-self-center flex-grow-1">
                            Wash dishes
                        </div>
                        <div class="align-self-center">
                            2019-12-25
                        </div>
                        <div class="align-self-center">
                            <button class="btn"><i class="fas fa-calendar-alt"></i></button>
                        </div>
                        <!-- X표시 -->
                        <div class="align-self-center">
                            <button class="btn"><i class="fas fa-trash"></i></button>
                        </div>
                    </li>

                </ul>

                <h4 class="mt-4 mb-4">처리 완료</h4>
                <ul class="d-flex flex-column border">
                    <li class="d-flex">
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="checkbox" type="checkbox" checked="true"><i class="input-helper"></i></label>
                        </div>
                        <div class="align-self-center flex-grow-1">
                            <del>For what reason would it be advisable.</del>
                        </div>
                        <div class="align-self-center">
                            2019-12-10
                        </div>
                        <div class="align-self-center">
                            <button class="btn"><i class="fas fa-trash"></i></button>
                        </div>
                    </li>

                    <li class="d-flex">
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="checkbox" type="checkbox" checked="true"><i class="input-helper"></i></label>
                        </div>
                        <div class="align-self-center flex-grow-1">
                            <del>Wash dishes</del>
                        </div>
                        <div class="align-self-center">
                            2019-12-25
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
export default {
    components: {
        Sidebar
    }
}
</script>

<style lang="scss">

</style>