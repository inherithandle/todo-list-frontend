import Signin from '../components/Signin.vue'
import Signup from '../components/Signup.vue'
import TodoBody from "../components/TodoBody.vue";
import SearchResult from '../components/SearchResult.vue'
import Summary from '../components/Summary.vue'
import Project from '../components/Project.vue'
import GoogleSigninCallback from "../components/GoogleSigninCallback.vue";
import Response404 from '../components/Response404.vue'

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