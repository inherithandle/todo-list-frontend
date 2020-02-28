import axios from 'axios'



const getAuthorizationHeader = function() {
  let accessToken = sessionStorage.getItem('access-token');
  if (!accessToken) {
    window.location.replace = '/signin'
  }
  return {
    Authorization: `Bearer ${accessToken}`,
  }
}

const apiClient = axios.create({
  baseURL: 'http://localhost:8181',
  timeout: 1000,
  withCredentials: true
});

apiClient.interceptors.request.use(request => {
  console.log('Starting Request', request)
  return request
})

apiClient.interceptors.response.use(response => {
  console.log('Response:', response)
  return response
})

export default {
  POST_CONFIG: {
    headers: {
    },
    withCredentials: true
  },
  defaultErrorMessageConfig: {
    loginRequiredMessage: '서버와의 세션이 종료되었습니다. 로그인이 필요합니다.',
    errorMessage4XX: '프론트엔드 에러로 인해 REST API를 수행할 수 없습니다.',
    errorMessage5XX: 'API 서버의 에러로 인해 REST API를 수행할 수 없습니다.',
    unknownErrorMessage: '서버에 연결할 수 없습니다.',
    alertNeeded: true
  },
  errorHandler: function(error, config) {
    if (config === undefined) {
      config = this.defaultErrorMessageConfig
    }

    if (error.response === undefined) {
      alert('Could not connect to the backend server.')
      throw error
    }

    if (error.response.status == 401) {
      error.message = config.loginRequiredMessage
      if (config.alertNeeded) {
        alert(config.loginRequiredMessage)
      }
      throw error
    }

    if (error.response.status >= 400 && error.response.status <= 499) {
      error.message = config.errorMessage4XX
      if (config.alertNeeded) {
        alert(config.errorMessage4XX)
      }
    } else if (error.response.status >= 500 && error.response.status <= 599) {
      error.message = config.errorMessage5XX
      if (config.alertNeeded) {
        alert(config.errorMessage5XX)
      }
    } else {
      error.message = config.errorMessage5XX
    }
    throw error
  },
  getProjects: function(errorMessageConfig, config) {
    errorMessageConfig = errorMessageConfig || {
      loginRequiredMessage: '서버와의 세션이 종료되었습니다. 로그인이 필요합니다.',
      errorMessage4XX: '프론트엔드 에러로 인해 프로젝트를 로드할 수 없습니다.',
      errorMessage5XX: 'API 서버의 에러로 인해 프로젝트를 로드할 수 없습니다.',
      unknownErrorMessage: '서버에 연결할 수 없습니다.',
      alertNeeded: true
    }

    config = config || this.POST_CONFIG
    config.headers = getAuthorizationHeader()

    return apiClient.get('/projects', config).catch(e => {
      this.errorHandler(e, errorMessageConfig)
    })
  },
  deleteTodo: function(todo, errorMessageConfig) {
    errorMessageConfig = errorMessageConfig || {
      loginRequiredMessage: '서버와의 세션이 종료되었습니다. 로그인이 필요합니다.',
      errorMessage4XX: '프론트엔드 에러로 인해 Todo를 삭제할 수 없습니다.',
      errorMessage5XX: 'API 서버의 에러로 인해 Todo를 삭제할 수 없습니다.',
      unknownErrorMessage: '서버에 연결할 수 없습니다.',
      alertNeeded: true
    }

    let config = {}
    config.headers = getAuthorizationHeader()
    return apiClient.delete('/todo?id=' + todo.id, config).catch(e => {
      this.errorHandler(e, errorMessageConfig)
    })
  },
  modifyTodo: function(todo, errorMessageConfig) {
    errorMessageConfig = errorMessageConfig || {
      loginRequiredMessage: '서버와의 세션이 종료되었습니다. 로그인이 필요합니다.',
      errorMessage4XX: '프론트엔드 에러로 인해 Todo를 수정할 수 없습니다.',
      errorMessage5XX: 'API 서버의 에러로 인해 Todo를 수정할 수 없습니다.',
      unknownErrorMessage: '서버에 연결할 수 없습니다.',
      alertNeeded: true
    }

    let config = {}
    config.headers = getAuthorizationHeader()
    return apiClient.put('/todo', todo, config).catch(e => {
      this.errorHandler(e, errorMessageConfig)
    })
  },
  addTodo: function(todo, errorMessageConfig) {
    errorMessageConfig = errorMessageConfig || {
      loginRequiredMessage: '서버와의 세션이 종료되었습니다. 로그인이 필요합니다.',
      errorMessage4XX: '프론트엔드 에러로 인해 Todo를 추가할 수 없습니다.',
      errorMessage5XX: 'API 서버의 에러로 인해 Todo를 추가할 수 없습니다.',
      unknownErrorMessage: '서버에 연결할 수 없습니다.',
      alertNeeded: true
    }

    let config = {}
    config.headers = getAuthorizationHeader()
    return apiClient.post('/todo', todo, config).catch(e => {
      this.errorHandler(e, errorMessageConfig)
    })
  },
  addProject: function(project, errorMessageConfig) {
    errorMessageConfig = errorMessageConfig || {
      loginRequiredMessage: '서버와의 세션이 종료되었습니다. 로그인이 필요합니다.',
      errorMessage4XX: '프론트엔드 에러로 인해 프로젝트를 추가할 수 없습니다.',
      errorMessage5XX: 'API 서버의 에러로 인해 프로젝트를 추가할 수 없습니다.',
      unknownErrorMessage: '서버에 연결할 수 없습니다.',
      alertNeeded: true
    }

    let config = {}
    config.headers = getAuthorizationHeader()
    return apiClient.post('/project', project, config).catch(e => {
      this.errorHandler(e, errorMessageConfig)
    })
  },
  deleteProject: function(projectNo, errorMessageConfig) {
    errorMessageConfig = errorMessageConfig || {
      loginRequiredMessage: '서버와의 세션이 종료되었습니다. 로그인이 필요합니다.',
      errorMessage4XX: '프론트엔드 에러로 인해 프로젝트를 삭제할 수 없습니다.',
      errorMessage5XX: 'API 서버의 에러로 인해 프로젝트를 삭제할 수 없습니다.',
      unknownErrorMessage: 'API 서버와 연결할 수 없습니다.',
      alertNeeded: true
    }

    let config = {}
    config.headers = getAuthorizationHeader()
    return apiClient.delete('/project?projectNo=' + projectNo, config).catch(e => {
      this.errorHandler(e, errorMessageConfig)
    })
  },
  modifyProject: function(project, errorMessageConfig) {
    errorMessageConfig = errorMessageConfig || {
      loginRequiredMessage: '서버와의 세션이 종료되었습니다. 로그인이 필요합니다.',
      errorMessage4XX: '프론트엔드 에러로 인해 프로젝트를 수정할 수 없습니다.',
      errorMessage5XX: 'API 서버의 에러로 인해 프로젝트를 수정할 수 없습니다.',
      unknownErrorMessage: 'API 서버와 연결할 수 없습니다.',
      alertNeeded: true
    }

    let config = {}
    config.headers = getAuthorizationHeader()
    return apiClient.put('/project', project, config).catch( e => {
      this.errorHandler(e, errorMessageConfig)
    })
  },
  login: function(userId, password) {
    let config = {
      loginRequiredMessage: '',
      errorMessage4XX: '프론트엔드 에러로 인해 로그인을 수행할 수 없습니다.',
      errorMessage5XX: 'API 서버의 에러로 인해 로그인을 수행할 수 없습니다.',
      unknownErrorMessage: '서버에 연결할 수 없습니다.',
      alertNeeded: true
    }
    let body = {}
    body.userId = userId
    body.password = password
    return apiClient.post('/login', body).catch(e => {
      if (e.response.status == 400) {
        e.response.data.login = false
        return e.response
      } else {
        this.errorHandler(e, config)
      }

    })
  },
  isValidAccessToken: async function(accessToken) {
    let notAuthorizedResponse = {}
    notAuthorizedResponse.data = {}
    notAuthorizedResponse.data.login = false

    if (!accessToken) {
      return notAuthorizedResponse
    }
    let config = this.defaultErrorMessageConfig
    config.headers = getAuthorizationHeader()
    return apiClient.get('/token', config).catch(error => {
      if (error.response.status == 401) {
        error.response.data.login = false
        return error.response
      } else {
        throw error
      }
    })
  },
  signinWithGoogle: async function(authCode) {
    const tokenType = 'GOOGLE'
    const API_NAME = '/login-with-third-party'

    if (!authCode) {
      let notAuthorizedResponse = {}
      notAuthorizedResponse.data = {}
      notAuthorizedResponse.data.login = false
      return notAuthorizedResponse
    } else {
      let body = {}
      body.authorizationCode = authCode
      body.tokenType = tokenType

      return apiClient.post(API_NAME, body).catch(error => {
        if (error.response.status == 401) {
          error.response.data.login = false
          return error.response
        } else {
          throw error
        }
      })
    }
  },
  isDuplicate: async function (userId) {
    const API_NAME = '/duplicate'

    return apiClient.get(API_NAME, {
      params: {
        userId: userId
      }
    })
  },
  signup: function (user) {
    const API_NAME = '/signup'
    return apiClient.post(API_NAME, user)
  },
  deleteToken: function (accessToken) {
    const API_NAME = '/token'
    const params = `?accessToken=${accessToken}`
    let config = this.defaultErrorMessageConfig
    config.headers = getAuthorizationHeader()
    return apiClient.delete(`${API_NAME}${params}`, config)
  }
}
