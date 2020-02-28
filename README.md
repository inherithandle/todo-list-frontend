# To-do list Application in Vue.js
![](src/docs/pics/todo-list-page.png)
Vue.js로 작성한 to-do list app입니다. backend server의 REST API를 호출하여 유저가 기록한 Todo를 backend DB에 기록합니다. 

### 실행 방법
동작 확인을 위해 백엔드 서버 없이 프론트엔드 단독으로 실행 가능합니다. Todo를 영구 저장하는 기능, 구글 로그인 기능, 회원가입 기능은 동작하지 않습니다.
이 기능들을 테스트하려면 백엔드 서버와 연동해야 합니다.
```
npm install
npm run build:local
npm run start:local

로그인할 때,
ID : tiger
password : letmein123
```

### backend와 연동하기 
localhost:8181에 백엔드 서버를 가동하고 `npm run start:dev`로 실행하면, 백엔드와 연동할 수 있습니다. 백엔드 서버를 가동하고 싶다면,
[https://github.com/inherithandle/todo-list-backend](https://github.com/inherithandle/todo-list-backend)
를 참고해주세요. 다른 포트로 접속하고 싶다면, `api-dev.js`에서 axios instance의 baseURL을 수정해주세요.
```javascript
// api-dev.js
const apiClient = axios.create({
  baseURL: 'http://localhost:8181', // 여기를 수정하세요.
  timeout: 1000,
  withCredentials: true
});
```

### Stack
- NPM && Webpack (Tooling)
- Vue.js
- Spring Framework
- JPA, Hibernate
- MariaDB
- this app hosted by Amazon S3
- backend server hosted by Amazon EC2

### 추가할 것들
- [ ] HTTPS
- [ ] Amazon S3에 도메인 연결
