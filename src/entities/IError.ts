export default class IError extends Error {
    public type: string;

    constructor(message: string, stack: string) {
        super(message);
        this.stack = stack;
        this.type = "error";
    }
}
