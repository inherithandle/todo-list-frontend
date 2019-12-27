import DateUtil from '../js/date-util.js'
import assert from 'assert'

describe('date-util-test', function() {

    // TODO: new Date()하면 당일에만 성공해서, 다른방법을 생각해보자.
    // it('isToday', function() {
    //     let now = new Date()
    //     now = DateUtil.deleteTime(now)
    //     assert.equal(DateUtil.isToday(now), true)
    // })
    //
    // it('notToday', function() {
    //     let notToday = '2019-10-14'
    //     let notToday2 = '2019-12-23'
    //
    //     assert.equal(DateUtil.isToday(notToday), false)
    //     assert.equal(DateUtil.isToday(notToday2), false)
    // })
    //
    // it('isIndays', function() {
    //     let input = '2020-01-01'
    //     // 2019-12-24에만 성공함.
    //     assert.equal(DateUtil.isInDays(input, 7), false)
    //     assert.equal(DateUtil.isInDays(input, 30), true)
    // })

    it('get YYYY-mm-dd string', function() {
        let dateStr = DateUtil.getNowString()

        // 테스트할 때마다 expected값을 변경해줘야..
        assert.equal(DateUtil.getNowString(), '2019-12-25')

    })

})