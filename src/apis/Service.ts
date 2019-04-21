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
                new Service(0, "30min+", "extra 30min", 2),
                new Service(1, "Callus Removal", "Callus Removal", 0),
                new Service(2, "Design", "hands or toes", 2),
                new Service(3, "Ext", "extensions full set", 2),
                new Service(4, "Fix", "fix", 2),
                new Service(5, "Gel", "gel hand", 4),
                new Service(6, "Gel Pedi", "gel toe + callus (no massage)", 4),
                new Service(7, "Gel Toe", "gel toe (no callus/massage)", 4),
                new Service(8, "Mani", "with polish", 4),
                new Service(9, "Refill Toe", "refill toe", 1),
            ];
            resolve(data);
        });
    }
}