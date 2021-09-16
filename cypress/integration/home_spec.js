describe('Form to select city to see AQI data', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Should have home page url when displaying select city home page', () => {
    cy.url().should('eq', 'http://localhost:3000/')
  });

  it('Should be able to visit the page and render the page logo, slogan, and guiding text', () => {
    cy.get('.logo')
      .contains('Breezy')
    cy.get('.slogan')
      .contains('-Breathe Easy.-')
    cy.get('.guiding-text')
      .contains('Find the cleanest air around.')
  });
  

})