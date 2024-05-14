describe('Create Account As Admin Component Cypress Test', () => {
    // make sure the correct data is in the database before running these tests
    it('Should create a Fleet Manager account: Valid parameters', () => {
        cy.visit('/login?returnUrl=%2F');

        // Fill in the form inputs
        cy.get('#email').type('agv@isep.ipp.pt');
        cy.get('#password').type('jsmith123*');

        // Submit the form
        cy.get('form').submit();

        // Ensure Angular is stable before interacting with the form
         // Adjust the wait time as needed
        cy.wait(1000);
        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth"]').click();
        cy.get('a[routerLink="/auth"]').click();
        
        cy.get('a[routerLink="/auth/create"]').click();

        // Fill in the form inputs
        cy.get('#firstName').type('cypress');
        cy.get('#lastName').type('cypress');
        cy.get('#email').type('cypressa1@cypress.com');
        cy.get('#password').type('cyPRESS1');
        cy.get('#username').type('cypressa1');
        cy.get('#nif').type('445123698');
        cy.get('#phoneNumber').type('915236478');
        cy.get('#role').select('FleetManager');

        // Submit the form
        cy.get('form').submit();

        // Check that the account was created
        cy.contains('Account created successfully!');
        
    }
    );
    it('Should create a Campus Manager account: Valid parameters', () => {
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
        
        cy.get('a[routerLink="/auth/create"]').click();
        // Fill in the form inputs
        cy.get('#firstName').type('cypress');
        cy.get('#lastName').type('cypress');
        cy.get('#email').type('cypressa2@cypress.com');
        cy.get('#password').type('cyPRESS1');
        cy.get('#username').type('cypressa2');
        cy.get('#nif').type('556412873');
        cy.get('#phoneNumber').type('945128763');
        cy.get('#role').select('CampusManager');

        // Submit the form
        cy.get('form').submit();

        // Check that the account was created
        cy.contains('Account created successfully!');
        
    }
    );
    it('Should create a Task Manager account: Valid parameters', () => {
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
        
        cy.get('a[routerLink="/auth/create"]').click();
        // Fill in the form inputs
        cy.get('#firstName').type('cypress');
        cy.get('#lastName').type('cypress');
        cy.get('#email').type('cypressa3@cypress.com');
        cy.get('#password').type('cyPRESS1');
        cy.get('#username').type('cypressa3');
        cy.get('#nif').type('558712364');
        cy.get('#phoneNumber').type('954879623');
        cy.get('#role').select('TaskManager');

        // Submit the form
        cy.get('form').submit();

        // Check that the account was created
        cy.contains('Account created successfully!');
        
    }
    );
    it('Should create a System Administrator account: Valid parameters', () => {
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
        
        cy.get('a[routerLink="/auth/create"]').click();
        // Fill in the form inputs
        cy.get('#firstName').type('cypress');
        cy.get('#lastName').type('cypress');
        cy.get('#email').type('cypressa4@cypress.com');
        cy.get('#password').type('cyPRESS1');
        cy.get('#username').type('cypressa4');
        cy.get('#nif').type('778459632');
        cy.get('#phoneNumber').type('951263487');
        cy.get('#role').select('SystemAdministrator');

        // Submit the form
        cy.get('form').submit();

        // Check that the account was created
        cy.contains('Account created successfully!');
        
    }
    );
    it('Should create a Client account: Valid parameters', () => {
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
        
        cy.get('a[routerLink="/auth/create"]').click();
        // Fill in the form inputs
        cy.get('#firstName').type('cypress');
        cy.get('#lastName').type('cypress');
        cy.get('#email').type('cypressa5@cypress.com');
        cy.get('#password').type('cyPRESS1');
        cy.get('#username').type('cypressa5');
        cy.get('#nif').type('665588994');
        cy.get('#phoneNumber').type('932564871');
        cy.get('#role').select('Client');

        // Submit the form
        cy.get('form').submit();

        // Check that the account was created
        cy.contains('Account created successfully!');
        
    }
    );

    it('Should fail to create an account: email already exists', () => {
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
        
        cy.get('a[routerLink="/auth/create"]').click();
        // Fill in the form inputs
        cy.get('#firstName').type('cypress');
        cy.get('#lastName').type('cypress');
        cy.get('#email').type('cypressa1@cypress.com');
        cy.get('#password').type('cyPRESS1');
        cy.get('#username').type('cypressa6');
        cy.get('#nif').type('447856321');
        cy.get('#phoneNumber').type('945126877');
        cy.get('#role').select('FleetManager');
        // Submit the form
        cy.get('form').submit();

        // Check error message
        cy.contains('User email already in use');
    }
    );

    it('Should fail to create an account: email is invalid', () => {
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
        
        cy.get('a[routerLink="/auth/create"]').click();
        // Fill in the form inputs
        cy.get('#firstName').type('cypress');
        cy.get('#lastName').type('cypress');
        cy.get('#email').type('cypresscypress.com');
        cy.get('#password').type('cyPRESS1');
        cy.get('#username').type('cypressa6');
        cy.get('#nif').type('223456789');
        cy.get('#phoneNumber').type('963456789');
        cy.get('#role').select('FleetManager');

        // Submit the form
        cy.get('form').submit();

        // Check error message
        cy.contains('Email must contain one @ and one . ');
    }
    );

    it('Should fail to create an account: password is invalid', () => {
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
        
        cy.get('a[routerLink="/auth/create"]').click();
        // Fill in the form inputs
        cy.get('#firstName').type('cypress');
        cy.get('#lastName').type('cypress');
        cy.get('#email').type('cypress@cypress2.com');
        cy.get('#password').type('cypress');
        cy.get('#username').type('cypressa6');
        cy.get('#nif').type('223456789');
        cy.get('#phoneNumber').type('963456789');
        cy.get('#role').select('FleetManager');
        // Submit the form
        cy.get('form').submit();

        // Check error message
        cy.contains('Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number or special character');
    }
    );

    it('Should fail to create an account: phone number is invalid', () => {
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
        
        cy.get('a[routerLink="/auth/create"]').click();
        // Fill in the form inputs
        cy.get('#firstName').type('cypress');
        cy.get('#lastName').type('cypress');
        cy.get('#email').type('cypress@cypress2.com');
        cy.get('#password').type('cyPRESS1');
        cy.get('#username').type('cypressa6');
        cy.get('#nif').type('223456789');
        cy.get('#phoneNumber').type('6545');
        cy.get('#role').select('FleetManager');
        // Submit the form
        cy.get('form').submit();

        // Check error message
        cy.contains('Phone number is not valid');
    }
    );

    it('Should fail to create an account: nif is invalid', () => {
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
        
        cy.get('a[routerLink="/auth/create"]').click();
        // Fill in the form inputs
        cy.get('#firstName').type('cypress');
        cy.get('#lastName').type('cypress');
        cy.get('#email').type('cypress@cypress2.com');
        cy.get('#password').type('cyPRESS1');
        cy.get('#username').type('cypressa6');
        cy.get('#nif').type('2234567890543');
        cy.get('#phoneNumber').type('963458789');
        cy.get('#role').select('FleetManager');
        // Submit the form
        cy.get('form').submit();

        // Check error message
        cy.contains('Nif is not valid');
    }
    );
});