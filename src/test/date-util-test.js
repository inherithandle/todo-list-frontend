import DateUtil from '../js/date-util.js'
import assert from 'assert'

describe('date-util-test', function() {

    it('isToday', function() {
        let now = new Date()
        now = DateUtil.deleteTime(now)
        assert.equal(DateUtil.isToday(now), true)
    })

    it('notToday', function() {
        let notToday = '2019-10-14'
        let notToday2 = '2019-12-23'

        assert.equal(DateUtil.isToday(notToday), false)
        assert.equal(DateUtil.isToday(notToday2), false)
    })

    it('isIndays', function() {
        let input = '2020-01-01'
        // 2019-12-24에만 성공함.
        assert.equal(DateUtil.isInDays(input, 7), false)
        assert.equal(DateUtil.isInDays(input, 30), true)
    })

})