import PROJECTS from './projects.json'

export default {
  numOfProjects: PROJECTS.length,
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
  projects: null,
  LOCAL_FAKE_ACCESS_TOKEN: 'abc',
  getProjects: function() {
    if (this.projects == null) {
      this.projects = JSON.parse(JSON.stringify(PROJECTS))
    }
    let deepCopiedProjects = JSON.parse(JSON.stringify(this.projects))
    let response = {}
    response.data = deepCopiedProjects
    return response
  },
  deleteTodo: async function(todoObj) {
    let project = this.projects.filter(p => p.projectNo == todoObj.projectNo)[0]
    let todoIndex = project.todos.findIndex(t => t.id ==todoObj.id)
    project.todos.splice(todoIndex, 1)
    return {}
  },
  modifyTodo: async function(todoObj) {
    let todo
    if (todoObj.previousProjectNo === undefined) {
      todo = this.getTodoByProjectNoAndTodoId(todoObj.id, todoObj.projectNo);
    } else {
      this.getTodoByProjectNoAndTodoId(todoObj.id, todoObj.previousProjectNo);
    }

    todo.completed = todoObj.completed
    todo.text = todoObj.text
    todo.dueDate = todoObj.dueDate
    let response = {}
    return response
  },
  addTodo: async function(todoObj) {
    todoObj.id = this.generateTodoId()
    let project = this.projects.filter(p => p.projectNo == todoObj.projectNo)[0]
    project.todos.push(todoObj)
    let response = {}
    response.data = {}
    response.data.id = todoObj.id
    return response
  },
  generateTodoId: function() {
    // find the maximum value of all todos.
    // return the maximum value + 1
    if (!this.projects) {
      return 1
    }

    let maxId = this.projects.map(project => project.todos).flat(1)
                             .map(todo => todo.id)
                              .reduce((max, id) => max > id ? max : id, 0)
    return maxId + 1
  },
  addProject: async function(projectObj) {
    this.numOfProjects++
    let project = {}
    project.projectName = projectObj.projectName
    project.projectNo = this.numOfProjects
    project.todos = []
    this.projects.push(project)

    let response = {}
    response.data = projectObj
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
      response.data.accessToken = username
      response.data.userId = username
    } else {
      response.data.login = false;
    }

    return response
  },
  isValidAccessToken: async function() {
    // return sessionStorage.getItem('accessToken') && accessToken === sessionStorage.getItem('accessToken')
    let response = {}
    response.data = {}
    let accessToken = this.getCookie('access-token')
    let found = this.user.find(u => u.username == accessToken)

    if (found) {
      response.data.login = true
      response.data.message = 'success'
      response.data.userId = found.username
    } else {
      response.data.login = false
    }
    return response
  },
  isDuplicate: function (id) {
    let response  = {}
    response.data = {}

    if (id == 'joma' || id == 'mayuko') {
      response.data.isDuplicate = true
    } else {
      response.data.isDuplicate = false
    }
    return response
  },
  signup: function (user) {
    let userRow = {
      username: user.userId,
      password: user.password
    }
    this.user.push(userRow)

    let response = {}
    response.data = {}

    response.data.login = true;
    response.data.accessToken = user.userId
    response.data.userId = user.userId
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
  },
  getProjectByProjectNo: function(projectNo) {
    let project = this.projects.find(p => p.projectNo == projectNo)
    if (project === undefined) {
      throw Error(`no such project with projectNo ${projectNo}`)
    }
    return project
  },
  getTodoByProjectNoAndTodoId: function(todoId, projectNo) {
    let todo = this.getProjectByProjectNo(projectNo).todos.find(t => t.id == todoId)
    if (todo === undefined) {
      throw Error(`no such todo with todoId ${todoId}`)
    }
    return todo
  }
}
