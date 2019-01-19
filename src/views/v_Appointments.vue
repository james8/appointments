<!-- Appointments view

-->

<template>
    <div id="view-appointments">
        <div>{{ selectedDate }}</div>
        <appointment-grid></appointment-grid>
        <date-picker @selectedDate="ReturnedSelectedDate($event)"></date-picker>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    import AppointmentGrid from "@/components/AppointmentGrid.vue";
    import DatePicker from "@/components/DatePicker.vue";

    @Component({
        components: {
            AppointmentGrid,
            DatePicker
        }
    })
    export default class v_Appointments extends Vue {
        dateOptions: Object = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        selectedDate: string = "";

        created(): void {
            const todaysDate: Date = new Date();
            this.selectedDate = todaysDate.toLocaleString('en-US', this.dateOptions);
        }

        ReturnedSelectedDate(event: any): void {
            const date: Date = new Date(event);
            this.selectedDate = date.toLocaleString('en-US', this.dateOptions);
        }
    };
</script>

<style scoped>

</style>

