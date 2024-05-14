describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Welcome to RobDroneGo')
  })

  it('Visits the initial project page 2', () => {
    cy.visit('/')
    cy.contains('What is RobDroneGo?')
  })

  it('Visits the initial project page 3', () => {
    cy.visit('/')
    cy.contains('What can RobDroneGo do?')
  })

  it('Visits the initial project page 4', () => {
    cy.visit('/')
    cy.contains('Contacts')
  })

  it('Visits the initial project page 5: contains Building button', () => {
    cy.visit('/')
    // contains button
    cy.contains('Building').click()
  })

  it('Visits the initial project page 6: contains Floor button', () => {
    cy.visit('/')
    // contains button
    cy.contains('Floor').click()
  })

  it('Visits the initial project page 7: contains Room button', () => {
    cy.visit('/')
    // contains button
    cy.contains('Room').click()
  })

  it('Visits the initial project page 8: contains Elevator button', () => {
    cy.visit('/')
    // contains button
    cy.contains('Elevator').click()
  })

  it('Visits the initial project page 9: contains Robot button', () => {
    cy.visit('/')
    // contains button
    cy.contains('Robot').click()
  })

  it('Visits the initial project page 10: contains Type of Robot button', () => {
    cy.visit('/')
    // contains button
    cy.contains('Type of Robot').click()
  })

  it('Visits the initial project page 11: contains Hallway Connection button', () => {
    cy.visit('/')
    // contains button
    cy.contains('Hallway Connection').click()
  })

  it('Visits the initial project page 12: contains 3D Vizualization button', () => {
    cy.visit('/')
    // contains button
    cy.contains('3D Visualization').click()
  })


})
