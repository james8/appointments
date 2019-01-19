<!-- AppointmentForm Component

    @Prop() info: Appointment                   -> Selected AppointmentGridSlot information
    @Prop() timeslots: Array<Appointment>       -> timeslot labels
    
-->

<template>
    <div id="appointment-form" class="form">
        <backdrop></backdrop>

        <form>
            <header>{{ title }}</header>

            <toggle-field v-if="info.type === ''" :labels="toggleLabels" :value="toggleType" @toggled="FormTypeToggled($event);"></toggle-field>

            <div id="appointment-form-service" v-if="!toggleType">
                <input-field :id="'appt-time'" :label="'Appointment Time'" :value="timeslot" :isDisabled="true"></input-field>
                <client-picker :id="'appt-client'" :label="'Client'" :value="client" :isRequired="true" @selectedClient="SelectedClient($event);"></client-picker>
                <div id="appt-form-section-tech">
                    <input-field :id="'appt-tech'" :label="'Technician'" :value="employee.name" :isDisabled="true"></input-field>
                    <span id="requested-tech" class="fa-stack">
                        <i class="fas fa-star fa-stack-1x" v-bind:class="{ isRequestedTech: isRequestedTech }"></i>
                        <i class="far fa-star fa-stack-1x" @click="ToggleRequestedTech();"></i>
                    </span>
                </div>
                <div id="appt-form-section-services" class="fieldset">
                    <span class="legend">Services</span>
                    <checkbox-field v-for="(service, index) in services" :key="index" :id="`service${ service.id }`" :label="service.title" @checkboxStatus="CheckboxStatus($event)"></checkbox-field>
                </div>
            </div>

            <div id="appointment-form-break" v-else>
                break
            </div>

            <div class="buttons">
                <button type="button" v-if="canEdit" id="appt-edit-save" class="btn btnSuccess" v-bind:class="{ btnDisabled: !canSave }" :disabled="!canSave" @click="SaveForm();">Save</button>
                <button type="button" id="appt-edit-cancel" class="btn btnError" @click="CancelForm();">Cancel</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    import { Appointment } from "@/apis/Appointment.ts";
    import { Client } from "@/apis/Client.ts";
    import { Employee } from "@/apis/Employee.ts";
    import { Service } from "@/apis/Service.ts";

    import Backdrop from "@/components/Backdrop.vue";
    import CheckboxField from "@/components/CheckboxField.vue";
    import ClientPicker from "@/components/ClientPicker.vue";
    import InputField from "@/components/InputField.vue";
    import ToggleField from "@/components/ToggleField.vue";

    @Component({
        components: {
            Backdrop,
            CheckboxField,
            ClientPicker,
            InputField,
            ToggleField
        }
    })
    export default class AppointmentForm extends Vue {
        @Prop({ type: Object as (() => Appointment), required: true }) info!: Appointment;
        @Prop({ type: Array as (() => Array<Appointment>), required: true }) timeslots!: Array<Appointment>;
        @Prop({ type: Array as (() => Array<Service>), required: true }) services!: Array<Service>;

        title: string = "";
        toggleLabels: Array<string> = ['Appointment', 'Break'];
        toggleType: boolean = false;
        timeslot: string = "";
        timeslotId: number = this.info.timeslot;
        employee: Employee = new Employee();
        client: Client = new Client();
        isRequestedTech: boolean = false;
        selectedServices: Array<number> = [];
        canEdit: boolean = true;
        canSave: boolean = true;

        created(): void {
            this.title = ((this.info.type === '') ? "Create Appointment" : `Edit ${ (this.info.type === 'service') ? "Appointment" : "Break" }`);
            
            this.toggleType = (this.info.type === "break");
            this.timeslot = (this.timeslots.find(timeslot => (timeslot.timeslot === this.info.timeslot)) as Appointment).label;
            this.employee = ((this.info.employee === -1) ? (new Employee) : this.info.employee) as Employee;
            this.client = ((this.info.client === -1) ? (new Client()) : this.info.client) as Client;
        }

        FormTypeToggled(event: any): void {
            this.toggleType = event;
            this.title = `Create ${ !this.toggleType ? "Appointment" : "Break" }`;
        }

        SelectedClient(event: any): void {
            this.client = event;
        }

        ToggleRequestedTech(): void {
            this.isRequestedTech = !this.isRequestedTech;
        }

        CheckboxStatus(event: any): void {
            if (!event.status) {
                const index: number = this.selectedServices.findIndex(service => (service === parseInt(event.id, 10)));
                if (index > -1) this.selectedServices.splice(index, 1);
            }
            else this.selectedServices.push(parseInt(event.id, 10));
        } 

        SaveForm(): void {
            this.$emit('returnedApptFormData', null);
        }

        CancelForm(): void {
            // need to implement
            const dirty: boolean = false;

            let cancel: boolean = true;
            if (dirty) cancel = confirm("Are you sure you want to close the form? Any unsaved data will be lost.");
            if (cancel) this.$emit('returnedApptFormData', null);
        }
    }
</script>

<style scoped>
    #appointment-form form {
        position: fixed;
        top: 10%;
        right: 25%;
        bottom: 10%;
        left: 25%;
    }

    #appt-form-section-tech {
        display: grid;
        grid-template-columns: auto 35px;
    }

    #requested-tech {
        height: 100%;
        font-size: 25px;
        padding-top: 15px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #requested-tech .far.fa-star {
        color: #2f2f2f;
        cursor: pointer;
    }

    #requested-tech .fas.fa-star {
        color: #fff;
    }

    #requested-tech .far.fa-star:hover {
        color: #0159a2;
    }

    #requested-tech:hover .fas.fa-star {
        color: rgba(1, 89, 162, 0.25);
    }

    #requested-tech .isRequestedTech {
        color: #ffea00 !important;
    }
</style>
