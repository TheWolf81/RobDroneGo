describe('Create Elevator Component Cypress Test', () => {
    it('Should create an elevator: Valid parameters', () => {
        cy.visit('/elevator/create')
        // Fill in the form inputs
        cy.get('#building_id').select('FAAA');
        cy.get('#floorId').select('test');
        cy.get('#floorId').select('test2');
        cy.get('#description').type('normal description');
        cy.get('form').submit();
        cy.contains('Elevator created successfully!');
    });
});
