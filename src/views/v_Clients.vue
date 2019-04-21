<!-- Clients view

-->

<template>
    <div id="view-clients">
        <h1>{{ title }}</h1>

        <div id="client_search">
            <div>
                <input-field
                    :id="'search_box'"
                    :label="'Search'"
                    isSubmittable
                    @formSubmit="SearchForClients();">
                </input-field>
            </div>
            <div>
                <button type="button" class="btn btnNormal" @click="SearchForClients();">Search</button>
            </div>
        </div>

        <table id="client_results" cellspacing="0" class="dataResults">
            <thead>
                <th>
                    {{ title }}
                    <i class="fas fa-plus" title="Create New Client" @click="BtnCreate();"></i>
                </th>
            </thead>
            <tbody>
                <tr v-if="clients.length === 0"><td></td></tr>
                <tr v-for="(client, index) in clients" :key="`client${ index }`">
                    <td @click="SelectClient(index);">{{ client.firstName }} {{ client.lastName }}</td>
                </tr>
            </tbody>
        </table>

        <div v-if="showForm">
            <form id="client_form" class="form dataForm">
                <div class="header">
                    {{ formTitle }}
                    <i class="fas fa-trash-alt" v-if="(clientNew.id > -1) && !editing" :title="deleteTitle" @click="BtnDelete();"></i>
                </div>
                <div class="body">
                    <input-field
                        :id="'client_firstname'"
                        :label="'First Name'"
                        :value="clientNew.firstName"
                        isRequired
                        :isDisabled="!canEdit"
                        @inputChange="UpdateClientForm(formFields[0], $event);">
                    </input-field>
                    <input-field
                        :id="'client_lastname'"
                        :label="'Last Name'"
                        :value="clientNew.lastName"
                        :isDisabled="!canEdit"
                        @inputChange="UpdateClientForm(formFields[1], $event);">
                    </input-field>
                    <input-field v-bind:class="{ 'hideInput': !showPhoneEdit }"
                        :id="'client_phone'"
                        :type="'phone'"
                        :label="'Phone #'"
                        :value="clientNew.phone"
                        isRequired
                        :isDisabled="!canEdit"
                        @inputChange="UpdateClientForm(formFields[2], $event);">
                    </input-field>
                    <input-field v-bind:class="{ 'hideInput': showPhoneEdit }"
                        :id="'client_phone_disabled'"
                        :label="'Phone #'"
                        :value="clientNew.phone | FPhoneNumber"
                        isRequired
                        :isDisabled="true">
                    </input-field>
                    <input-field
                        :id="'client_email'"
                        :label="'Email'"
                        :value="clientNew.email"
                        :isDisabled="!canEdit"
                        @inputChange="UpdateClientForm(formFields[3], $event);">
                    </input-field>

                    <div class="buttons" v-if="clientNew.id === -1">
                        <button type="button" :disabeld="!canSave"
                            class="btn btnSuccess" v-bind:class="{ 'btnDisabled': !canSave }"
                            @click="BtnCreate();">Create</button>
                        <button type="button" class="btn btnError" @click="BtnCancel();">Cancel</button>
                    </div>
                    <div class="buttons" v-else-if="editing">
                        <button type="button" :disabled="!canSave"
                            class="btn btnSuccess" v-bind:class="{ 'btnDisabled': !canSave }"
                            @click="BtnSave();">Save</button>
                        <button type="button" class="btn btnError" @click="BtnCancelEdit();">Cancel</button>
                    </div>
                    <div class="buttons" v-else>
                        <button type="button" class="btn btnNormal" @click="BtnEdit();">Edit</button>
                        <button type="button" class="btn btnError" @click="BtnClose();">Close</button>
                    </div>
                </div>
            </form>
            <backdrop></backdrop>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    import { Client } from "@/apis/Client.ts";

    import Backdrop from "@/components/Backdrop.vue";
    import InputField from "@/components/InputField.vue";
    import Toast from "@/components/Toast.vue";

    import FPhoneNumber from "@/filters/PhoneNumber.ts";

    @Component({
        components: {
            Backdrop,
            InputField,
            Toast
        },
        filters: {
            'FPhoneNumber': FPhoneNumber
        }
    })
    export default class v_Clients extends Vue {
        title: string = 'Clients';

        clients: Array<Client> = [];

        formFields: Array<string> = [ 'firstName', 'lastName', 'phone', 'email' ];
        showForm: boolean = false;
        showPhoneEdit: boolean = false;
        canSave: boolean = false;
        canEdit: boolean = false;
        editing: boolean = false;

        formTitle: string = '';
        deleteTitle: string = '';
        clientOld: Client = new Client();
        clientNew: Client = new Client();

        showToast: boolean = false;
        toastType: string = '';
        toastMsg: string = '';

        selectedClient: Client = new Client();
        
        SearchForClients(): void {
            Client.GetClients()
                .then((clients: Array<Client>) => (this.clients = clients))
                .catch((error: Error) => console.log(`Error => Client => GetClients(): ${ error }`));
        }

        SelectClient(index: number): void {
            const me: Client = this.clients[index];
            this.clientOld = new Client(me.id, me.title, me.firstName, me.lastName, me.phone, me.email, me.clientNotes);
            this.clientNew = new Client(me.id, me.title, me.firstName, me.lastName, me.phone, me.email, me.clientNotes);

            const fn: string = this.clientNew.firstName;
            const ln: string = this.clientNew.lastName;
            this.formTitle = `${ fn } ${ ln.substr(0, 1) }.`;
            this.deleteTitle = `Delete Client '${ fn } ${ ln }'`;

            this.showForm = true;
        }
        
        // input-field value changed
        UpdateClientForm(field: string, value: string): void {
            switch(field) {
                case 'firstName': {
                    this.clientNew.firstName = value;
                    break;
                }
                case 'lastName': {
                    this.clientNew.lastName = value;
                    break;
                }
                case 'phone': {
                    this.clientNew.phone = value;
                    break;
                }
                case 'email': {
                    this.clientNew.email = value;
                    break;
                }
            }

            // need a slight delay for type 'phone'
            setTimeout(() => {
                this.canSave = this.CanSave();
            }, 50);
        }

        BtnCreate(): void {
            this.clientOld = new Client();
            this.clientNew = new Client();

            this.formTitle = 'New Client';

            this.showForm = true;
            this.showPhoneEdit = true;
            this.canSave = false;
            this.canEdit = true;
        }

        BtnDelete(): void {
            const name: string = `${ this.clientNew.firstName } ${ this.clientNew.lastName }`;
            const warning: string = `Are you sure you want to permanently delete employee '${ name }'?`;

            if (confirm(warning)) {
                this.toastType = 'success';
                this.toastMsg = `Client '${ name }' has been successfully deleted!`;
                this.showToast = true;
                this.showForm = false;
            }
        }

        BtnSaveCreate(): void {

        }

        BtnCancel(): void {
            const isDirty: boolean = this.IsDirty(this.clientOld, this.clientNew);
            const warning: string = 'Are you sure you want to cancel client creation?';

            if (!isDirty || (isDirty && confirm(warning))) {
                this.showForm = false;
                this.showPhoneEdit = false;
                this.canSave = false;
                this.canEdit = false;
                this.clientNew = new Client();
            }
        }

        BtnSave(): void {

        }

        BtnCancelEdit(): void {
            const _old: Client = this.clientOld;
            const _new: Client = this.clientNew;
            const isDirty: boolean = this.IsDirty(_old, _new);
            const warning: string = `Are you sure you want to cancel client edit? All changes will be lost.`;

            if (!isDirty || (isDirty && confirm(warning))) {
                _new.firstName = _old.firstName;
                _new.lastName = _old.lastName;
                _new.phone = _old.phone;
                _new.email = _old.email;
                _new.clientNotes = _old.clientNotes;

                this.showPhoneEdit = false;
                this.canSave = false;
                this.canEdit = false;
                this.editing = false;
            }
        }

        BtnEdit(): void {
            this.showPhoneEdit = true;
            this.editing = true;
            this.canEdit = true;
        }

        BtnClose(): void {
            this.showForm = false;
            this.clientNew = new Client();
        }

        IsDirty(_old: Client, _new: Client): boolean {
            if (_old.firstName !== _new.firstName) return true;
            if (_old.lastName !== _new.lastName) return true;
            if (_old.phone !== _new.phone) return true;
            if (_old.email !== _new.email) return true;
            return false;
        }

        CanSave(): boolean {
            const form = (document.getElementById('client_form') as HTMLFormElement);
            const isValid = form.checkValidity();
            const isDirty = this.IsDirty(this.clientOld, this.clientNew);
            return (isValid && isDirty);
        }
    };
</script>

<style scoped>
    #client_search {
        margin-left: 10px;
        max-width: 500px;
        display: grid;
        grid-template-columns: auto 125px;
    }

    #client_search > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    #client_search button {
        margin-top: 25px;
    }

    .hideInput {
        display: none !important;
    }
</style>

