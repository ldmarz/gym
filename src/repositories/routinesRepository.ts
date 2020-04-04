// tslint:disable:object-literal-sort-keys
import {ObjectId} from "bson";
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

export class RoutinesRepository {
   public async save(routine: IRoutine): Promise<IRoutine | IError> {
        try {
            const routineSchema = getRoutineRepository();
            const routineToSave = new routineSchema({
                name: routine.name,
            });

            return await routineToSave.save();
        } catch (e) {
            return formatError("Error saving in mongoDB", e);
        }
    }
}
