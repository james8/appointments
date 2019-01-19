<!-- ClientSearch Component

-->

<template>
    <div id="client-search">
        <div class="tip fancy">
            <span>Search for client.</span>
            <br/>
            <span>Enter a name, phone #, or email.</span>
        </div>
        <input-field :id="'search-box'" :value="clientFilterString" watchForChange @inputChanged="SearchForClient();"></input-field>
        <button type="button" class="btn btnNormal" @click="NewClient();">New Client</button>
        <hr>
        <div id="client-search-results">
            <div v-for="(client, index) in clients" :key="`client${ index }`" @click="SelectClient(index);">
                {{ client.title }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";

    import { Client } from "@/apis/Client.ts";

    import InputField from "@/components/InputField.vue";

    @Component({
        components: {
            InputField
        }
    })
    export default class ClientSearch extends Vue {
        clients: Array<Client> = [];
        clientFilterString: string = "";

        created(): void {
        }

        SearchForClient(): void {
            setTimeout(() => {
                Client.GetClients().then((clients: Array<Client>) => this.clients = clients);
            }, 2000);
        }

        NewClient(): void {
            this.$emit('selectedClient', new Client());
        }

        SelectClient(index: number): void {
            this.$emit('selectedClient', this.clients[index]);
        }
    };
</script>

<style scoped>
    #client-search {
        max-width: 550px;
        position: absolute;
        top: 10%;
        right: 25%;
        bottom: 10%;
        left: 25%;
    }

    #client-search .tip {
        line-height: 25px;
        padding: 10px 5px 0px 15px;
    }

    #client-search > button {
        margin-bottom: 15px;
        padding: 10px 25px;    
        display: flex;
        justify-content: flex-start;
    }

    #client-search hr {
        border-top: 4px double #125f80;
    }

    #client-search-results div {
        cursor: pointer;
        height: 50px;
        padding: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #client-search-results div:hover {
        background-color: rgba(1, 89, 162, 0.25);
    }

    @media screen and (max-width: 600px) {
        #client-search {
            right: 5% !important;
            left: 5% !important;
        }
    }
</style>
