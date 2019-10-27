export default interface IError {
    name: string;
    message: string;
    // tslint:disable-next-line:ban-types
    stack?: Object;
    type: string;
}
