<template>
    <input type="text" class="datepicker" style="display:none;" :id="pickerId">
</template>

<script>

export default {
    name: "DatePicker",
    props: ['picker-id', 'input-type'],
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
                self.$emit('update-date', d)
            }
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
        }

        $("#" + this.pickerId).datepicker(option).next('.ui-datepicker-trigger').addClass(classStr)
    }
}
</script>

<style scoped>

</style>