// client APIs

export class Client {
    id: number;
    title: string;
    phone: string;

    constructor({ id = -1, title = "", phone = "" }: any = {}) {
        this.id = id;
        this.title = title;
        this.phone = phone;
    }

    public static GetClients(): Promise<Array<Client>> {
        return new Promise((resolve, reject) => {
            const data: Array<Client> = [
                new Client({ id: 0, title: "Client 1", phone: "0000000000" }),
                new Client({ id: 1, title: "Client 2", phone: "1111111111" }),
            ];
            resolve(data);
        });
    }
}