export default {
    DAYS: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    MONTHS: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    isBetween: function(value, leftValue, rightValue) {
        // the parameters value, leftValue, rightValue are all of the Date type.
        // check if leftValue <= value <= rightValue.
        if (!(value instanceof Date) || !(leftVvalue instanceof Date) || !(rightValue instanceof Date)) {
            return false;
        }
        return value.getTime() >= leftValue.getTime() && value.getTime() <= rightValue.getTime();
    },
    isToday: function(dateStr) {
        // check the yyyy-mm-dd regular expression matches dateStr.
        let input = new Date(dateStr)
        let now = new Date()
        now = this.deleteTime(now)
        return input.getTime() <= now.getTime()
    },
    isInDays(dateStr, day) {
        let input = new Date(dateStr)
        let due = this.getDateAfter(day)
        return input.getTime() <= due.getTime()
    },
    getDateAfter: function(days) {
        if (days <= 0) {
            throw new Error("the parameter days is invalid.")
        }

        let now = new Date()
        return new Date(now.getTime() + 86400000 * days)
    },
    deleteTime: function(date) {
        if (!(date instanceof Date)) {
            throw Error("the parameter date should be Date type")
        }

        date.setUTCHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        return date
    },
    getNowString: function() {
        let now = new Date()
        return [
            now.getFullYear(),
            (now.getMonth()+1).toString().padStart(2, '0'), // getMonth() is zero-based
            now.getDate().toString().padStart(2, '0')
        ].join('-');
    }

}