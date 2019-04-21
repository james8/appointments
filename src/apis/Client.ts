// client APIs

export class Client {
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    clientNotes: string;

    constructor(id = -1, title = "", firstName = "", lastName = "", phone = "", email = "", clientNotes = "") {
        this.id = id;
        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.clientNotes = clientNotes;
    }

    public static GetClients(): Promise<Array<Client>> {
        return new Promise((resolve, reject) => {
            const data: Array<Client> = [
                new Client(0, "Ada Wu", "Ada", "Wu", "0000000000", "", ""),
                new Client(1, "Adrienne Gluck", "Adrienne", "Gluck", "1111111111", "a@b.c", ""),
                new Client(1, "AeRang Joo", "AeRang", "Joo", "2222222222", "", ""),
                new Client(1, "Ailling Shang", "Ailling", "Shang", "3333333333", "d@e.f", ""),
                new Client(1, "Airi Dahlin", "Airi", "Dahlin", "4444444444", "", ""),
                new Client(1, "Aja Kusao", "Aja", "Kusao", "5555555555", "g@h.i", ""),
                new Client(1, "Akemi Shiraki", "Akemi", "Shiraki", "6666666666", "", ""),
            ];
            resolve(data);
        });
    }
}