// tslint:disable:object-literal-sort-keys
import { ObjectId } from "bson";
import {Document, model, Model, Schema} from "mongoose";
import formatError from "../adapters/formatError";
import IError from "../entities/IError";
import IRoutine from "../entities/IRoutine";

export interface IRoutineMongo extends IRoutine, Document {
    _id: ObjectId;
    createdAt: Date;
}

function getRoutineRepository(): Model<IRoutineMongo> {
    const schema = new Schema(
        {
            name: String,
            createdAt: { type: Date, default: Date.now },
        },
        { versionKey: false },
    );

    return model<IRoutineMongo>("routine", schema);
}

// TODO: Mejorar el save para que el editor reconozca el uso
// TODO: Esto en verdad retorna es un IRoutineMongo falta el adapter
export async function save(routine: IRoutine): Promise<IRoutine | IError> {
    const routineSchema = getRoutineRepository();
    const routineToSave = new routineSchema({
       name: routine.name,
    });

    try {
        return await routineToSave.save();
    } catch (e) {
        return formatError("Error saving in mongoDB", e);
    }
}
