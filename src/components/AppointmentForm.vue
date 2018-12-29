<!-- AppointmentForm Component

-->

<template>
    <div id="appointment-form" class="form">
        <backdrop></backdrop>

        <form>
            <header>{{ title }}</header>

            <!-- <button type="button"></button> -->

            <div id="appointment-form-service">
                <people-picker :id="'ppClients'"></people-picker>
            </div>

            <div id="appointment-form-break">
                break
            </div>
        </form>
    </div>
</template>

<script lang="ts">
    import { Vue, Component} from "vue-property-decorator";

    import Backdrop from "@/components/Backdrop.vue";
    import PeoplePicker from "@/components/PeoplePicker.vue";

    @Component({
        components: {
            Backdrop,
            PeoplePicker
        }
    })
    export default class AppointmentForm extends Vue {
        title: string = "";

        created(): void {
            this.title = "Appointment Form";
        }
    }
</script>

<style scoped>

</style>
