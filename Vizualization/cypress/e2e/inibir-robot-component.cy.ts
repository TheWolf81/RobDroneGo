describe('inibir Robot Component Cypress Test', () => {
    it('Should inibir a Robot: Valid parameters', () => {
        cy.visit('/robot/inhibit');
        // Fill in the form inputs
        cy.get('#domainId').select('testMock');
    });
  
});