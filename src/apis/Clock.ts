// clock in/out APIs

export class Clock {
    empId: number;
    cIn: Date | null;
    cOut: Date | null;

    constructor({ empId = -1, cIn = null, cOut = null }: any = {}) {
        this.empId = empId;
        this.cIn = cIn;
        this.cOut = cOut;
    }

    public static GetClocks(): Promise<Clock> {
        return new Promise((resolve, reject) => {
            const data: Clock = new Clock({ empId: 1 });
            // const data: Clock = new Clock({ empId: 1, cIn: new Date() });
            // const data: Clock = new Clock({ empId: 1, cIn: new Date(), cOut: new Date() });
            resolve(data);
        });
    }
}