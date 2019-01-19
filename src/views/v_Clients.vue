<!-- Clients view

-->

<template>
    <div id="view-clients">
        <client-search @selectedClient="SelectedClient($event);"></client-search>
        <!-- <client-form :selectedClient="selectedClient"></client-form> -->
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    import { Client } from "@/apis/Client.ts";

    import ClientForm from "@/components/ClientForm.vue";
    import ClientSearch from "@/components/ClientSearch.vue";

    @Component({
        components: {
            ClientForm,
            ClientSearch
        }
    })
    export default class v_Clients extends Vue {
        clients: Array<Client> = [];
        selectedClient: Client = new Client();
        
        created(): void {
            Client.GetClients().then((clients: Array<Client>) => this.clients = clients);
            // setTimeout(() => { this.selectedClient = this.clients[1] }, 50);
        }

        SelectedClient(event: Client): void {
            this.selectedClient = event;
        }
    };
</script>

<style scoped>

</style>

