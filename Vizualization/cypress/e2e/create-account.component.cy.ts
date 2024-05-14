describe('Create Account Component Cypress Test', () => {
    // make sure the correct data is in the database before running these tests
    it('Should create an account: Valid parameters', () => {
        cy.visit('/auth/register')
        // Fill in the form inputs
        cy.get('#firstName').type('cypress');
        cy.get('#lastName').type('cypress');
        cy.get('#email').type('cypress@cypress.com');
        cy.get('#password').type('cyPRESS1');
        cy.get('#username').type('cypress');
        cy.get('#nif').type('223456789');
        cy.get('#phoneNumber').type('963456789');

        cy.get('#agree').check();

        // Submit the form
        cy.get('form').submit();

        // Check that the account was created
        cy.contains('Request registered successfully!');
        
    }
    );

    it('Should fail to create an account: Must agree with privacy policy', () => {
        cy.visit('/auth/register')
        // Fill in the form inputs
        cy.get('#firstName').type('cypress');
        cy.get('#lastName').type('cypress');
        cy.get('#email').type('cypress@cypress.com');
        cy.get('#password').type('cyPRESS1');
        cy.get('#username').type('cypress');
        cy.get('#nif').type('223456789');
        cy.get('#phoneNumber').type('963456789');

        //cy.get('#agree').check();

        // Submit the form
        cy.get('form').submit();

        // Check error message
        cy.contains('You must agree with the privacy policy and terms of use.');
    }
    );

    it('Should fail to create an account: email already exists', () => {
        cy.visit('/auth/register')
        // Fill in the form inputs
        cy.get('#firstName').type('cypress');
        cy.get('#lastName').type('cypress');
        cy.get('#email').type('cypress@cypress.com');
        cy.get('#password').type('cyPRESS1');
        cy.get('#username').type('cypress');
        cy.get('#nif').type('223456789');
        cy.get('#phoneNumber').type('963456789');

        cy.get('#agree').check();

        // Submit the form
        cy.get('form').submit();

        // Check error message
        cy.contains('User already exists with email=');
    }
    );

    it('Should fail to create an account: email is invalid', () => {
        cy.visit('/auth/register')
        // Fill in the form inputs
        cy.get('#firstName').type('cypress');
        cy.get('#lastName').type('cypress');
        cy.get('#email').type('cypresscypress.com');
        cy.get('#password').type('cyPRESS1');
        cy.get('#username').type('cypress');
        cy.get('#nif').type('223456789');
        cy.get('#phoneNumber').type('963456789');

        cy.get('#agree').check();

        // Submit the form
        cy.get('form').submit();

        // Check error message
        cy.contains('Email must contain one @ and one . ');
    }
    );

    it('Should fail to create an account: password is invalid', () => {
        cy.visit('/auth/register')
        // Fill in the form inputs
        cy.get('#firstName').type('cypress');
        cy.get('#lastName').type('cypress');
        cy.get('#email').type('cypress@cypress2.com');
        cy.get('#password').type('cypress');
        cy.get('#username').type('cypress');
        cy.get('#nif').type('223456789');
        cy.get('#phoneNumber').type('963456789');

        cy.get('#agree').check();

        // Submit the form
        cy.get('form').submit();

        // Check error message
        cy.contains('Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number or special character');
    }
    );

    it('Should fail to create an account: phone number is invalid', () => {
        cy.visit('/auth/register')
        // Fill in the form inputs
        cy.get('#firstName').type('cypress');
        cy.get('#lastName').type('cypress');
        cy.get('#email').type('cypress@cypress2.com');
        cy.get('#password').type('cyPRESS1');
        cy.get('#username').type('cypress2');
        cy.get('#nif').type('223456789');
        cy.get('#phoneNumber').type('6545');

        cy.get('#agree').check();

        // Submit the form
        cy.get('form').submit();

        // Check error message
        cy.contains('Phone number is not valid');
    }
    );

    it('Should fail to create an account: nif is invalid', () => {
        cy.visit('/auth/register')
        // Fill in the form inputs
        cy.get('#firstName').type('cypress');
        cy.get('#lastName').type('cypress');
        cy.get('#email').type('cypress@cypress2.com');
        cy.get('#password').type('cyPRESS1');
        cy.get('#username').type('cypress2');
        cy.get('#nif').type('2234567890543');
        cy.get('#phoneNumber').type('963458789');
        
        cy.get('#agree').check();

        // Submit the form
        cy.get('form').submit();

        // Check error message
        cy.contains('Nif is not valid');
    }
    );
});