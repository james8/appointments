<!-- AppointmentGrid Component

-->

<template>
    <div id="appointment-grid">
        <div id="slots" v-bind:style="{ 'grid-template-columns': `60px repeat(${ colRepeater })` }">
            <div id="section-timeslots" class="section">
                <appointment-grid-slot v-for="(timeslot, timeslotIndex) in timeslots" :key="`timeslot${ timeslotIndex }`" :type="(timeslotIndex === 0) ? 'header' : 'timeslot'" :info="timeslot"></appointment-grid-slot>
            </div>
            <!-- <div id="section-no-slots" v-if="appts.length === 0" class="section">
                <appointment-grid-slot :type="'no-slot'" :info="noSlots"></appointment-grid-slot>
            </div> -->
            <div id="section-appointments" v-for="(appts, apptsIndex) in appts" :key="`appts${ apptsIndex }`" class="section">
                <appointment-grid-slot v-for="(appt, apptIndex) in appts" :key="`appt${ apptIndex }`"
                    :type="(apptIndex === 0) ? 'header' : 'appointment'" :info="appt"
                    @selectedGridSlot="SelectedGridSlot($event);">
                </appointment-grid-slot>
            </div>
        </div>
        <appointment-form v-if="slotInfo.slots > -1" :info="slotInfo" :timeslots="timeslots" :services="resultServices" @returnedApptFormData="ReturnedApptFormData($event);"></appointment-form>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    import { Appointment } from "@/apis/Appointment.ts";
    import { Break } from "@/apis/Break.ts";
    import { Client } from "@/apis/Client.ts";
    import { Employee } from "@/apis/Employee.ts";
    import { Service } from "@/apis/Service.ts";

    import AppointmentForm from "@/components/AppointmentForm.vue";
    import AppointmentGridSlot from "@/components/AppointmentGridSlot.vue";
    
    @Component({
        components: {
            AppointmentForm,
            AppointmentGridSlot
        }
    })
    export default class AppointmentGrid extends Vue {
        timeslots: Array<Appointment> = [];
        noSlots: Appointment = new Appointment;
        appts: Array<Array<Appointment>> = [];
        loading: boolean = false;
        colRepeater: string = "1, auto";
        slotInfo: Appointment = new Appointment(); 
        resultServices: Array<Service> = [];

        created(): void {
            // start & end times (represented in hour)
            const startTime: number = 10;
            // const endTime: number = 19;
            const endTime: number = 11;
            const mins: Array<string> = ["00", "15", "30", "45"];

            // initialize timeslots
            this.timeslots.push(new Appointment({ slots: 1 }));
            for (let i: number = startTime; i < endTime; i++) {
                const hour: string = ((i < 13) ? i : (i - 12)).toString();
                // const tod: string = ((i < 13) ? 'AM' : 'PM');

                for (let j: number = 0; j < mins.length; j++) {
                    this.timeslots.push(new Appointment({
                        timeslot: j,
                        slots: 1,
                        // label: `${ hour }:${ mins[j] } ${ (j === 0) ? tod : '' }`
                        label: `${ hour }:${ mins[j] }`
                    }));
                }
            }

            // initialize no-slots (displayed while querying data)
            // this.noSlots.slots = (1 + 4*(endTime - startTime));

            const apiCalls = [
                { tag: "activeEmployees", api: Employee.GetAciveEmployees() },
                { tag: "appointments", api: Appointment.GetAppointments() },
                { tag: "breaks", api: Break.GetBreaks() },
                { tag: "clients", api: Client.GetClients() },
                { tag: "employees", api: Employee.GetEmployees() },
                { tag: "services", api: Service.GetServices() },
            ];
            Promise.all(apiCalls.map(apiCall => apiCall.api) as Array<any>)
                .then((results: Array<any>) => {
                    const resultActiveEmployees: Array<number> = results[apiCalls.findIndex(apiCall => (apiCall.tag === "activeEmployees"))].map((activeEmployee: any) => activeEmployee.id);
                    const resultAppointments: Array<Appointment> = results[apiCalls.findIndex(apiCall => (apiCall.tag === "appointments"))];
                    const resultBreaks: Array<Break> = results[apiCalls.findIndex(apiCall => (apiCall.tag === "breaks"))];
                    const resultClients: Array<Client> = results[apiCalls.findIndex(apiCall => (apiCall.tag === "clients"))];
                    const resultEmployees: Array<Employee> = results[apiCalls.findIndex(apiCall => (apiCall.tag === "employees"))];
                    this.resultServices = results[apiCalls.findIndex(apiCall => (apiCall.tag === "services"))];

                    // populate default slots for active Employees
                    let temp: Array<Appointment> = [];
                    resultActiveEmployees.forEach((activeEmployee: number) => {
                        temp.push(new Appointment({
                            slots: 1,
                            label: (resultEmployees.find(resultEmployee => (resultEmployee.id === activeEmployee)) as Employee).name
                        }));
                        for (let i: number = startTime; i < endTime; i++) {
                            for (let j: number = 0; j < mins.length; j++) {
                                temp.push(new Appointment({
                                    timeslot: ((i - startTime) + j),
                                    slots: 1,
                                    employee: (resultEmployees.find(resultEmployee => (resultEmployee.id === activeEmployee)) as Employee)
                                }));
                            }
                        }
                        this.appts[activeEmployee] = temp;
                        temp = [];
                    });

                    resultAppointments.forEach((item: Appointment) => {
                        // update Appointment - Service
                        if (item.type === "service") {
                            // convert clientId to Client
                            item.client = resultClients.find(resultClient => (resultClient.id === item.client)) as Client;
                            if (item.client === undefined) item.client = new Client({ id: -1, title: "Client Not Found" });

                            // convert serviceId to Service
                            let apptServices: Array<Service> = [];
                            (item.services as Array<number>).forEach((service: number) => {
                                apptServices.push(this.resultServices.find(resultService => (resultService.id === service)) as Service);
                            });
                            item.services = apptServices;
                            item.services = item.services.map(service => ((service === undefined) ? new Service({ id: -1, title: "Service Not Found" }) : service));
                        }
                        // update Appointment - Break
                        else {
                            // convert breakId
                            item.apptBreak = resultBreaks.find(resultBreak => (resultBreak.id === item.apptBreak)) as Break;
                            if (item.apptBreak === undefined) item.apptBreak = new Break({ id: -1, title: "Break Not Found" });
                        }

                        // convert employeeId to Employee
                        item.employee = resultEmployees.find(resultEmployee => (resultEmployee.id === item.employee)) as Employee;

                        // add appointments for Employees
                        this.appts[item.employee.id].splice(item.timeslot + 1, 0, item);
                        // remove extra default appointments
                        this.appts[item.employee.id].splice(item.timeslot + 2, item.slots);
                    });
                    // remove Employee(s) if not active
                    this.appts = this.appts.filter((slot: Array<Appointment>) => (slot !== undefined));

                    // set width of Employee columns
                    this.colRepeater = `${ this.appts.length }, 200px`;
                });
        }

        SelectedGridSlot(event: Appointment): void {
            this.slotInfo = event;
        }

        ReturnedApptFormData(event: any): void {
            this.slotInfo = new Appointment();
        }
    };
</script>

<style scoped>
    #slots {
        width: 100%;
        display: grid;
        grid-auto-flow: column;
    }

    .section {
        display: grid;
        grid-auto-rows: 100px;
        grid-template-rows: 50px;
    }

    .section #header {
        grid-auto-rows: 50px;
    }

    #appointment-grid-slot {
        border-top: 1px solid #000;
    }

    #appointment-grid-slot:first-of-type {
        border-top: none;
    }
</style>
