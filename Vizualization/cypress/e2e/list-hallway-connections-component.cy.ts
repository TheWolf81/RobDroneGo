describe('list  Hallway Connections Component Cypress Test', () => {
    it('Should list Hallway Connection: Valid parameters', () => {
        cy.visit('hallwayConnection/list');
        // Fill in the form inputs
        cy.get('#BuildingId2').select('Xiooo');
        cy.get('#BuildingId2').select('D');
    });
   
  
});