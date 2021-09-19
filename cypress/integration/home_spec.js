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

  // it.only('Should display an error message if cannot fetch data', () => {
  //   cy.get('.current-location-button')
  //     .click()
  //   cy.intercept({
  //     method: 'GET',
  //     url: `http://api.airvisual.com/v2/nearest_city?key=8b1bc68f-68fc-497f-8392-79664f6b493`,
  //   },
  //     {
  //       statusCode: 500
  //     })
  //     cy.visit('http://localhost:3000')
  //       .contains('.error', '500 error - Something on our end is not working right now.')
  // })
  // it('Should be able to click Use Current Location button and have current location AQI data displayed', () => {

  //   cy.intercept('http://api.airvisual.com/v2/cities?state=$Colorado&country=USA&key=da479dc8-2e38-4a47-97a1-7396f6c348e1`, {
  //     statusCode: 201,
  //     fixture: `city_test_data.json`,
  //   })
  //  cy.get('.current-location-button')
  //       .click()
   
  //   });

  it('Should be able to select a state and have the cities with available AQI data populated', () => {
    cy.get('.state-select').select('Colorado')
    cy.intercept('http://api.airvisual.com/v2/cities?state=Colorado&country=USA&key=da479dc8-2e38-4a47-97a1-7396f6c348e1', {
      statusCode: 201,
      fixture: `selected_city_test_data.json`,
    })
    cy.get('.city-select').select('Denver').should('have.value', 'Denver')
  });


 it.only('Should be able to select a city and have that cities AQI data displayed', () => {
  cy.get('.state-select').select('Colorado')
  cy.get('.city-select').select('Denver').should('have.value', 'Denver')  
  cy.get('.form-submit')
    .click()
    cy.url().should('eq', 'http://localhost:3000/find-cleanest-air')
});

})