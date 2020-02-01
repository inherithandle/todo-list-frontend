import Signin from '../views/TheSignin.vue'
import Signup from '../views/TheSignup.vue'
import TodoBody from "../views/TheTodoBody.vue";
import SearchResult from '../components/VTodoBodySearchResult.vue'
import Summary from '../components/VTodoBodySummary.vue'
import Project from '../components/VTodoBodyProject.vue'
import GoogleSigninCallback from "../views/TheGoogleSigninCallback.vue";
import Response404 from '../views/TheResponse404.vue'

const routes = [
    {
        path: '',
        name: 'body',
        component: TodoBody,
        children: [
            {
                path: 'search',
                name: 'search',
                component: SearchResult
            },
            {
                path: '',
                name: 'summary',
                component: Summary,
                props: (route) => ({
                    summaryIndex: route.query.summaryIndex,
                    code: route.query.code
                }),
            },
            {
                path: 'project',
                name: 'project',
                component: Project,
                props: (route) => ({
                    projectIndex: route.query.projectIndex
                }),
            }
        ]
    },
    {
        path: '/signin',
        name: 'signin',
        component: Signin,
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup,
    },
    {
        path: '/google-signin-callback',
        name: 'google-signin-callback',
        component: GoogleSigninCallback
    },
    {
        path: '/redirect-to-google',
        redirect: to => {
            let queryString = Object.keys(to.query).map(function(key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(to.query[key])
            }).join('&');
            window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${queryString}`
            return ''
        }
    },
    {
        path: '*',
        name: '404',
        component: Response404
    }
]

export default routes;