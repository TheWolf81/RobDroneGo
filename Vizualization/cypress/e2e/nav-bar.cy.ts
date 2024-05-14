describe('Nav Bar Component Cypress Test', () => {
    it('Should navigate to the login page', () => {
        cy.visit('/login?returnUrl=%2F')
        cy.get('a[routerLink="/auth"]').should('exist');
        cy.get('a[routerLink="/auth"]').should('contain.text', 'Account');

        cy.get('a[routerLink="/privacyPolicyAndTermsOfUse"]').click();
        cy.get('a[routerLink="/privacyPolicyAndTermsOfUse"]').should('contain.text', 'Privacy Policy & Terms of Use');

        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth/register"]').should('exist');
        cy.get('a[routerLink="/auth/deleteAccount"]').should('exist');

        cy.get('a[routerLink="/auth/editAccount"]').should('not.exist');
        // ... other components that should not be visible
    });

    it('When logged in with a client account, nav bar components should change', () => {
        cy.visit('/login?returnUrl=%2F')
        cy.get('#email').type('client@isep.ipp.pt');
        cy.get('#password').type('client12');
        cy.get('form').submit();

        //cy.get('a[routerLink="/auth"]').should('not.exist');
        cy.get('a[routerLink="/task"]').should('exist');
        cy.get('a[routerLink="/task"]').should('contain.text', 'Task');

        cy.get('a[routerLink="/building"]').should('not.exist');
        cy.get('a[routerLink="/floor"]').should('not.exist');
        cy.get('a[routerLink="/room"]').should('not.exist');
        // ... other components that should not be visible

        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth/editAccount"]').should('exist');
        cy.get('form').should('contain.text', 'Download Data');
        cy.get('form').should('contain.text', 'LogOut');

        cy.get('a[routerLink="/task"]').click();
        cy.get('a[routerLink="/task/requestTask"]').should('exist');
        cy.get('a[routerLink="/task/requestTask"]').should('contain.text', 'Request a Task');

        cy.get('a[routerLink="/task/viewPath"]').should('not.exist');
        cy.get('a[routerLink="/task/approveDenyTasks"]').should('not.exist');
        cy.get('a[routerLink="/task/showRequestedTasks"]').should('not.exist');
        cy.get('a[routerLink="/task/listTasksFiltered"]').should('not.exist');

        cy.visit('/building');
        cy.contains('UNAUTHORIZED');
        cy.get('a[routerLink="/"]').should('exist');
        // ... other components that should show UNAUTHORIZED
    });

    it('When logged in with a admin account, nav bar should contain all components', () => {
        cy.visit('/login?returnUrl=%2F')
        cy.get('#email').type('agv@isep.ipp.pt');
        cy.get('#password').type('jsmith123*');
        cy.get('form').submit();

        cy.get('a[routerLink="/task"]').should('exist');
        cy.get('a[routerLink="/task"]').should('contain.text', 'Task');

        cy.get('a[routerLink="/building"]').should('exist');
        cy.get('a[routerLink="/floor"]').should('exist');
        cy.get('a[routerLink="/room"]').should('exist');
        cy.get('a[routerLink="/elevator"]').should('exist');
        cy.get('a[routerLink="/robot"]').should('exist');
        cy.get('a[routerLink="/typeOfRobot"]').should('exist');
        cy.get('a[routerLink="/hallwayConnection"]').should('exist');
        cy.get('a[routerLink="/3DVisualization"]').should('exist');

        //for building
        cy.visit('/building');
        cy.get('a[routerLink="/building/create"]').should('exist');
        cy.get('a[routerLink="/building/create"]').should('contain.text', 'Create Building');
        cy.get('a[routerLink="/building/edit"]').should('exist');
        cy.get('a[routerLink="/building/edit"]').should('contain.text', 'Edit Building');
        cy.get('a[routerLink="/building/list"]').should('exist');
        cy.get('a[routerLink="/building/list"]').should('contain.text', 'List Buildings');
        cy.get('a[routerLink="/building/listMaxMinFloors"]').should('exist');
        cy.get('a[routerLink="/building/listMaxMinFloors"]').should('contain.text', 'List Buildings by Max and Min Floors');
        
        cy.get('a[routerLink="/building/create"]').click();
        cy.contains('Create a New Building');

        // ... other components should be visible

        //for auth
        cy.visit('/auth');
        cy.get('a[routerLink="/auth/register"]').should('exist');
        //cy.get('a[routerLink="/auth/editAccount"]').should('exist');
        //cy.get('a[routerLink="/auth/approveOrDenyRequests"]').should('contain.text', 'Approve/Deny account requests');

        // do for other components
    });

    it('When logged in with a fleet manager account, nav bar should change', () => {
        cy.visit('/login?returnUrl=%2F')
        cy.get('#email').type('fm@isep.ipp.pt');
        cy.get('#password').type('fleet123');

        cy.get('form').submit();

        cy.get('a[routerLink="/robot"]').should('exist');
        cy.get('a[routerLink="/typeOfRobot"]').should('exist');
        cy.get('a[routerLink="/auth"]').should('exist');

        cy.get('a[routerLink="/building"]').should('not.exist');
        // ... other components that should not be visible

        cy.get('a[routerLink="/robot"]').click();

        cy.get('a[routerLink="/robot/create"]').should('exist');
        cy.get('a[routerLink="/robot/inhibit"]').should('exist');
        cy.get('a[routerLink="/robot/list"]').should('exist');
        cy.get('a[routerLink="/robot/create"]').should('contain.text', 'Create Robot');
        cy.get('a[routerLink="/robot/inhibit"]').should('contain.text', 'Inhibit Robot');
        cy.get('a[routerLink="/robot/list"]').should('contain.text', 'Consult all Robots');

        cy.get('a[routerLink="/robot/create"]').click();
        cy.contains('Create a New Robot');

        cy.visit('/robot');
        cy.get('a[routerLink="/robot/inhibit"]').click();
        cy.contains('Inhibir a Robot');
        
        cy.visit('/robot');
        cy.get('a[routerLink="/robot/list"]').click();
        cy.contains('Consult all Robots');

        cy.get('a[routerLink="/typeOfRobot"]').click();

        cy.get('a[routerLink="/typeOfRobot/create"]').should('exist');
        cy.get('a[routerLink="/typeOfRobot/create"]').should('contain.text', 'Create Type of Robot');
        cy.get('a[routerLink="/typeOfRobot/create"]').click();
        cy.contains('Create a New Type of Robot');


        cy.visit('/building');
        cy.contains('UNAUTHORIZED');
        cy.get('a[routerLink="/"]').should('exist');
        // ... other components that should show UNAUTHORIZED
    });

    it('When logged in with a task manager account, nav bar should change', () => {
        cy.visit('/login?returnUrl=%2F')
        cy.get('#email').type('tm@isep.ipp.pt');
        cy.get('#password').type('task1234');

        cy.get('form').submit();

        cy.get('a[routerLink="/task"]').should('exist');
        cy.get('a[routerLink="/task"]').should('contain.text', 'Task');

        cy.get('a[routerLink="/task"]').click();

        cy.get('a[routerLink="/task/approveDenyTasks"]').should('exist');
        cy.get('a[routerLink="/task/approveDenyTasks"]').should('contain.text', 'Aprove or Deny Task Requests');

        cy.get('a[routerLink="/task/showRequestedTasks"]').should('exist');
        cy.get('a[routerLink="/task/showRequestedTasks"]').should('contain.text', 'Show Requested Tasks');

        cy.get('a[routerLink="/task/listTasksFiltered"]').should('exist');
        cy.get('a[routerLink="/task/listTasksFiltered"]').should('contain.text', 'List Tasks With Filters');

        cy.get('a[routerLink="/task/approveDenyTasks"]').click();
        cy.contains('Approve/Deny Task Requests');

        // do for other components

        cy.visit('/building');
        cy.contains('UNAUTHORIZED');
        cy.get('a[routerLink="/"]').should('exist');
        // ... other components that should show UNAUTHORIZED
    });

    it('When logged in with a campus manager account, nav bar should change', () => {
        cy.visit('/login?returnUrl=%2F')
        cy.get('#email').type('cm@isep.ipp.pt');
        cy.get('#password').type('Campus12');

        cy.get('form').submit();

        cy.get('a[routerLink="/building"]').should('exist');
        cy.get('a[routerLink="/building"]').should('contain.text', 'Building');
        cy.get('a[routerLink="/floor"]').should('exist');
        cy.get('a[routerLink="/floor"]').should('contain.text', 'Floor');
        cy.get('a[routerLink="/room"]').should('exist');
        cy.get('a[routerLink="/room"]').should('contain.text', 'Room');
        cy.get('a[routerLink="/elevator"]').should('exist');
        cy.get('a[routerLink="/elevator"]').should('contain.text', 'Elevator');
        cy.get('a[routerLink="/hallwayConnection"]').should('exist');
        cy.get('a[routerLink="/hallwayConnection"]').should('contain.text', 'Hallway Connection');
        cy.get('a[routerLink="/3DVisualization"]').should('exist');
        cy.get('a[routerLink="/3DVisualization"]').should('contain.text', '3D Visualization');

        cy.get('a[routerLink="/building"]').click();
        cy.get('a[routerLink="/building/create"]').should('exist');
        cy.get('a[routerLink="/building/create"]').should('contain.text', 'Create Building');
        cy.get('a[routerLink="/building/create"]').click();
        cy.contains('Create a New Building');
        // do for other components

        cy.visit('/task');
        cy.contains('UNAUTHORIZED');
        cy.get('a[routerLink="/"]').should('exist');
        cy.get('a[routerLink="/task"]').should('not.exist');
    });
});