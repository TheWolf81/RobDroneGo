describe("Edit Account Component Cypress test", () => {

    it("Should edit parameters", () => {
        cy.visit('/login?returnUrl=%2F');

        // Fill in the form inputs
        cy.get('#email').type('cypressa5@cypress.com');
        cy.get('#password').type('cyPRESS1');

        // Submit the form
        cy.get('form').submit();
        cy.wait(1000);
        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth/editAccount"]').click();

        cy.get('#firstName').type('newFirstName');
        cy.get('#lastName').type('newLastName');
        cy.get('#username').type('newUsername');
        cy.get('#email').type('editedcy@isep.ipp.pt');
        cy.get('#phoneNumber').type('947786321');
        cy.get('#nif').type('123459999');
        cy.get('form').submit();
        cy.contains('Account edited successfully!');
    });

    it("Should show error if no fields are filled", () => {
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
        cy.get('a[routerLink="/auth/editAccount"]').click();

        
        cy.get('form').submit();
        cy.contains('You must fill at least one field!');
    });

    it("Should show error if email is invalid", () => {
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
        cy.get('a[routerLink="/auth/editAccount"]').click();

        cy.get('#email').type('editedcyisep.ipp.pt');
        cy.get('form').submit();
        cy.contains('Email must contain only one @ and one . character');
    });

    it("Should show error if phone number is invalid", () => {
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
        cy.get('a[routerLink="/auth/editAccount"]').click();

        cy.get('#phoneNumber').type('947786321a');
        cy.get('form').submit();
        cy.contains('Phone number is not valid');
    });

    it("Should show error if nif is invalid", () => {
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
        cy.get('a[routerLink="/auth/editAccount"]').click();

        cy.get('#nif').type('123459999a');
        cy.get('form').submit();
        cy.contains('Nif is not valid');
    });

    it("Should show error if email already exists", () => {
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
        cy.get('a[routerLink="/auth/editAccount"]').click();

        cy.get('#email').type('cypressa4@cypress.com');
        cy.get('form').submit();
        cy.contains('Email already in use');
    });

    it("Should show error if phone number already exists", () => {
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
        cy.get('a[routerLink="/auth/editAccount"]').click();

        cy.get('#phoneNumber').type('915236478');
        cy.get('form').submit();
        cy.contains('Phone number already in use');
    });

    it("Should show error if nif already exists", () => {
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
        cy.get('a[routerLink="/auth/editAccount"]').click();

        cy.get('#nif').type('445123698');
        cy.get('form').submit();
        cy.contains('NIF already in use');
    });

    it("Should show error if username already exists", () => {
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
        cy.get('a[routerLink="/auth/editAccount"]').click();

        cy.get('#username').type('cypressa4');
        cy.get('form').submit();
        cy.contains('Username already in use');
    });

});