import formatError from "../../../src/adapters/formatError";
import IError from "../../../src/entities/IError";
import IRoutine from "../../../src/entities/IRoutine";
import {IRoutineRepository} from "../../../src/routineCreator/createRoutines";
import RoutineCreator from "../../../src/routineCreator/RoutineCreator";

class MockIRoutineRepository implements IRoutineRepository {
    public shouldReturnError: boolean;

    constructor(shouldReturnError: boolean) {
        this.shouldReturnError = shouldReturnError;
    }

    public async save(routine: IRoutine): Promise<IRoutine | IError> {
        if (this.shouldReturnError) {
            return formatError("some error occurred", new Error());
        }
        return routine;
    }
}

test("Should return routine if is created successfully", async () => {
    const mockRepository = new MockIRoutineRepository(false);
    const routineCreator = new RoutineCreator(mockRepository);
    const routine: IRoutine = {
        name: "la rutina",
    };

    const result = await routineCreator.create(routine);

    expect(result.name).toEqual("la rutina");
});

test("Should return format Error if routine creator fails", async () => {
    const mockRepository = new MockIRoutineRepository(true);
    const routineCreator = new RoutineCreator(mockRepository);
    const routine: IRoutine = {
        name: "la rutina",
    };

    const result = await routineCreator.create(routine) as IError;

    expect(result.type).toEqual("error");
});
