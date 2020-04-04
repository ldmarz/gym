import formatError, {isError} from "../adapters/formatError";
import IError from "../entities/IError";
import IRoutine from "../entities/IRoutine";
import {IRoutineCreator} from "../http/routes/createRoutinesHandler";

export interface IRoutineRepository {
    save(routine: IRoutine): Promise<IRoutine>;
}

export default class RoutineCreator implements IRoutineCreator {
    private routineRepository: IRoutineRepository;

    constructor(routineRepository: IRoutineRepository) {
        this.routineRepository = routineRepository;
    }

    public async create(routine: IRoutine): Promise<IRoutine> {
        try {
            return await this.routineRepository.save(routine);
        } catch (e) {
            throw new IError("Cannot save the routine in repository", e);
        }
    }
}
