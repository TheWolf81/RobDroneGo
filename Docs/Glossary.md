# Glossary

**Terms, Expressions and Acronyms (TEA)**


| **_TEA_** (EN)  | **_TEA_** (PT) | **_Description_** (EN)|                                       
|:----------------|:---------------|:----------------------|
| Drones| Drones | Robots designed with rotating blades able to fly from point to point |
| Robots| Robôs | Generic designation of automated devices that perform tasks (robisep and droneisep) |
| RobDroneGo| RobDroneGo | Name of the system being developed |
| robisep | robisep | Robot that moves with a set of wheels and can move through buildings, including elevators (not stairs) to perform a set of tasks |
| droneisep | droneisep | Drone type robot that move outside the buildings within ISEP, performing a set of tasks |
| System Administrator | Administrador de sistema | User responsible for managing other users and their authorizations |
| Fleet Manager | Gestor de Frota | User responsible for managing robot's data and task types |
| Campus Manager | Gestor de Campus | Manages paths and map data |
| Client | Utente | Generic user (student, teahcer, worker...), can request tasks to be performed by the robots |
| Task Manager | Gestor de Tarefas | User (for this prototype) that manages the task requests, either allocating it to a robot or denying it |
| Task | Tarefa | A robot's duty to perform, has a certain type, depending on what the action will be |
| Task Type | Tipo de Tarefa | Refers to the action being performed in the task; Can be: vigilance, cleaning, object delivery and image acquisition |
| ISEP | ISEP | Instituto Superior de Engenharia do Porto, the institution requesting the software system and enclosure for the robots |
| Campus | Campus | Collection of buildings inside an academic enclosure (in this case, ISEP)  |
| Building | Edifício | Structure with one or more floors, encapsulating Classrooms, Bureaus, Corridors, Elevators and Walls |
| Floor | Piso | Horizontal plane section of a Building, represented by a matrix map, may include classrooms, bureaus, elevators... |
| Elevator | Elevador | Place in the building that allows robisep to move between floors inside a building |
| Passageways | Passagens | Small "bridges" between buildings, represented in the matrix map |
| Bureau | Gabinete | A teacher's dedicated room, represented in the matrix map |
| Classroom | Sala | A room where classes take place, represented in the matrix map |
| Corridor | Corredor | Place within a building where a robisep can move freely to perform its tasks |
| Matrix Map | Mapa matricial | Matrix representation of a floor, has the information needed to guide the robots on the path to their tasks  |
| Cell | Célula | Square sections that together form the matrix map of a floor. It's information determines what that section represents in the map (a wall, a bureau, a door...) |
| Door | Porta | Access to a Classroom or Buraeu, robisep can enter only enter these spaces through doors |
| Wall | Parede | Delimitation of classrooms, bureaus and floors, represented in the matrix map by an N(north) or O (West) |
| Sensors | Sensores  | Possessed by robisep, sensors prevent them from running into objects or people |
