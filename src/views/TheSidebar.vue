<template>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
        <div class="sidebar-sticky">
            <ul class="nav flex-column">
                <li class="nav-item d-flex" v-on:click="summaryClicked(0, '오늘 할 일')">
                    <div class="align-self-center flex-grow-1">
                        <a class="nav-link" href="#" v-bind:class="{ active: summary.active == 0 }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                            <span data-feather="home"></span>
                            오늘 할 일<span class="sr-only">(current)</span>
                        </a>
                    </div>
                    <div class="align-self-center mr-3">
                        {{ numOfTodaySummary }}
                    </div>
                </li>
                <li class="nav-item d-flex" v-on:click="summaryClicked(1, '이번 주 할 일')">
                    <div class="align-self-center flex-grow-1">
                        <a class="nav-link" href="#" v-bind:class="{ active: summary.active == 1 }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                            <span data-feather="file"></span>
                            이번 주 할 일
                        </a>
                    </div>
                    <div class="align-self-center mr-3">
                        {{ numOfWeekSummary }}
                    </div>
                </li>
                <li class="nav-item d-flex" v-on:click="summaryClicked(2, '나중에 할 일')">
                    <div class="align-self-center flex-grow-1">
                        <a class="nav-link" href="#" v-bind:class="{ active: summary.active == 2 }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            <span data-feather="shopping-cart"></span>
                            나중에 할 일
                        </a>
                    </div>
                    <div class="align-self-center mr-3">
                        {{ numOfLaterSummary }}
                    </div>
                </li>
            </ul>

            <!-- a list of projects -->
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                Projects
            </h6>
            <ul class="nav flex-column mb-2">
                <li v-for="(project, index) in projects" v-bind:key="project.projectNo" class="nav-item d-flex" v-on:click="projectClicked(index, project.projectName)">
                    <div class="align-self-center flex-grow-1">
                        <a class="nav-link" :class="{ active: index === activeProject }" href="#">
                            <span data-feather="file-text"></span>
                            {{ project.projectName }}
                        </a>
                    </div>
                    <div class="align-self-center">
                        {{ project.todos.filter(t => !t.completed).length }}
                    </div>
                    <div class="align-self-center">
                        <button class="btn" @click.stop="projectDeleted(project.projectNo)">
                            <FontAwesomeIcon icon="trash"></FontAwesomeIcon>
                        </button>
                    </div>
                </li>
            </ul>
            <div>
                <b-button class="ml-3" v-b-modal.add-project-modal>프로젝트 추가하기</b-button>
            </div>
        </div>
    </nav>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
const NOT_SELECTED = -1
export default {
    props: ['projects', 'numOfTodaySummary', 'numOfWeekSummary', 'numOfLaterSummary'],
    data: function() {
        return {
            activeProject: -1,
            summary : {
                active: 0
            }
        }
    },
    components: {
        FontAwesomeIcon,
    },
    methods: {
        summaryClicked: function(index, labelForSummary) {
            // this statement prevent duplicate navigation
            if (this.summary.active == index) {
                return ;
            }

            this.activeProject = NOT_SELECTED
            this.summary.active = index
            // this.$emit('summary-clicked', labelForSummary, index)
            this.$router.push({
                name: 'summary',
                query: {
                    summaryIndex: index
                }
            })

        },
        projectClicked: function(index, projectName) {
            this.summary.active = NOT_SELECTED
            this.activeProject = index
            this.$emit('project-clicked', projectName, index)
        },
        projectDeleted: function(projectNo) {
            this.$emit(`project-deleted`, projectNo)

        }
    }
}
</script>

<style lang="scss">

</style>
