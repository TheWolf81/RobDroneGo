describe('Approve or Deny Requests Component Cypress Test', () => {
    // make sure the correct data is in the database before running these tests
    it('Should approve a request', () => {
        cy.visit('/login?returnUrl=%2F');

        // Fill in the form inputs
        cy.get('#email').type('agv@isep.ipp.pt');
        cy.get('#password').type('jsmith123*');

        // Submit the form
        cy.get('form').submit();

        // Ensure Angular is stable before interacting with the form
        cy.wait(1000); // Adjust the wait time as needed

        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth"]').click();
        
        cy.get('a[routerLink="/auth/approveOrDenyRequests"]').click();

        cy.get('#userEmail').select('test@isep.ipp.pt');

        // Ensure Angular is stable before interacting with the form
        cy.wait(1000); // Adjust the wait time as needed

        cy.contains('User Information');

        cy.get('#newStatus').select('Approved');

        // Submit the form
        cy.get('form').submit();

        // Wait for the success message to appear
        cy.contains('Successfully updated user status.').should('exist');
    });

    it('Should deny a request', () => {
        cy.visit('/login?returnUrl=%2F');

        // Fill in the form inputs
        cy.get('#email').type('agv@isep.ipp.pt');
        cy.get('#password').type('jsmith123*');

        // Submit the form
        cy.get('form').submit();

        // Ensure Angular is stable before interacting with the form
        cy.wait(1000); // Adjust the wait time as needed

        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth"]').click();
        
        cy.get('a[routerLink="/auth/approveOrDenyRequests"]').click();

        cy.get('#userEmail').select('test2@isep.ipp.pt');

        // Ensure Angular is stable before interacting with the form
        cy.wait(1000); // Adjust the wait time as needed

        cy.contains('User Information');

        cy.get('#newStatus').select('Denied');

        // Submit the form
        cy.get('form').submit();

        // Wait for the success message to appear
        cy.contains('Successfully updated user status.').should('exist');
    });

    it('Should fail to handle a request: parameter missing (1)', () => {
        cy.visit('/login?returnUrl=%2F');

        // Fill in the form inputs
        cy.get('#email').type('agv@isep.ipp.pt');
        cy.get('#password').type('jsmith123*');

        // Submit the form
        cy.get('form').submit();

        // Ensure Angular is stable before interacting with the form
        cy.wait(1000); // Adjust the wait time as needed

        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth"]').click();
        
        cy.get('a[routerLink="/auth/approveOrDenyRequests"]').click();

        cy.get('#newStatus').select('Denied');

        // Submit the form
        cy.get('form').submit();

        cy.contains('Could not update user status. Please review the form.');
    });


 it('Should fail to handle a request: parameter missing (2)', () => {
        cy.visit('/login?returnUrl=%2F');

        // Fill in the form inputs
        cy.get('#email').type('agv@isep.ipp.pt');
        cy.get('#password').type('jsmith123*');

        // Submit the form
        cy.get('form').submit();

        // Ensure Angular is stable before interacting with the form
        cy.wait(1000); // Adjust the wait time as needed

        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth"]').click();
        
        cy.get('a[routerLink="/auth/approveOrDenyRequests"]').click();

        cy.get('#userEmail').select('test3@isep.ipp.pt');

        // Submit the form
        cy.get('form').submit();

        cy.contains('Could not update user status. Please review the form.');
    });

});
