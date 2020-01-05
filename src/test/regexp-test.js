
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

})