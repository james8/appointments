// tips APIs

export class Tip {
    public static GetSubmittedTips(): Promise<Array<number>> {
        return new Promise((resolve, reject) => {
            const data: Array<number> = [ 2 ];
            resolve(data);
        });
    }
}