// TestServer.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe("Home page", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    //find is async
    it("The Home Page Exists", async () => {

        let navBar = await cy.findByRole('navigation')
        expect(navBar).to.contain('GMDB')
        
    })

    it("Should Display movies in browser", async () => {

        await cy.get('div[class= "movie-card"]')
                .find("img")
                .should('be.visible')
        
    })

    it("Should take you to movie page when a movie is selected", () => {
        //setup
        let movieName = 'Guardians of the Galaxy Vol. 2'
        //act
        cy.get('div[class= "movie-card"]')
                .find('[alt = "Guardians of the Galaxy Vol. 2"]')
                .click()
        cy.get('div[class= "indivMovie"]')
            .findByText(movieName)
            .should('exist')
    })

    // it("Should display movie information on the movie page", () => {

        

    // })


/*
    it("header contains recipe heading with a message that there are no recipes", () => {
        cy.findByRole('heading').should('contain', 'My Recipes')
        cy.get('p')
            .findByText('There are no recipes to list.')
            .should('exist')
    })

*/


    //test that movies are pulled from API--good

    //test to see if login button is present

    //has a search feature present
    // it("Has a search bar")
    // it("Searches API for an input movie")
    // it("Displays ")

    //that the movies are selectable

    //details appear upon movie selection

    //test search functionality

    //user posts will be added to movie reviews

    //users are able to login and register for account
    
})