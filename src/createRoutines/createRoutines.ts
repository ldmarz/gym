import formatError, {isError} from "../adapters/formatError";
import IError from "../entities/IError";
import IRoutine from "../entities/IRoutine";

interface IRoutineRepository {
    save(routine: IRoutine): Promise<IRoutine | IError>;
}

export default async function buildCreateFunction(routineRepository: IRoutineRepository) {
    return async (routine: IRoutine): Promise<IRoutine | IError> => {
        try {
            const savedRoutine = await routineRepository.save(routine);
            if (isError(savedRoutine)) {
                return formatError("Cannot save the routine in repository", savedRoutine);
            }
            return savedRoutine;
        } catch (e) {
            return formatError("Something unexpected saving routine", e);
        }
    };
}
