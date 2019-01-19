<template>
    <div id="app">
        <navigation-tabs></navigation-tabs>
        <router-view />
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    import NavigationTabs from "@/components/NavigationTabs.vue";
    import wicgInert from "@/../node_modules/wicg-inert/dist/inert.js";

    @Component({
        components: {
            NavigationTabs
        }
    })
    export default class App extends Vue {
        created(): void {
            wicgInert;
        }
    };
</script>

<style>
    * {
        box-sizing: border-box;
        font-variant: small-caps;
    }

    html {
        height: 100%;
        /* min-width: 1232px; */
    }

    body {
        height: 100%;
        margin: 0px;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: calc(100% - 48px);
    }

    .fancy {
        font-style: italic;
        text-align: left;
    }

    /* fieldset */
    .fieldset {
        border: 2px solid #a8a8a8;
        border-radius: 5px;
        margin: 10px;
        padding: 10px;
        position: relative;
        display: flex;
        justify-content: space-around;
    }

    .fieldset .legend {
        background-color: #fff;
        font-weight: bold;
        text-align: left;
        padding: 0px 5px;
        position: absolute;
        top: -10px;
        left: 5px;
    }

    @media screen and (max-width: 1075px) {
        .fieldset {
            padding-left: 20px;
            text-align: left;
            flex-direction: column;
        }
    }

    /* button */
    .btn {
        border: 1px solid rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.5);
        color: #000;
        cursor: pointer;
        font-size: 12px;
        font-weight: bold;
        margin: 5px 10px;
        padding: 10px;
    }

    .btnNormal {
        background-color: #42A5F5;
    }
    
    .btnNormal:hover {
        background-color: #1E88E5;
    }

    .btnSuccess {
        background-color: #66BB6A;
    }

    .btnSuccess:hover {
        background-color: #43A047;
    }

    .btnError {
        background-color: #EF5350;
    }

    .btnError:hover {
        background-color: #E53935;
    }

    .btnDisabled, .btnDisabled:hover {
        background-color: #d0d0d0;
        color: #5f5f5f;
        cursor: not-allowed;
    }

    /* form element */
    .isRequired {
        color: #e40000;
    }

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
        max-width: 550px;
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
            right: 5% !important;
            left: 5% !important;
        }

        .form .buttons {
            flex-direction: column;
        }

        .form .buttons button {
            width: initial;
        }
    }
</style>
