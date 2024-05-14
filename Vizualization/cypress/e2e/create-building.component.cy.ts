describe('Create Building Component Cypress Test', () => {

    it('Should create a building: Valid parameters', () => {
        cy.visit('/building/create')
        // Fill in the form inputs
        cy.get('#code').type('TEST');
        cy.get('#description').type('Sample Description Cypress');
        cy.get('#max_length').type('1');
        cy.get('#max_width').type('1');
        cy.get('form').submit();
        cy.contains('Building created successfully!');

    });

    it('Should fail to create a building: Code is above 5 chars', () => {
        cy.visit('/building/create')
        // Fill in the form inputs
        cy.get('#code').type('BIGCODEEE');
        cy.get('#description').type('Sample Description');
        cy.get('#max_length').type('100');
        cy.get('#max_width').type('100');
        cy.get('form').submit();
        cy.contains('Failure in Building Creation');

    });


});
