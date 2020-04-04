import IError from "../entities/IError";

export default function formatError(message: string, stack: string): IError {
    console.debug("Some errors occurred => ", stack);
    return new IError(message, stack);
}

export const isError = (object: any): object is IError => {
    return "type" in object && object.type === "error";
};
