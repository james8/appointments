// appointment APIs

import { Break } from "@/apis/Break.ts";
import { Client } from "@/apis/Client.ts";
import { Employee } from "@/apis/Employee.ts";
import { Service } from "@/apis/Service.ts";

export class Appointment {
    timeslot: number;
    slots: number;
    type: string;
    label: string;
    employee: number | Employee;
    client: number | Client;
    services: Array<number> | Array<Service>;
    apptBreak: number | Break;

    constructor ({
        timeslot = -1,
        slots = -1,
        type = "",
        label = "",
        employee = -1,
        client = -1,
        services = [],
        apptBreak = -1
    }: any = {}) {
        this.timeslot = timeslot;
        this.slots = slots;
        this.type = type;
        this.label = label;
        this.employee = employee;
        this.client = client;
        this.services = services;
        this.apptBreak = apptBreak;
    }

    public static GetAppointments(): Promise<Array<Appointment>> {
        return new Promise((resolve, reject) => {
            const data: Array<Appointment> = [
                new Appointment({
                    timeslot: 1,
                    slots: 2,
                    employee: 0,
                    type: "service",
                    client: 0,
                    services: [0]
                }),
                new Appointment({
                    timeslot: 0,
                    slots: 4,
                    employee: 2,
                    type: "break",
                    apptBreak: 0
                }),
                new Appointment({
                    timeslot: 1,
                    slots: 3,
                    employee: 4,
                    type: "service",
                    client: 1,
                    services: [0, 1]
                })
            ];
            resolve(data);
        });
    }
}