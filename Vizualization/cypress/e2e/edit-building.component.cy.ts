describe('Edit Building Component Cypress Test', () => {
    it('Should edit a building with valid parameters', () => {
      cy.visit('/building/edit'); 
  
      // Preencher campos do formulário
      cy.get('#buildingCode').type('cypr');
      cy.get('#buildingDescription').type('New Building Description');
      cy.get('#buildingMaxLength').type('100');
      cy.get('#buildingMaxWidth').type('150');
  
      // Submeter o formulário
      cy.get('form').submit();
  
    });
  
  });
  