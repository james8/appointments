<!-- AppointmentGridSlot Component

    @Prop type: string ['timeslot', 'no-slot', 'header', appointment']      -> Type of slot to be created
    @Prop info: IAppointment	                                            -> Object containing information for slot
-->

<template>
    <div id="appointment-grid-slot" v-bind:style="{ 'grid-row': slotSpan }">
        <div id="header" v-if="type === 'header'">
            <span>{{ info.label }}</span>
        </div>
        <div id="timeslot" v-if="type === 'timeslot'">
            <span>{{ info.label }}</span>
        </div>
        <!-- <div id="no-slot" v-if="type === 'no-slot'"></div> -->
        <div id="appointment" v-if="type === 'appointment'">
            <div v-if="info.type === ''" class="appt">
                <i class="fas fa-plus"></i>
            </div>
            <div v-else-if="info.type === 'service'" class="apptService">
                <div class="apptServiceHead">
                    <span>{{ info.client.title }}</span>
                    <span>{{ info.client.phone | FPhoneNumber }}</span>
                </div>
                <div class="apptServiceBody">
                    <span v-for="(service, serviceIndex) in info.services" :key="serviceIndex">
                        <span>{{ service.title }}</span>
                        <span v-if="serviceIndex < (info.services.length - 1)">+</span>
                    </span>
                </div>
            </div>
            <div v-else-if="info.type === 'break'" class="apptBreak">
                <span>{{ info.apptBreak.title }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    import { Appointment } from "@/apis/Appointment.ts";

    import FPhoneNumber from "@/filters/PhoneNumber.ts";
   
    @Component({
        filters: {
            'FPhoneNumber': FPhoneNumber
        }
    })
    export default class AppointmentGridSlot extends Vue {
        @Prop({
            type: String,
            validator: ((val) => ['header', 'timeslot', 'appointment'].includes(val)),
            required: true
        }) type!: string;
        @Prop({ type: Object as (() => Appointment), required: true }) info!: Appointment;

        slotSpan: string = "";

        created(): void {
            this.slotSpan = ((this.info !== undefined) ? `span ${ this.info.slots }` : '');
        }
    };
</script>

<style scoped>
    #timeslot {
        height: 100%;
        padding: 10px;
        text-align: left;
    }

    #no-slot {
        border: 1px solid #000;
        height: 100%;
    }

    #header {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #appointment {
        height: 100%;
        padding: 5px;
    }

    #appointment > div {
        border-radius: 5px;
        height: 100%;
    }

    /* Empty Appointment - .appt */
    #appointment .appt {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #appointment .appt:hover {
        background-color: rgba(1, 89, 162, 0.25);
        border: 2px solid #0159a2;
        cursor: pointer;
    }

    #appointment .appt i {
        display: none;
    }

    #appointment .appt:hover i {
        color: #0159a2;
        font-size: 30px;
        display: initial;
    }

    /* Service Appointment - .apptService */
    #appointment .apptService {
        border: 2px solid rgba(0, 0, 0, 0.75);
        font-variant: small-caps;
    }

    #appointment .apptService:hover {
        background-color: rgba(1, 89, 162, 0.25);
        border: 2px solid #0159a2;
        cursor: pointer;
    }

    #appointment .apptService .apptServiceHead {
        background-color: lightcoral;
        border-bottom: 1px solid #000;
        border-radius: 4px 4px 0px 0px;
        line-height: 25px;
        padding: 10px;
        display: flex;
        flex-direction: column;
    }

    #appointment .apptService .apptServiceBody {
        line-height: 25px;
        padding: 10px;
    }
    
    #appointment .apptService .apptServiceBody span {
        display: flex;
        flex-direction: column;
    }

    #appointment .apptService:hover .apptServiceHead {
        background-color: rgba(1, 89, 162, 0.25);
    }

    /* Break Appointment - .apptBreak */
    #appointment .apptBreak {
        background-color: lightgoldenrodyellow;
        border: 2px solid #000;
        font-variant: small-caps;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #appointment .apptBreak:hover {
        background-color: rgba(1, 89, 162, 0.25);
        border: 2px solid #0159a2;
        cursor: pointer;
    }
</style>
