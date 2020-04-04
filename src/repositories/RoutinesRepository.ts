// tslint:disable:object-literal-sort-keys
import {ObjectId} from "bson";
import {Document, model, Model, Schema} from "mongoose";
import formatError from "../adapters/formatError";
import IError from "../entities/IError";
import IRoutine from "../entities/IRoutine";
import {IRoutineRepository} from "../routineCreator/RoutineCreator";

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

export class RoutinesRepository implements IRoutineRepository {
   public async save(routine: IRoutine): Promise<IRoutine> {
        try {
            const routineSchema = getRoutineRepository();
            const routineToSave = new routineSchema({
                name: routine.name,
            });

            return await routineToSave.save();
        } catch (e) {
            throw new IError("Error saving in mongoDB", e);
        }
    }
}
