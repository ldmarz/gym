import {Context} from "koa";
import IError from "../entities/IError";
import IRoutine from "../entities/IRoutine";
import formatError from "./formatError";

export default function getRoutineFromContext(ctx: Context): IRoutine | IError {
    try {
        return {
            name: ctx.request.body.name,
        };

    } catch (e) {
        return formatError("Cannot get routine from context", e);
    }
}
