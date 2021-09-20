describe('Form to select city to see AQI data', () => {

    beforeEach(() => {
      cy.visit('http://localhost:3000/find-cleanest-air')
    })
  
    it('Should have home page url when displaying select city home page', () => {
      cy.url().should('eq', 'http://localhost:3000/find-cleanest-air')
    });
  

  })