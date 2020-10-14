describe('Bloglist app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', {
            username: 'testerbot',
            name: 'Itsa Test',
            password: 'salasana',
        })
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('login')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('testerbot')
            cy.get('#password').type('salasana')
            cy.get('#login-button').click()

            cy.contains('Itsa Test is logged in')
        })

        it.only('fails with wrong credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type('testerbot')
            cy.get('#password').type('wrongpassword')
            cy.get('#login-button').click()

            cy.get('.error')
                .should('contain', 'Wrong credentials')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        })
    })
})
