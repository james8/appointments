// employee APIs

export class Employee {
    id: number;
    name: string;

    constructor({ id = -1, name = "" }: any = {}) {
        this.id = id;
        this.name = name;
    }

    public static GetEmployees(): Promise<Array<Employee>> {
        return new Promise((resolve, reject) => {
            const data: Array<Employee> = [
                new Employee({ "id": 0, "name": "E0" }),
                new Employee({ "id": 1, "name": "E1" }),
                new Employee({ "id": 2, "name": "E2" }),
                new Employee({ "id": 3, "name": "E3" }),
                new Employee({ "id": 4, "name": "E4" })
            ];
            resolve(data);
        });
    }

    public static GetAciveEmployees(): Promise<Array<Employee>> {
        return new Promise((resolve, reject) => {
            const data: Array<Employee> = [
                new Employee({ "id": 0, "name": "E0" }),
                new Employee({ "id": 2, "name": "E2" }),
                new Employee({ "id": 3, "name": "E3" }),
                new Employee({ "id": 4, "name": "E4" })
            ];
            resolve(data);
        });
    }
}