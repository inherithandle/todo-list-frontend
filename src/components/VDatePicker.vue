<template>
    <input type="text" class="datepicker" style="display:none;" :id="pickerId" readonly="readonly">
</template>

<script>
import DateUtil from '../utils/date-util.js'
export default {
    name: "DatePicker",
    props: ['picker-id', 'input-type', 'initial-date', 'input-class'],
    mounted: function() {
        const buttonIconHtml = '<i class="fas fa-calendar-alt"></i>'
        const buttonTextHtml = '마감일 설정하기'
        let self = this
        let option = {
            // buttonImageOnly: true,
            // buttonImage: "https://jqueryui.com/resources/demos/datepicker/images/calendar.gif",
            dateFormat: "yy-mm-dd",
            minDate: 0,
            onSelect: function (d) {
                self.$emit('update-date', d + 'T23:59:59.99')
            }
        }

        if (this.initialDate != null) {
            option.minDate = DateUtil.getDateFromString(this.initialDate)
        }

        let classStr
        if (this.inputType == 'icon') {
            option.showOn = 'button'
            option.buttonText = buttonIconHtml
            classStr = 'btn'
        } else if (this.inputType == 'button'){
            option.showOn = 'button'
            option.buttonText = buttonTextHtml
            classStr = 'add btn btn-primary font-weight-bold'
        } else if (this.inputType == 'text') {
            console.log('input type : text.')
            console.log(`picker ID : ${this.pickerId}`)
            $("#" + this.pickerId).show().addClass(this.inputClass)
        }


        $("#" + this.pickerId).datepicker(option).next('.ui-datepicker-trigger').addClass(classStr)

        if (this.initialDate != null) {
            $("#" + this.pickerId).datepicker( "setDate", this.initialDate);
        }
    }
}
</script>

<style scoped>

</style>