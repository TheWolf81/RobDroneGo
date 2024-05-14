import { Repo } from "../../core/infra/Repo";
import { Elevator } from "../../domain/Elevator/Elevator";
import { IElevatorDTO } from "../../dto/IElevatorDTO";

export default interface IElevatorRepo extends Repo<Elevator> {
    save(elevator: Elevator): Promise<Elevator>;
    findByDomainId(elevatorId: string | number): Promise<Elevator>;
    findByBuildingId(buildingId: string | number): Promise<IElevatorDTO[]>;
}
