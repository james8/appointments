<!-- PeoplePicker Component

-->

<template>
    <div id="people-picker">
        <input type="text" :id="id" v-model="filterString" @focus="ToggleResults(1);"
            @change="CanRunSearch($event);" />
        <div id="people-picker-results">
            <span v-if="loading" class="loaderMsg">
                <i class="fas fa-cog fa-spin"></i>
            </span>
            <span v-else-if="(results.length > 0) && isFocused" v-for="(result, index) in results" :key="index"
                tabindex="0">
                {{ result.title }}
            </span>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";

    import { Client } from "@/apis/Client.ts";

    @Component
    export default class PeoplePicker extends Vue {
        @Prop({ type: String, required: true }) id!: string;
        // @Prop({ type: String, required: true }) label!: string;

        filterString: string = "";
        timer: number = -1;
        loading: boolean = false;
        isFocused: boolean = false;
        isSubFocused: boolean = false;
        results: Array<Client> = [];

        @Watch('filterString') 
        CanRunSearch(event: Event): void {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => this.SearchPeople(event), 500);
        }

        SearchPeople(event: Event): void {
            this.loading = true;
            Client.GetClients().then(results => {
                this.results = results;
                setTimeout(() => { this.loading = false; }, 1000);
            });
        }

        ToggleResults(state: boolean): void {
            if (!state) {
                setTimeout(() => { if (!this.isSubFocused) this.isFocused = false; }, 50);
            }
            else this.isFocused = true;
        }
    }
</script>

<style scoped>
    #people-picker {
        padding: 10px;
        text-align: left;
        display: flex;
        flex-direction: column;
    }

    #people-picker input {
        padding: 5px;
    }

    #people-picker-results {
        border: 1px solid #a8a8a8;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
        line-height: 25px;
        display: flex;
        flex-direction: column;
    }

    #people-picker-results .loaderMsg {
        font-size: 25px;
    }
    
    #people-picker-results .loaderMsg:hover {
        background-color: initial;
        cursor: default;
    }

    #people-picker-results span {
        padding: 5px 10px;
    }

    #people-picker-results span:hover {
        background-color: rgba(1, 89, 162, 0.25);
        cursor: pointer;
    }
</style>
