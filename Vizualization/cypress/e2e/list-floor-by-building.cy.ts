describe('List Floor By Building Component Cypress Test', () => {
    it('Should list floors by building', () => {
      cy.visit('/floor/listByBuilding');
  
      cy.get('#buildingId').select('D');
  
      // Click the "List Floors" button
      cy.get('button').contains('List Floors').click();
  
      // Check if the floor data is displayed
      cy.get('.floor-square').should('exist');
  
      // Optionally, you can check specific details of the displayed floor data
      cy.get('.floor-square').first().contains('Name:').should('exist');
      cy.get('.floor-square').first().contains('Description:').should('exist');
      cy.get('.floor-square').first().contains('Area:').should('exist');
      cy.get('.floor-square').first().contains('FloorNumber:').should('exist');
    });

    it('Should not list floors by building: Empty building', () => {
        cy.visit('/floor/listByBuilding');

        cy.get('#buildingId').select('YOO');

        cy.get('button').contains('List Floors').click();

        cy.get('.floor-square').should('not.exist');

        cy.contains('Error retrieving floors. No floors found for this building.');
    });
  });
  