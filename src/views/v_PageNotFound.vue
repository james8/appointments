<!-- PageNotFound View

-->

<template>
    <div id="view-page-not-found">
        <i class="fas fa-bullhorn"></i>
        <span>Page Not Found</span>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";
    
    @Component
    export default class v_PageNotFound extends Vue {
        
    };
</script>

<style scoped>
    #view-page-not-found {
        margin: 0px;
        display: flex;
        justify-content: center;
    }

    #view-page-not-found i {
        color: #2d3e50;
        font-size: 175px;
        padding-top: 100px;
        transform: rotate(-20deg);
    }

    #view-page-not-found span {
        font-size: 50px;
        font-weight: bold;
        padding-top: 110px;
        padding-left: 50px;
    }

    @media screen and (max-width: 655px) {
        #view-page-not-found i {
            font-size: 70px;
        }

        #view-page-not-found span {
            font-size: 22px;
            padding-top: 100px;
            padding-left: 25px;
        }
    }
</style>
