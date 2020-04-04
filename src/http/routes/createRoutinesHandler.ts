import {Context} from "koa";
import getRoutineFromContext from "../../adapters/getRoutineFromContext";
import IRoutine from "../../entities/IRoutine";

export interface IRoutineCreator {
    create(routine: IRoutine): Promise<IRoutine>;
}

export function createRoutinesHandler(routineCreator: IRoutineCreator) {
    return async (ctx: Context, next: () => void): Promise<void>  => {
        try {
            const responseFromContext = getRoutineFromContext(ctx) as IRoutine;
            ctx.body = await routineCreator.create(responseFromContext);
            next();
        } catch (error) {
            ctx.throw(error.message, error.code);
        }
    };
}
