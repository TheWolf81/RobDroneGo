describe('Load Floor Map Component Cypress Test', () => {
    it('Should upload a floor map with valid data', () => {
      cy.visit('/floor/uploadFloorMap'); // Altere a rota conforme necessário
  
      // Selecionar um código de prédio
      cy.get('#buildingId').select('cypr'); // Altere para o código de prédio desejado
  
      // Aguardar a lista de andares ser carregada após a seleção do prédio (se necessário)
      // Se houver uma ação assíncrona ao selecionar o prédio que carrega os andares, utilize um comando como o `cy.wait()` para esperar por essa ação.
  
      // Selecionar um andar após o prédio ser selecionado e a lista de andares ser carregada
      cy.get('#floorId').select('name'); 

      const floorMapData = {
        "maze": {
          // ... Conteúdo do objeto JSON fornecido
        },
        "ground": {
          // ... Conteúdo do objeto JSON fornecido
        },
        "wall": {
          // ... Conteúdo do objeto JSON fornecido
        },
        "player": {
          // ... Conteúdo do objeto JSON fornecido
        }
      };
  
      cy.get('#floorMazeData').invoke('val', JSON.stringify(floorMapData)).trigger('input');
  
      // Submeter o formulário
      cy.get('form').submit();
  
      // Verificar se uma mensagem de sucesso é exibida após a submissão
      cy.get('.error-message').should('be.visible');
    });
  
    
  });
  