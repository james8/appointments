// employee APIs

export class Employee {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    isAdmin?: boolean;

    constructor(id = -1, firstName = "", lastName = "", phone = "", email = "", isAdmin = false) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.isAdmin = isAdmin;
    }

    public static GetEmployees(): Promise<Array<Employee>> {
        return new Promise((resolve, reject) => {
            const data: Array<Employee> = [
                new Employee(0, "Amy", "A", "0000000000", "a@b.c"),
                new Employee(1, "Kody", "Tsuneda", "1111111111", "a@b.c"),
                new Employee(2, "Lani", "Kuniyuki", "2222222222", "a@b.c"),
                new Employee(3, "Laureen", "Shirokane", "3333333333", "a@b.c", true),
                new Employee(4, "Nuri", "Heo", "4444444444", "a@b.c")
            ];
            resolve(data);
        });
    }

    public static GetAciveEmployees(): Promise<Array<Employee>> {
        return new Promise((resolve, reject) => {
            const data: Array<Employee> = [
                new Employee(0, "Amy", "A", "0000000000", "a@b.c"),
                new Employee(2, "Lani", "Kuniyuki", "2222222222", "a@b.c"),
                new Employee(3, "Laureen", "Shirokane", "3333333333", "a@b.c", true),
                new Employee(4, "Nuri", "Heo", "4444444444", "a@b.c")
            ];
            resolve(data);
        });
    }
}