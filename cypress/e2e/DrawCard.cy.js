describe('DrawCard', () => {
  it('Verify player draw a card', () => {
    cy.visit('http://localhost:3000/')
    //? Encuentra el stack y le da click
    cy.get('.Card_UnoCard__b_oAv').click()
    //? Verifica que tenga las 8 cartas
    cy.get('.Card_Card__w8NlC').should('have.length', 8)
  })
})