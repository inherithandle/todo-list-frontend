import assert from 'assert'
import Api from "../js/api-dev";

let POST_CONFIG = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
    withCredentials: true
}

describe('date-util-test', function() {

    it('get projects', async function() {

        POST_CONFIG.headers['access-token'] = '16d080b6-bb43-4536-bb92-5969a65f54b5'

        let response = await Api.getProjects(null, POST_CONFIG)

        console.log(JSON.stringify(response))

        // assert.equal(Api.generateTodoId(), 1)
        //
        // let projects = await Api.getProjects().data
        // assert.equal(Api.generateTodoId(), 6)
    })

})