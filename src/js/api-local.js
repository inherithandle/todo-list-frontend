import projects from './projects.json'

export default {
  numOfProjects: 0,
  numOfTodos: 0,
  user: [
    {
      username: "mayuko",
      password: "ma"
    },
    {
      username: "joma",
      password: "jo"
    }
  ],
  LOCAL_FAKE_ACCESS_TOKEN: 'abc',
  getProjects: function() {
    let deepCopiedProjects = JSON.parse(JSON.stringify(projects))
    this.numOfProjects = deepCopiedProjects.length
    let response = {}
    response.data = deepCopiedProjects
    return response
  },
  deleteTodo: async function(todoObj) {
    return {}
  },
  modifyTodo: async function(todoObj) {
    return {}
  },
  addTodo: async function(todoObj) {
    this.numOfTodos++
    let response = {}
    response.data = {}
    response.data.id = this.numOfTodos
    return response
  },
  addProject: async function(projectObj) {
    this.numOfProjects++
    let response = {}
    response.data = {}
    response.data.projectNo = this.numOfProjects
    return response
  },
  deleteProject: async function(projectObj) {
    return {}
  },
  modifyProject: async function(projectObj) {
    let response = {}
    return response
  },
  login: async function(username, password) {
    let i = this.user.findIndex(e => {
      return e.username == username
    })

    let response = {}
    response.data = {}
    if (i >= 0 && this.user[i].password == password) {
      response.data.login = true;
      response.data.accessToken = this.LOCAL_FAKE_ACCESS_TOKEN
      response.data.userId = username
    } else {
      response.data.login = false;
    }

    return response
  },
  isValidAccessToken: async function(accessToken) {
    // return sessionStorage.getItem('accessToken') && accessToken === sessionStorage.getItem('accessToken')
    let response = {}
    response.data = {}
    //
    if (this.getCookie('access-token') == this.LOCAL_FAKE_ACCESS_TOKEN) {
      response.data.login = true
      response.data.message = 'success'
      response.data.userId = 'joma'
    } else {
      response.data.login = false
    }
    return response
  },
  getCookie: function (cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}
