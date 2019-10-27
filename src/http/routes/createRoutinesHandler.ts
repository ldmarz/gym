import {Context} from "koa";
import {isError} from "../../adapters/formatError";
import getRoutineFromContext from "../../adapters/getRoutineFromContext";
import IError from "../../entities/IError";
import IRoutine from "../../entities/IRoutine";

interface IRoutineCreator {
    create(routine: IRoutine): Promise<IRoutine | IError>;
}

export function createRoutinesHandler(routineCreator: IRoutineCreator) {
    return async (ctx: Context, next: () => void): Promise<void>  => {
        const responseFromContext = getRoutineFromContext(ctx);
        if (isError(responseFromContext)) {
            // TODO: Agregar libreria httpCode
            ctx.throw(responseFromContext.message, 500);
        }

        const routineFromCreator = await routineCreator.create(responseFromContext as IRoutine);
        if (isError(routineFromCreator)) {
            ctx.throw(routineFromCreator.message, 500);
        }

        ctx.body = routineFromCreator;
        next();
    };
}
