import formatError, {isError} from "../adapters/formatError";
import IError from "../entities/IError";
import IRoutine from "../entities/IRoutine";
import {IRoutineCreator} from "../http/routes/createRoutinesHandler";

interface IRoutineRepository {
    save(routine: IRoutine): Promise<IRoutine | IError>;
}

export default class RoutineCreator implements IRoutineCreator {
    private routineRepository: IRoutineRepository;

    constructor(routineRepository: IRoutineRepository) {
        this.routineRepository = routineRepository;
    }

    public async create(routine: IRoutine): Promise<IRoutine | IError> {
        try {
            const savedRoutine = await this.routineRepository.save(routine);
            if (isError(savedRoutine)) {
                return formatError("Cannot save the routine in repository", savedRoutine);
            }
            return savedRoutine;
        } catch (e) {
            return formatError("Something unexpected saving routine", e);
        }
    }
}
