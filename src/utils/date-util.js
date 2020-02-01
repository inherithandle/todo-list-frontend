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
        input = this.deleteTime(input)

        return input.getTime() <= now.getTime()
    },
    isInDays(dateStr, day) {
        let now = new Date()
        now = this.deleteTime(now)

        let input = new Date(dateStr)
        let due = this.getDateAfter(day)
        due = this.deleteTime(due)

        return now.getTime() <= input.getTime() && input.getTime() <= due.getTime()
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
        return this.getDateString(now);
    },
    getNowTimeStampString: function() {
        return this.getNowString() + 'T23:59:59.99'
    },
    getDateString: function(date) {
        return [
            date.getFullYear(),
            (date.getMonth()+1).toString().padStart(2, '0'), // getMonth() is zero-based
            date.getDate().toString().padStart(2, '0')
        ].join('-');
    },
    getDateFromString: function(str) {
        if (!/\d\d\d\d\-\d\d\-\d\d/.test(str)) {
            throw Error('the 1st parameter is invalid.')
        }

        let year = parseInt(str.substring(0,4));
        let month = parseInt(str.substring(5,7));
        let day = parseInt(str.substring(8,10));

        if(month >= 13 && day >= 32) {
            throw Error('string format mm or dd is invalid.')
        }

        return new Date(year, month - 1, day);
    }

}