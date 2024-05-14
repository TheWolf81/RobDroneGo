describe('List Buildings With Max and Min Floors Component Cypress Test', () => {
    it('Should list buildings with max and min floors', () => {
      // Visit the page
      cy.visit('/building/listMaxMinFloors');
  
      // Enter values for min and max floors
      cy.get('#min').type('1');
      cy.get('#max').type('10');
  
      // Click the "List Buildings" button
      cy.get('button').contains('List Buildings').click();
  
      // Check if the building data is displayed
      cy.get('.building-square').should('exist');
  
      // Optionally, you can check specific details of the displayed building data
      cy.get('.building-square').first().contains('Code:').should('exist');
      cy.get('.building-square').first().contains('Description:').should('exist');
      cy.get('.building-square').first().contains('max_length:').should('exist');
      cy.get('.building-square').first().contains('max_width:').should('exist');
    });

    it('Should not list buildings with max and min floors: Empty min and max floors', () => {
        cy.visit('/building/listMaxMinFloors');

        cy.get('button').contains('List Buildings').click();

        cy.get('.building-square').should('not.exist');

    });

    it('Should not list buildings with max and min floors: Max floors less than min floors', () => {
        cy.visit('/building/listMaxMinFloors');

        cy.get('#min').type('10');
        cy.get('#max').type('1');

        cy.get('button').contains('List Buildings').click();

        cy.get('.building-square').should('not.exist');

        cy.get('.error-message').contains('Max floors must be greater than min floors.').should('exist');

    });
  });
  