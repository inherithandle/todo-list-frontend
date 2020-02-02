import assert from 'assert'

describe('regular expression', function() {

    it('첫글자 숫자, 한글 아님', function() {
        // {7, 15} -> 에러, quantifier에 절대 space를 넣지 말라.
        let regExpForID = /^[A-Za-z][A-Za-z0-9]{7,15}$/;
        assert.equal(regExpForID.test('inherithandle'), true)
        assert.equal(regExpForID.test('0nherithandle'), false)
        assert.equal(regExpForID.test('inherithandleaaaaaaa'), false)
        assert.equal(regExpForID.test('in'), false)
    })

    it('string contains:', function() {
        let string = "foo", substring = "oo", substring2 = "cba";

        assert.equal(string.indexOf(substring) != -1, true); // found
        assert.equal(string.indexOf(substring2) == -1, true); // not found
    })

    it('test against empty array', function() {
        let emptyArray = []
        console.log(emptyArray)
        // 정상 동작.
    })

    it('test against empty array', function() {
        let undefinedValue
        let nullValue = null
        assert.equal(!undefinedValue, true)
        assert.equal(!nullValue, true)
    })

    it('null test', function() {
        const vUndefined = undefined
        const vNull = null
        const vInteger = 1
        const vString = 'hello world'

        assert.equal(!vUndefined, true)
        assert.equal(!vNull, true)
        assert.equal(!vInteger, false)
        assert.equal(!vString, false)
    })

})