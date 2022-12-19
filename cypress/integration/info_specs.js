describe('Form to select city to see AQI data', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/Colorado/Denver')
    })
  
    it('Should see current conditions of Denver, CO', () => {
      cy.get('.location-info').should('contain', 'Denver')
    });
    
    it('Should be able to chose a state and city to compare', () => {
      cy.get('.state-select').select('Colorado')
      cy.wait(500)
      cy.get('.city-select').select('Aspen')
      cy.get('.form-submit').click()

      cy.get('.other-cities-container')
        .should('contain', 'Aspen')
    })

    it('Should be able to chose another state and city to compare', () => {
      cy.get('.state-select').select('Florida')
      cy.wait(500)
      cy.get('.city-select').select('Miami')
      cy.get('.form-submit').click()

      cy.get('.other-cities-container')
        .should('contain', 'Miami')
    })

    it('Should be able to delete card', () => {
      cy.get('.state-select').select('Florida')
      cy.wait(500)
      cy.get('.city-select').select('Miami')
      cy.get('.form-submit').click()

      cy.get('.delete-other-city').click()
      cy.get('.other-cities-container')
        .should('not.have.text', 'Miami')

    })

    it('Should be able to return to main page', () => {
      cy.get('.home-button').click()
      cy.url().should('eq', 'http://localhost:3000/')

    })

    it('Should be able to clear form', () => {
      cy.get('.state-select').select('Colorado')
      cy.wait(500)
      cy.get('.city-select').select('Aspen')

      cy.get('.reset-button').click()
      cy.get('.city-select').should('not.have.text', 'Colorado')
    })

    beforeEach(() => {
      cy.visit('http://localhost:3000/Colorado/Denver')
    })

    it.only('Should display an error message if city is not selected', () => {

      cy.get('.state-select').select('Colorado')
      cy.get('.form-submit').click()
      cy.get('.error-card').should('contain', 'We\'ve encountered an error in retrieving the AQI data for your city.' )
    })

  it('Should display an error message if failed to fetch data', () => {
    cy.intercept( `https://api.airvisual.com/v2/nearest_city?key=bf0b892e-3be5-494f-b5ec-fcae0e92285a`, 
      {
      statusCode:500,
      })
    cy.get('.error-message').should('contain', 'Failed to fetch')
    })
  })