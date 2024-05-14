describe("Delete Account Component Cypress test", () => {
    it("Should not delete account if password does not match", () => {
        cy.visit('/login?returnUrl=%2F');

        // Fill in the form inputs
        cy.get('#email').type('editedcy@isep.ipp.pt');
        cy.get('#password').type('cyPRESS1');

        // Submit the form
        cy.get('form').submit();
        cy.wait(1000);
        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth/deleteAccount"]').click();

        cy.get('#email').type('editedcy@isep.ipp.pt');
        cy.get('#password').type('asiodjhfr');
        cy.get('form').submit();
        cy.contains('Email - Password combination did not match');
    });

    it("Should delete account", () => {
        cy.visit('/login?returnUrl=%2F');

        // Fill in the form inputs
        cy.get('#email').type('editedcy@isep.ipp.pt');
        cy.get('#password').type('cyPRESS1');

        // Submit the form
        cy.get('form').submit();

        // Ensure Angular is stable before interacting with the form
         // Adjust the wait time as needed
        cy.wait(1000);
        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth/deleteAccount"]').click();

        cy.get('#email').type('editedcy@isep.ipp.pt');
        cy.get('#password').type('cyPRESS1');
        cy.get('form').submit();
        cy.contains('Account deleted successfully!');

    });

    it("Should not delete account if email does not exist", () => {
        cy.visit('/login?returnUrl=%2F');

        // Fill in the form inputs
        cy.get('#email').type('cypressa4@cypress.com');
        cy.get('#password').type('cyPRESS1');

        // Submit the form
        cy.get('form').submit();
        cy.wait(1000);
        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth/deleteAccount"]').click();

        cy.get('#email').type('cypressa5@cypress.com');
        cy.get('#password').type('cyPRESS1');
        cy.get('form').submit();
        cy.contains('User not found');
    });

    it("Should not delete account if user is not a client", () => {
        cy.visit('/login?returnUrl=%2F');

        // Fill in the form inputs
        cy.get('#email').type('cypressa4@cypress.com');
        cy.get('#password').type('cyPRESS1');

        // Submit the form
        cy.get('form').submit();
        cy.wait(1000);
        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth/deleteAccount"]').click();

        cy.get('#email').type('agv@isep.ipp.pt');
        cy.get('#password').type('jsmith123*');
        cy.get('form').submit();
        cy.contains('User not authorized to delete account');
    });

    


});