<!-- ClientForm Component
    
    @Prop() selectedClient: Client          -> Slected Client information
-->

<template>
    <div id="client-form" class="form">
        <form>
            <header>{{ title }}</header>
            <input-field :id="'client-firstname'" :label="'First Name'" :value="firstName" isRequired :isDisabled="!canEdit"></input-field>
            <input-field :id="'client-lastname'" :label="'Last Name'" :value="lastName" :isDisabled="!canEdit"></input-field>
            <input-field :id="'client-phone'" :type="'phone'" :label="'Phone'" :value="phone" isRequired :isDisabled="!canEdit"></input-field>
            <input-field :id="'client-email'" :label="'Email'" :value="email" :isDisabled="!canEdit"></input-field>

            <div class="buttons" v-if="selectedClient.title === ''">
                <button type="button" class="btn btnNormal">Create</button>
                <button type="button" class="btn btnError">Cancel</button>
            </div>
            <div class="buttons" v-else-if="editing">
                <button type="button" class="btn btnSuccess">Save</button>
                <button type="button" class="btn btnError">Cancel</button>
            </div>
            <div class="buttons" v-else>
                <button type="button" class="btn btnNormal">Edit</button>
            </div>
        </form>
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
    export default class ClientForm extends Vue {
        @Prop({ type: Client, required: true }) selectedClient!: Client;

        canEdit: boolean = true;
        editing: boolean = true;
        title: string = "";
        firstName: string = "";
        lastName: string = "";
        phone: string = "";
        email: string = "";

        created(): void {
            this.title = "New Client";
        }

        @Watch('selectedClient')
        UpdateClientForm(newVal: Client, oldVal: Client): void {
            if (this.selectedClient.title !== "") {
                this.canEdit = false;
                this.title = this.selectedClient.title;
                this.firstName = this.selectedClient.firstName;
                this.lastName = this.selectedClient.lastName;
                this.phone = this.selectedClient.phone;
                this.email = this.selectedClient.email;
            }
            else {
                this.canEdit = true;
                this.title = "New Client";
                this.firstName = this.selectedClient.firstName;
                this.lastName = this.selectedClient.lastName;
                this.phone = this.selectedClient.phone;
                this.email = this.selectedClient.email;
            }
        }
    };
</script>

<style scoped>
    /* #client-form {
        position: relative;
    }

    #client-form form {
        position: absolute;
        top: 10%;
        right: 25%;
        bottom: 10%;
        left: 25%;
    } */
</style>
