describe('Create Robot Component Cypress Test', () => {
    it('Should create a Robot: Valid parameters', () => {
        cy.visit('/robot/create');
        // Fill in the form inputs
        cy.get('#nickname').type('testMock');
        cy.get('#stateOfRobot').type('true');
        cy.get('#typeOfRobotId').select('brand model');
    });
  

});