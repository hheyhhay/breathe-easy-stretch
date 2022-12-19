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

  it.only('Should display an error message if failed to fetch data', () => {
   
    cy.intercept( `https://api.airvisual.com/v2/nearest_city?key=bf0b892e-3be5-494f-b5ec-fcae0e92285a`, 
      {
      statusCode: 500,
      })
      cy.visit('http://localhost:3000/current')
        .contain('.error-message', 'Failed to fetch')
    })

  it('Should be able to select a state and have the cities with available AQI data populated', () => {
    cy.get('.state-select').select('Colorado')
    cy.intercept('https://api.airvisual.com/v2/cities?state=Colorado&country=USA&key=bf0b892e-3be5-494f-b5ec-fcae0e92285a', {
      statusCode: 201,
      fixture: `selected_city_test_data.json`,
    })
    cy.get('.city-select').select('Denver').should('have.value', 'Denver')
  });


 it('Should be able to select a city and have that cities AQI data displayed', () => {
  cy.get('.state-select').select('Colorado')
  cy.get('.city-select').select('Denver').should('have.value', 'Denver')  
  cy.get('.form-submit')
    .click()
  cy.url().should('eq', 'http://localhost:3000/Colorado/Denver')
});

})