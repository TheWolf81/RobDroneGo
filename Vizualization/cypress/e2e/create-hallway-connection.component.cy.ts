describe('Create  Hallway ConnectionComponent Cypress Test', () => {
    it('Should create Hallway Connection: Valid parameters', () => {
        cy.visit('hallwayConnection/create');
        // Fill in the form inputs
        cy.get('#FloorId1').select('pisooo');
        cy.get('#FloorId2').select('test2');
    });
    it('Should not create Hallway Connection: floors in the same building', () => {
        cy.visit('hallwayConnection/create');
        // Fill in the form inputs
        cy.get('#FloorId1').select('test');
        cy.get('#FloorId2').select('test2');
    });
  
});