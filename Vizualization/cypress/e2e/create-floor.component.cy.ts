describe('Create Floor Component Cypress Test', () => {

    it('Should create a floor: Valid parameters', () => {
        cy.visit('/floor/create')
        // Fill in the form inputs
        cy.get('#buildingId').select('YOO'); // Replace 'YourBuildingId' with an actual building ID
        cy.get('#floorNumber').type('1');
        cy.get('#description').type('Sample Description Cypress');
        cy.get('#area').type('100');
        cy.get('#name').type('Sample Name Cypress');
        cy.get('#floorMap').type('[]');

        // Submit the form
        cy.get('form').submit();

        // Check that the floor was created
        cy.contains('Floor created successfully!');
        
    });

    // it must not have two floors with the same name and number in the same building
    it('Should fail to create a floor: Area is zero', () => {
        cy.visit('/floor/create')
        // Fill in the form inputs
        cy.get('#buildingId').select('D');
        cy.get('#floorNumber').type('1');
        cy.get('#description').type('Sample Description');
        cy.get('#area').type('0');
        cy.get('#name').type('Sample Name');
        cy.get('#floorMap').type('[]');

        // Submit the form
        cy.get('form').submit();

        // Check that failed
        cy.contains('Failed to create floor. Please try again later.');
        
    });

    it('Should fail to create a floor: description is above 255 chars' , () => {
        cy.visit('/floor/create')
        // Fill in the form inputs
        cy.get('#buildingId').select('D');
        cy.get('#floorNumber').type('1');
        const description = 'Sample Description'.repeat(50);
        cy.get('#description').type(description);
        cy.get('#area').type('100');
        cy.get('#name').type('Sample Name');
        cy.get('#floorMap').type('[]');

        // Submit the form
        cy.get('form').submit();

        // Check that failed
        cy.contains('Failed to create floor. Please try again later.');

    });

});