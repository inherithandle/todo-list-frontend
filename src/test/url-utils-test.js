import assert from 'assert'
import UrlUtil from '../js/url-util.js'


const EXPECTED_CODE = `4/vwGVVXCJh4xlNmqerbSV0LEc4EL_XofgyeUzp23rj5YTSihL4NNQOE2l4reB27KgNcMk2wuGhZbCEVWJSz7o6Zc`
const URL = `http://localhost:8080/html/index.html?code=4/vwGVVXCJh4xlNmqerbSV0LEc4EL_XofgyeUzp23rj5YTSihL4NNQOE2l4reB27KgNcMk2wuGhZbCEVWJSz7o6Zc&scope=email+openid+https://www.googleapis.com/auth/userinfo.email&authuser=0&prompt=none&session_state=e4d51e6088d840a21769686eaa5c4cf8421fb83c..0fd8#/`
const URL_WITHOUT_PARAMETERS = `http://localhost:8080/html/index.html`

describe('url-util test', function() {

    it('the code parameter exists', function() {
        let actualCode = UrlUtil.getParameterByName('code', URL)
        assert.equal(actualCode, EXPECTED_CODE)
    })

    it('the code parameter does not exists', function() {
        let actualCode = UrlUtil.getParameterByName('code', URL_WITHOUT_PARAMETERS)
        assert.equal(actualCode, null)
    })

})