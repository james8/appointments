<!-- Services view

-->

<template>
    <div id="view_services">
        <h1>{{ title }}</h1>
        
        <table id="services_results" cellspacing="0" class="dataResults">
            <thead>
                <th>
                    {{ title }}
                    <i class="fas fa-plus" title="Create New Service" @click="BtnCreate();"></i>
                </th>
            </thead>
            <tbody>
                <tr v-for="(service, index) in services" :key="`service${ index }`">
                    <td @click="SelectService(index);">{{ service.name }}</td>
                </tr>
            </tbody>
        </table>

        <div v-if="showForm">
            <form id="service_form" class="form dataForm">
                <div class="header">
                    {{ formTitle }}
                    <i class="fas fa-trash-alt" v-if="(serviceNew.id > -1) && !editing" :title="deleteTitle" @click="BtnDelete();"></i>
                </div>
                <div class="body">
                    <input-field
                        :id="'service_name'"
                        :label="'Service Name'"
                        :value="serviceNew.name"
                        isRequired
                        :isDisabled="!canEdit"
                        @inputChange="UpdateServiceForm(formFields[0], $event);">
                    </input-field>
                    <input-field
                        :id="'service_description'"
                        :label="'Description'"
                        :value="serviceNew.description"
                        isRequired
                        :isDisabled="!canEdit"
                        @inputChange="UpdateServiceForm(formFields[1], $event);">
                    </input-field>
                    <input-field
                        :id="'service_duration'"
                        :type="'number'"
                        :label="'Duration'"
                        :value="serviceNew.timeSlots"
                        isRequired
                        :isDisabled="!canEdit"
                        @inputChange="UpdateServiceForm(formFields[2], $event);">
                    </input-field>

                    <div class="buttons" v-if="serviceNew.id === -1">
                        <button type="button" :disabled="!canSave"
                            class="btn btnSuccess" v-bind:class="{ 'btnDisabled': !canSave }"
                            @click="BtnSaveCreate();">Create</button>
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

        <toast v-if="showToast"
            :type="toastType"
            :msg="toastMsg"
            @closeToast="showToast = $event">
        </toast>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    import { Service } from "@/apis/Service.ts";

    import Backdrop from "@/components/Backdrop.vue";
    import InputField from "@/components/InputField.vue";
    import Toast from "@/components/Toast.vue";

    @Component({
        components: {
            Backdrop,
            InputField,
            Toast
        }
    })
    export default class v_Services extends Vue {
        title: string = 'Services';

        services: Array<Service> = [];

        formFields: Array<string> = [ 'name', 'description', 'duration' ];
        showForm: boolean = false;
        canSave: boolean = false;
        canEdit: boolean = false;
        editing: boolean = false;

        formTitle: string = '';
        deleteTitle: string = '';
        serviceOld: Service = new Service();
        serviceNew: Service = new Service();

        showToast: boolean = false;
        toastType: string = '';
        toastMsg: string = '';

        created(): void {
            Service.GetServices()
                .then(services => (this.services = services))
                .catch(error => console.log(`Error => Service => GetServices(): ${ error }`));
        }

        SelectService(index: number): void {
            const me: Service = this.services[index];
            this.serviceOld = new Service(me.id, me.name, me.description, me.timeSlots);
            this.serviceNew = new Service(me.id, me.name, me.description, me.timeSlots);

            this.formTitle = this.serviceNew.name;
            this.deleteTitle = `Delete Service '${ this.formTitle }'`;

            // need to update InputField Component to accept type: number
            const tsDuration: number = 15;
            const duration: number = tsDuration*(me.timeSlots);
            this.serviceOld.timeSlots = duration;
            this.serviceNew.timeSlots = duration;

            this.showForm = true;
        }

        UpdateServiceForm(field: string, value: string): void {
            switch(field) {
                case 'name': {
                    this.serviceNew.name = value;
                    break;
                }
                case 'description': {
                    this.serviceNew.description = value;
                    break;
                }
                case 'duration': {
                    this.serviceNew.timeSlots = parseInt(value, 10);
                    break;
                }
            }

            this.canSave = this.CanSave();
        }

        BtnCreate(): void {
            this.serviceOld = new Service();
            this.serviceNew = new Service();

            this.formTitle = 'New Service';
            this.serviceOld.timeSlots = 0;
            this.serviceNew.timeSlots = 0;

            this.showForm = true;
            this.canEdit = true;
        }

        BtnDelete(): void {
            const name: string = this.serviceNew.name;
            const warning: string = `Are you sure you want to permanently delete service '${ name }'?`;

            if (confirm(warning)) {
                this.toastType = 'success';
                this.toastMsg = `Service '${ name }' has been successfully deleted!`;
                this.showToast = true;
                this.showForm = false;
            }
        }

        BtnSaveCreate(): void {
            
        }

        BtnCancel(): void {
            const _old: Service = this.serviceOld;
            const _new: Service = this.serviceNew;
            const isDirty: boolean = this.IsDirty(_old, _new);
            const warning: string = 'Are you sure you want to cancel service creation?';

            if (!isDirty || (isDirty && confirm(warning))) {
                this.showForm = false;
                this.canEdit = false;
                this.serviceNew = new Service();
            }
        }

        BtnSave(): void {

        }

        BtnCancelEdit(): void {
            const _old: Service = this.serviceOld;
            const _new: Service = this.serviceNew;
            const isDirty: boolean = this.IsDirty(_old, _new);
            const warning: string = 'Are you sure you want to cancel service edit? All changes will be lost.';

            if (!isDirty || (isDirty && confirm(warning))) {
                _new.name = _old.name;
                _new.description = _old.description;
                _new.timeSlots = _old.timeSlots;

                this.editing = false;
                this.canEdit = false;
            }
        }

        BtnEdit(): void {
            this.editing = true;
            this.canEdit = true;
        }

        BtnClose(): void {
            this.showForm = false;
            this.serviceNew = new Service();
        }

        IsDirty(_old: Service, _new: Service): boolean {
            if (_old.name !== _new.name) return true;
            if (_old.description !== _new.description) return true;
            if (_old.timeSlots !== _new.timeSlots) return true;
            return false;
        }

        CanSave(): boolean {
            const form = (document.getElementById('service_form') as HTMLFormElement);
            const isValid = form.checkValidity();
            const isDirty = this.IsDirty(this.serviceOld, this.serviceNew);
            return (isValid && isDirty);
        }
    };
</script>

<style scoped>
    
</style>

