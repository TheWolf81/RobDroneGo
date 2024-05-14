describe('edit  Hallway ConnectionComponent Cypress Test', () => {
    it('Should edit a Hallway Connection: Valid parameters', () => {
        cy.visit('hallwayConnection/edit');
        // Fill in the form inputs
        cy.get('#FloorId1').select('pisooo');
        cy.get('#FloorId2').select('test2');
        cy.get('#DomainId').select('51d561cf-dce7-4eaf-8347-3e9ef36f2d09');
    });
    it('Should not edit Hallway Connection: floors in the same building', () => {
        cy.visit('hallwayConnection/edit');
        // Fill in the form inputs
        cy.get('#FloorId1').select('test');
        cy.get('#FloorId2').select('test2');
        cy.get('#DomainId').select('51d561cf-dce7-4eaf-8347-3e9ef36f2d09');
    });
  
});