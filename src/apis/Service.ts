// service APIs

export class Service {
    id: number;
    title: string;
    description: string;
    timeSlots: number;

    constructor({ id = -1, title = "", description = "", timeSlots = -1 }: any = {}) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.timeSlots = timeSlots;
    }

    public static GetServices(): Promise<Array<Service>> {
        return new Promise((resolve, reject) => {
            const data: Array<Service> = [
                new Service({ id: 0, title: "Service 1", description: "Serivce 1 description", timeSlots: 1 }),
                new Service({ id: 1, title: "Service 2", description: "Serivce 2 description", timeSlots: 2 })
            ];
            resolve(data);
        });
    }
}