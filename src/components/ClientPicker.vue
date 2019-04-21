<!-- ClientPicker Component
    @Prop() id: string                  -> Input's Id
    @Prop() label: string               -> Label used for Input
    @Prop() isRequired?: boolean        -> Flag if field is required or not
    @Prop() isDisabled?: boolean        -> Flag if field is disabled or not

    @Output SelectResult()              -> Returns data selected Client
-->

<template>
    <div id="client_picker">
        <label :for="id">
            {{ label }}
            <span v-if="isRequired" class="isRequired">*</span>
        </label>

        <div id="client_info">
            <span>Name:</span>
            <span>{{ selectedClient.title }}</span>
            <span>Phone:</span>
            <span>{{ selectedClient.phone | FPhoneNumber }}</span>
            <span>Email:</span>
        </div>
        
        <div id="client_results">
            <!-- Scrolling doesnt move along with selected -->
            <!-- @keydown.arrow-up="ChangeSelection(0);" @keydown.arrow-down="ChangeSelection(1);" -->
            <input type="text" :id="id" v-model="filterString" :required="isRequired" :disabled="isDisabled"
                @blur="ToggleResults(0);" @focus="ToggleResults(1);" />
            <div id="new_client_link">
                <a href="/clients" target="_blank">new client</a>
            </div>
            <div id="client_picker_results" v-if="(clients.length > 0) && isFocused">
                <div v-if="loading" class="loaderMsg">
                    <i class="fas fa-cog fa-spin"></i>
                </div>
                <div v-else>
                    <div v-for="(client, index) in clients" :key="index" class="result" v-bind:class="{ selectedItem: (selectedItem === index) }" @click="SelectResult(index);">
                        <i class="fas fa-user"></i>
                        <span>{{ client.title }}</span>

                        <i class="fas fa-mobile"></i>
                        <span>{{ client.phone | FPhoneNumber }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";

    import { Client } from "@/apis/Client.ts";

    import FPhoneNumber from "@/filters/PhoneNumber.ts";

    @Component({
        filters: {
            'FPhoneNumber': FPhoneNumber
        }
    })
    export default class ClientPicker extends Vue {
        @Prop({ type: String, required: true }) id!: string;
        @Prop({ type: String, required: true }) label!: string;
        @Prop({ type: Client }) value!: Client;
        @Prop({ type: Boolean }) isRequired!: boolean;
        @Prop({ type: Boolean }) isDisabled!: boolean;

        filterString: string = "";
        canRunSearch: boolean = true;
        timer: number = -1;
        loading: boolean = false;
        isFocused: boolean = false;
        selectedItem: number = -1;
        clients: Array<Client> = [];
        selectedClient: Client = new Client();

        created(): void {
            // populate client
            setTimeout(() => {
                if (this.value.id > -1) {
                    this.clients.push(this.value);
                    this.SelectResult(0);
                }
            }, 50);
            this.isRequired = (this.isRequired === undefined) ? false : this.isRequired;
            this.isDisabled = (this.isDisabled === undefined) ? false : this.isDisabled;
        }

        @Watch('filterString') 
        RunSearch(newFilter: string, oldFilter: string): void {
            if (this.canRunSearch) {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => { this.SearchPeople(); }, 500);
            }
            else this.canRunSearch = true;
        }

        SearchPeople(): void {
            this.loading = true;
            Client.GetClients().then(clients => {
                this.clients = clients;
                setTimeout(() => { this.loading = false; }, 500);
            });
        }

        ToggleResults(state: boolean): void {
            setTimeout(() => {
                if (!state) this.isFocused = false;
                else this.isFocused = true;
            }, 200);
        }

        ChangeSelection(state: boolean): void {
            if (!state) {
                if (this.selectedItem <= 0) this.selectedItem = this.clients.length - 1;
                else this.selectedItem--;
            }
            else {
                if ((this.selectedItem < 0) || (this.selectedItem === this.clients.length - 1)) this.selectedItem = 0;
                else this.selectedItem++;
            }

            // this.filterString = this.clients[this.selectedItem].title;
        }

        SelectResult(index: number): void {
            this.canRunSearch = false;
            this.filterString = this.clients[index].title;
            this.selectedClient = this.clients[index];

            this.$emit('selectedClient', this.clients[index]);
        }
    }
</script>

<style scoped>
    #client_picker {
        padding: 10px;
        text-align: left;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    #client_picker label {
        font-weight: bold;
        padding: 5px;
    }

    #client_results {
        position: relative;
        display: flex;
        flex-direction: column;
    }

    #client_results input {
        padding: 5px;
        position: relative;
    }

    #client_picker_results {
        background-color: #fff;
        border: 1px solid #a8a8a8;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
        line-height: 25px;
        max-height: 305px;
        overflow: auto;
        position: absolute;
        top: 30px;
        right: 0px;
        left: 0px;
        z-index: 10;
    }

    #client_picker_results .loaderMsg {
        font-size: 25px;
        padding: 10px;
    }
    
    #client_picker_results .loaderMsg:hover {
        background-color: initial;
        cursor: default;
    }

    #client_picker_results .result {
        border-bottom: 1px solid #909090;
        padding: 5px 10px;
        display: grid;
        grid-template-columns: 25px auto;
    }

    #client_picker_results .result:hover {
        background-color: rgba(1, 89, 162, 0.25);
        cursor: pointer;
    }

    #client_picker_results .selectedItem {
        background-color: rgba(1, 89, 162, 0.25);
    }

    #client_picker_results .result i {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #client_picker_results .result span {
        padding-left: 10px;
    }

    #client_info {
        background-color: #ffe68a;
        border-radius: 5px;
        line-height: 25px;
        margin-bottom: 15px;
        padding: 10px;
        display: grid;
        grid-template-columns: 100px auto;
    }

    #new_client_link {
        padding: 5px;
        display: flex;
        justify-content: flex-end;
    }

    #new_client_link a {
        color: #000;
        font-style: italic;
        text-decoration: none;
    }

    #new_client_link a:hover, #new_client_link a:focus {
        text-decoration: underline;
    }
</style>
