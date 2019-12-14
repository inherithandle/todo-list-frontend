<template>
    <input type="text" class="datepicker" style="display:none;">
</template>

<script>

export default {
    name: "DatePicker",
    mounted: function() {
        const buttonIconHtml = '<i class="fas fa-calendar-alt"></i>'
        let self = this
        $(".datepicker").datepicker({
            showOn: "button",
            // buttonImageOnly: true,
            // buttonImage: "https://jqueryui.com/resources/demos/datepicker/images/calendar.gif",
            buttonText: buttonIconHtml,
            dateFormat: "yy-mm-dd",
            onSelect: function (d) {
                self.$emit('update-date', d)
            }
        }).next('.ui-datepicker-trigger').addClass('btn')
    }
}
</script>

<style scoped>

</style>