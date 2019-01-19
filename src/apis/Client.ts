// client APIs

export class Client {
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;

    constructor({ id = -1, title = "", firstName = "", lastName = "", phone = "", email = "" }: any = {}) {
        this.id = id;
        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
    }

    public static GetClients(): Promise<Array<Client>> {
        return new Promise((resolve, reject) => {
            const data: Array<Client> = [
                new Client({ id: 0, title: "Client 1", firstName: "Client", lastName: "1", phone: "0000000000", email: "" }),
                new Client({ id: 1, title: "Client 2", firstName: "Client", lastName: "2", phone: "1111111111", email: "a@b.c" }),
            ];
            resolve(data);
        });
    }
}