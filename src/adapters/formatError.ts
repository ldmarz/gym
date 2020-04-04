import IError from "../entities/IError";

export default function formatError(message: string, error: Error): IError {
    console.debug("Some errors occurred => ", error);

    return {
            message,
            name: error.name,
            stack: error,
            type: "error",
        };
}

export const isError = (object: any): object is IError => {
    return "type" in object && object.type === "error";
};
