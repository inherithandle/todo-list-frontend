import DateUtil from '../utils/date-util.js'
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

    it('is today test', function() {
        let today = new Date()
        let todayStr = DateUtil.getDateString(today)
        assert.equal(DateUtil.isToday(todayStr), true)
        assert.equal(DateUtil.isToday(todayStr), true)
        assert.equal(DateUtil.isToday('2019-12-24'), true)
        assert.equal(DateUtil.isToday('2020-02-06'), false)
    })

    it('within week', function() {
        assert.equal(DateUtil.isInDays('2019-12-31', 7), false)
    })

    it('get YYYY-mm-dd string', function() {
        let date = new Date(2019, 0, 1)
        assert.equal(DateUtil.getDateString(date), '2019-01-01')
    })

    it('parseint leading zero test', function() {
        assert.equal(parseInt('0123'), 123)
    })
    //getDateFromString

    it('getDateFromString', function() {
        let date = DateUtil.getDateFromString('2020-01-01')
        assert.equal(date.getFullYear(), 2020)
        assert.equal(date.getMonth(), 0)
        assert.equal(date.getDate(), 1)
    })

    it('date format reexp test', function() {
        assert.equal(/\d\d\d\d\-\d\d\-\d\d/.test('2019-01-01'), true)
        assert.equal(/\d\d\d\d\-\d\d\-\d\d/.test('2019-12-31'), true)
        assert.equal(/\d\d\d\d\-\d\d\-\d\d/.test('2019-12-35'), true)
        assert.equal(/\d\d\d\d\-\d\d\-\d\d/.test('19-01-01'), false)
        assert.equal(/\d\d\d\d\-\d\d\-\d\d/.test('2019-1-1'), false)
    })



})