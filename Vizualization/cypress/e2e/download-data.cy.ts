describe('Download Data Cypress Test', () => {
    it('Should download data if logged in', () => {
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

        cy.contains('Download Data').click();

        cy.contains('Your data is ready.');

    });

    it('Should not contain download data button if logged in as client', () => {
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

        cy.get('form').should('contain.text', 'Download Data');

    });

    it('Should not contain download data button if logged out', () => {
        cy.visit('/login?returnUrl=%2F');
    
        cy.get('a[routerLink="/auth"]').click();
    
        // Verificar se o botão de download de dados não está presente
        cy.should('not.contain.text', 'Download Data');
    });
    

});