import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import robot from './routes/RobotRoute';
import building from './routes/buildingRoute';
import floor from './routes/FloorRoute';
import room from './routes/roomRoute';
import hallwayConnection from'./routes/HallwayConnectionRoute';
import elevator from './routes/elevatorRoute';
import typeOfRobot from './routes/typeOfRobotRoute';
import write from './routes/WriteRoute';
import task from './routes/taskRoute';
import { type } from 'os';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	robot(app);
	building(app);
	floor(app);
	room(app);
	hallwayConnection(app);
	elevator(app);
	typeOfRobot(app);
	write(app);
	task(app)
	
	return app
}