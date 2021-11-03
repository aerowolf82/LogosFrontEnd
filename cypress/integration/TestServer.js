describe("Home page", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it("Should load the Home page", () => {
        cy.get('.header').should('include.text', 'Home')
    });

    it("Should redirect to /spacecraft when spacecraft is clicked", () => {
        //act
        cy.get('.header > [href="/spacecraft"]')
            .click()
        //assert
        cy.location('pathname').should('eq', '/spacecraft')
    });

    it("Should redirect to /spacecraft when space craft list is clicked", () => {
        //act
        cy.get(':nth-child(2) > a')
            .click()
        //assert
        cy.location('pathname').should('eq', '/spacecraft')
    });
})

describe("Spacecraft Page", () => {
    it("Should redirect to /spacecraft/:spacecraftid when an individual spacecraft is clicked", () => {
        //act
        cy.get('.header > [href="/spacecraft"]')
            .click()
        cy.get('[href="/spacecraft/0"]')
            .click()
        //assert
        cy.location('pathname').should('eq', '/spacecraft/0')
    });
})

describe("Individual Spacecraft Page", () => {
    it("Should search for a spacecraft given a query", () => {
        cy.getByRole(`Combobox`)
            .click()
            // cy.get(`[Title="Combobox"]`).click()
            .type(`Mercury No.7{enter}`)
        expect(cy.contains('results')) //if it has a results object
        expect(cy.contains('Mercury No.7'))
    });
});

describe("Individual Pad Page", () => {
    it("Should search for a pad given a query", () => {
        cy.getByRole(`Combobox`)
            .click()
            // cy.get(`[Title="Combobox"]`).click()
            .type(`Space Launch Complex 3W{enter}`)
        expect(cy.contains('results')) //if it has a results object
        expect(cy.contains('Space Launch Complex 3W'))
    });
});
    //     /*
    //     cy.location().should((loc) => {
    //         expect(loc.hash).to.eq('#/users/123/edit')
    //         expect(loc.host).to.eq('localhost:8000')
    //         expect(loc.hostname).to.eq('localhost')
    //         expect(loc.href).to.eq(
    //             'http://localhost:8000/app/index.html?q=dan#/users/123/edit'
    //         )
    //         expect(loc.origin).to.eq('http://localhost:8000')
    //         expect(loc.pathname).to.eq('/app/index.html')
    //         expect(loc.port).to.eq('8000')
    //         expect(loc.protocol).to.eq('http:')
    //         expect(loc.search).to.eq('?q=dan')
    //         expect(loc.toString()).to.eq(
    //             'http://localhost:8000/app/index.html?q=brian#/users/123/edit'
    //         )
    //     */
    // })

    // it("Should redirect to /spacecraft/:spacecraftId when an individual spacecraft is clicked", async () => {
    //     //act
    //     cy.get('spacecraft')
    //       .click()
    //     cy.get('Mercury No.7')
    //       .click()
    //     cy.url().should('include', 'Mercury')

    // })

    // // })

/*
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

