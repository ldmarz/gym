import buildCreateFunction from "./routineCreator/createRoutines";
import RoutineCreator from "./routineCreator/createRoutines";
import {IHandlers, startHttpServer} from "./http/http";
import {createRoutinesHandler} from "./http/routes/createRoutinesHandler";
import {getRoutinesHandler} from "./http/routes/getRoutinesHandler";
import openMongoConnection from "./initializers/mongodb";
import {RoutinesRepository} from "./repositories/routinesRepository";

async function main() {
    // TODO: Mover todo esto al paquete initializers
    openMongoConnection();

    // TODO: Edward dice que mejorara estos nombres
    const routineRepository = new RoutinesRepository();
    const routineCreator = new RoutineCreator(routineRepository);

    const handlers: IHandlers = {
        createRoutines: {method: "POST", path: "/", handler: createRoutinesHandler(routineCreator)},
        getRoutines: {method: "GET", path: "/", handler: getRoutinesHandler()},
    };

    startHttpServer(handlers);
}

main();
