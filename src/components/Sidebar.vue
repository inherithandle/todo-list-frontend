<template>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
        <div class="sidebar-sticky">
            <ul class="nav flex-column">
                <li class="nav-item d-flex">
                    <div class="align-self-center flex-grow-1">
                        <a class="nav-link active" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                            <span data-feather="home"></span>
                            오늘 할 일<span class="sr-only">(current)</span>
                        </a>
                    </div>
                    <div class="align-self-center mr-3">
                        {{ summary.numOfTodosToday }}
                    </div>
                </li>
                <li class="nav-item d-flex">
                    <div class="align-self-center flex-grow-1">
                        <a class="nav-link" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                            <span data-feather="file"></span>
                            이번 주 할 일
                        </a>
                    </div>
                    <div class="align-self-center mr-3">
                        {{ summary.numOfTodosThisWeek }}
                    </div>
                </li>
                <li class="nav-item d-flex">
                    <div class="align-self-center flex-grow-1">
                        <a class="nav-link" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            <span data-feather="shopping-cart"></span>
                            나중에 할 일
                        </a>
                    </div>
                    <div class="align-self-center mr-3">
                        {{ summary.numOfTodosLater }}
                    </div>
                </li>
            </ul>

            <!-- a list of projects -->
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                Projects
            </h6>
            <ul class="nav flex-column mb-2">
                <li v-for="project in projects" class="nav-item d-flex">
                    <div class="align-self-center flex-grow-1">
                        <a class="nav-link" href="#">
                            <span data-feather="file-text"></span>
                            {{ project.projectName }}
                        </a>
                    </div>
                    <div class="align-self-center mr-3">
                        {{ project.numOfTodos }}
                    </div>
                </li>
            </ul>
            <div>
                <button class="add btn btn-primary font-weight-bold todo-list-add-btn ml-3 ">프로젝트 추가</button>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data: function() {
        return {
            projects: [
                {
                    projectName: "Inbox",
                    projectId: 1,
                    numOfTodos: 7
                },
                {
                    projectName: "Bitcoin",
                    projectId: 2,
                    numOfTodos: 1
                },
                {
                    projectName: "Recreational Reading",
                    projectId: 3,
                    numOfTodos: 3
                },
                {
                    projectName: "Regular Expression",
                    projectId: 4,
                    numOfTodos: 5
                }
            ],
            summary : {
                numOfTodosToday : 3,
                numOfTodosThisWeek : 6,
                numOfTodosLater: 5
            }
        }
    }
}
</script>

<style lang="scss">

</style>