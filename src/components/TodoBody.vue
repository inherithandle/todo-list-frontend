<template>
    <div class="row">
        <!-- sidebar -->
        <Sidebar
        v-on:summary-clicked="summaryClicked"
        v-on:project-clicked="projectClicked"
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
w                    <DatePicker
                      v-on:update-date="dateUpdated"
                      picker-id="new-todo-datepicker"
                      input-type="button"
                    ></DatePicker>
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
                            <!-- TODO: v-for 사용해서 dateUpdated에게 인덱스를 넘겨줘야한다. -->
                            <DatePicker
                              v-on:update-date="dateUpdated"
                              picker-id="todo-datepicker-1"
                              input-type="icon"
                            ></DatePicker>
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
                            <DatePicker
                              v-on:update-date="dateUpdated"
                              picker-id="todo-datepicker-2"
                              input-type="icon"
                            ></DatePicker>
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
import DatePicker from './DatePicker.vue'
export default {
    data: function() {
        return {
            currentScreen: {
                title: '오늘'
            }
        }
    },
    components: {
        DatePicker,
        Sidebar
    },
    methods: {
        summaryClicked: function(labelForSummary) {
            this.currentScreen.title = labelForSummary
            // call rest api
        },
        projectClicked: function(label) {
            this.currentScreen.title = label
            // call rest api
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