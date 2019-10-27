import Koa, {Context} from "koa";
import bodyParser = require("koa-bodyparser");
import json from "koa-json";
import logger from "koa-logger";
import Router from "koa-router";

export interface IMapRoute {
    method: "GET" | "POST";
    path: string;
    handler: (ctx: Context, next: () => void) => void;
}

export interface IHandlers {
    [key: string]: IMapRoute;
}

export function startHttpServer(mapMiddleware: IHandlers) {
    const app = new Koa();
    const appRouter = new Router();

    Object.keys(mapMiddleware).forEach((key) => {
        const middleware = mapMiddleware[key];

       // @ts-ignore
        appRouter[middleware.method.toLowerCase()](middleware.path, middleware.handler);
    });

    app.use(json());
    app.use((logger()));
    app.use((bodyParser()));

    app.use(appRouter.routes()).use(appRouter.allowedMethods());

    app.listen(3000, () => {
        console.log("App started on port 3000");
    });
}
