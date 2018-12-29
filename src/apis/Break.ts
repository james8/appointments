// break APIs

export class Break {
    id: number;
    title: string;
    description: string;

    constructor({ id = -1, title = "", description = "" }: any = {}) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    public static GetBreaks(): Promise<Array<Break>> {
        return new Promise((resolve, reject) => {
            const data: Array<Break> = [
                new Break({ id: 0, title: "Lunch", description: "Lunch break" })
            ];
            resolve(data);
        });
    }
}