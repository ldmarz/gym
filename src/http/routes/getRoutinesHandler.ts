import { Context } from "koa";

export function getRoutinesHandler() {
    return (ctx: Context, next: () => void): void => {
        ctx.body = {hello: "world"};
        next();
    };
}
