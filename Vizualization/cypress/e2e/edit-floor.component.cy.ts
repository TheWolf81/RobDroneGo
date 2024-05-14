describe('Edit Floor Component Cypress Test', () => {

    it('Should edit a floor: Valid parameters', () => {
    cy.visit('/floor/edit');

    // Fill in the form inputs
    cy.get('#buildingId').select('D');
    cy.get('#floorId').select('name');
    cy.get('#floorName').type('name');
    cy.get('#floorDescription').type('New Floor Description');

    // Submit the form
    cy.get('form').submit();

    cy.get('.success-message').should('be.visible');
  });

    it('Should fail to edit a floor: Floor name is above 255 chars', () => {
        cy.visit('/floor/edit');
    
        // Fill in the form inputs
        cy.get('#buildingId').select('D');
        cy.get('#floorId').select('name');
        cy.get('#floorName').type('name');
        const description = 'Sample Description'.repeat(50);
        cy.get('#floorDescription').type(description);
    
        // Submit the form
        cy.get('form').submit();
    
        // Check that failed
        cy.contains('Failed to edit floor. Please try again later.');
    });

});