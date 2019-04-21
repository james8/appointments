// service APIs

export class Service {
    id: number;
    name: string;
    description: string;
    timeSlots: number;

    constructor(id = -1, name = "", description = "", timeSlots = -1) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.timeSlots = timeSlots;
    }

    public static GetServices(): Promise<Array<Service>> {
        return new Promise((resolve, reject) => {
            const data: Array<Service> = [
                new Service(0, "Service 1", "Serivce 1 description", 1),
                new Service(1, "Service 2", "Serivce 2 description", 2),
            ];
            resolve(data);
        });
    }
}