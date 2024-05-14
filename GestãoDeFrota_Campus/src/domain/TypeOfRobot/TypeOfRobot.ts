import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

import { TypeOfRobotModel } from "./TypeOfRobotModel";
import { Brand } from "./Brand";
import { TaskType } from "./TaskType";

interface TypeOfRobotProps{
     brand: Brand;
     model: TypeOfRobotModel;
     taskType: TaskType[];
}

export class TypeOfRobot extends AggregateRoot<TypeOfRobotProps>{
      get id(): UniqueEntityID{
            return this._id;
      }
  
      get brand(): Brand{
            return this.props.brand;
      }
  
      get model(): TypeOfRobotModel{
            return this.props.model;
      }
  
      get taskType(): TaskType[]{
            return this.props.taskType;
      }

      set brand(value: Brand){
            this.props.brand = value;
      }

      set model(value: TypeOfRobotModel){
            this.props.model = value;
      }

      set taskType(value: TaskType[]){
            this.props.taskType = value;
      }
  
      public static create(props: TypeOfRobotProps, id?: UniqueEntityID): Result<TypeOfRobot>{
            const guardedProps = [
                { argument: props.brand, argumentName: 'brand' },
                { argument: props.model, argumentName: 'model' },
                { argument: props.taskType, argumentName: 'taskType' }
            ];

            if(props.taskType.length > 2 || props.taskType.length < 1){
                  return Result.fail<TypeOfRobot>('A type of robot must have at least one task type and at most two task types.');
            }
  
            const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

            if(!guardResult.succeeded){
                return Result.fail<TypeOfRobot>(guardResult.message);
            }else{
                const typeOfRobot = new TypeOfRobot({
                      ...props
                }, id);
  
                return Result.ok<TypeOfRobot>(typeOfRobot);
            }
      }
}