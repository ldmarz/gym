import {connect} from "ts-nats";
import IError from "../entities/IError";
import IRoutine from "../entities/IRoutine";

export async function save(routine: IRoutine): Promise<IRoutine | IError> {
    const nc = await connect({servers: ["nats://localhost:4222"]});
    nc.publish("greeting", JSON.stringify(routine));

    nc.subscribe("greeting", (err, msg) => {
        if (err) {
            console.log("error", err);
        } else {
            console.log(msg.data);
        }
    });

    return Promise.resolve(routine);
}
