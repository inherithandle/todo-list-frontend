import Api from '../js/api-local'
import assert from 'assert'

describe('date-util-test', function() {

    it('generateTodoId', async function() {
        assert.equal(Api.generateTodoId(), 1)

        let projects = await Api.getProjects().data
        assert.equal(Api.generateTodoId(), 6)
    })

    it('addTodo function', async function() {
        const PROJECT_NO = 1
        let todo = {
            id: 0,
            text: 'hello',
            completed: false,
            projectNo: PROJECT_NO,
            dueDate: '2019-12-25'
        }


        let projects = await Api.getProjects().data
        let response = await Api.addTodo(todo)
        assert.equal(response.data.id, 6)


        projects = await Api.getProjects().data
        assert.equal(projects[0].todos.length, 5)
        let todos = projects.filter(p => p.projectNo == PROJECT_NO)[0].todos
        let addedTodo = todos.filter(t => t.id == 6)[0]
        assert.equal(addedTodo.id, 6)
        assert.equal(addedTodo.text, 'hello')
        assert.equal(addedTodo.dueDate, '2019-12-25')
        assert.equal(todos.length, 5)

    })

    it('deleteTodo function', async function() {
        let todo = {
            id: 6,
            projectNo: 1
        }
        await Api.deleteTodo(todo)
        let projects = await Api.getProjects().data
        assert.equal(projects[0].todos.length, 4)
    })

    it('modifyTodo function', async function() {

        /*
        project.json,
        {
          "id": 2,
          "text": "wash my car",
          "completed": false,
          "projectNo": 1,
          "dueDate": "2019-12-24"
        }
        completed = true, wash my hand로, 2019-12-31로 수정합니다.
         */
        let projects = await Api.getProjects().data
        const modifiedText = "wash my hand"
        let todo = {
            "id": 2,
            "text": modifiedText,
            "completed": true,
            "projectNo": 1,
            "dueDate": "2019-12-31"
        }

        await Api.modifyTodo(todo)
        projects = await Api.getProjects().data
        let modifiedTodo = Api.getTodoByProjectNoAndTodoId(todo.id, todo.projectNo)

        assert.equal(modifiedTodo.completed, true)
        assert.equal(modifiedTodo.text, modifiedText)
        assert.equal(modifiedTodo.dueDate, "2019-12-31")
    })
})