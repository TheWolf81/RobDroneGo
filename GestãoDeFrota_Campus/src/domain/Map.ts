import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface MapProps {
    size: string; // width, depth
    map: number[][];
    exits: [[number, number]]; 
    elevators: [[number, number]];
    exitLocation: [[number, number]];
  }
  
  export class Map implements MapProps {
    private data: MapProps;
  
    constructor(data: MapProps) {
      this.data = data;
    }
  
    get size(): string {
      return this.data.size;
    }
  
    get map(): number[][] {
      return this.data.map;
    }
  
    get exits(): [[number, number]] {
      return this.data.exits;
    }
  
    get elevators(): [[number, number]] {
      return this.data.elevators;
    }
  
    get exitLocation():[ [number, number] ]{
      return this.data.exitLocation;
    }
  
    static fromJSON(jsonData: string): Map {
      const data: MapProps = JSON.parse(jsonData);
      return new Map(data);
    }
  
    toJSON(): string {
      return JSON.stringify(this.data);
    }

    public static create(props: MapProps): Result<Map> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.size, argumentName: 'size' },
            { argument: props.map, argumentName: 'map' },
            { argument: props.exits, argumentName: 'exits' },
            { argument: props.elevators, argumentName: 'elevators' },
            { argument: props.exitLocation, argumentName: 'exitLocation' },
        ]);

        if (!guardResult.succeeded) {
            return Result.fail<Map>(guardResult.message);
        }

        const map = new Map(props);

        return Result.ok<Map>(map);
    }

    






    /* On the create, props should be a raw text like:
     {
    "maze": {
        "size": { "width": 8, "depth": 7 },
        "map": [
            [3, 2, 2, 2, 2, 3, 2, 2, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 1],
            [2, 2, 2, 0, 2, 2, 0, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 2, 2, 2, 2, 2, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0],
            [1, 0, 0, 0, 0, 0, 1, 0, 0],
            [2, 2, 2, 2, 2, 2, 2, 2, 0]
        ],
        "exits": [
            [2.0, -1.0],
            [5.0, 8.0]
        ],
        "elevators": [
            [2.0, 8.0]
        ],
        "exitLocation": [2.0, 8.0]
    },
}
*/

  }
