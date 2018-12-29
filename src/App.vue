<template>
    <div id="app">
        <appointment-grid></appointment-grid>
        <appointment-form></appointment-form>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    import AppointmentGrid from "@/components/AppointmentGrid.vue";
    import AppointmentForm from "@/components/AppointmentForm.vue";
    import Backdrop from "@/components/Backdrop.vue";
    import DatePicker from "@/components/DatePicker.vue";

    @Component({
        components: {
            AppointmentGrid,
            AppointmentForm,
            Backdrop,
            DatePicker
        }
    })
    export default class App extends Vue {
        ReturnedSelectedDate(event: any): void {
            console.log(event)
        }
    };
</script>

<style>
    * {
        box-sizing: border-box;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    /* form element */
    .form header {
        border-bottom: 4px double #000;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
        padding: 10px;
    }

    .form .requireAlert {
        font-style: italic;
    }

    .form form {
        background-color: #fff;
        border-radius: 5px;
        border: 1px solid #000;
        box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.5);
        overflow: auto;
        padding: 20px;
        position: fixed;
        top: 10%;
        right: 25%;
        bottom: 10%;
        left: 25%;
    }

    .form .buttons {
        padding-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .form .buttons button {
        width: 50%;
    }

    @media screen and (max-width: 600px) {
        .form form {
            right: 5%;
            left: 5%;
        }

        .form .buttons {
            flex-direction: column;
        }

        .form .buttons button {
            width: initial;
        }
    }
</style>
