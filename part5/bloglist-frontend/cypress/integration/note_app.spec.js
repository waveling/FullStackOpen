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

        it('fails with wrong credentials', function () {
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

    describe('When logged in', function () {
        beforeEach(function () {
            cy.get('#username').type('testerbot')
            cy.get('#password').type('salasana')
            cy.get('#login-button').click()
        })

        it('A blog can be created', function () {
            cy.contains('Add Blog').click()
            cy.get('.titleInput').type('A Test Blog Created By Cypress')
            cy.get('.authorInput').type('Fictional Testwriter')
            cy.get('.urlInput').type('http://testurl.com')
            cy.get('.submit-blog-button').click()

            cy.contains('A Test Blog Created By Cypress')
        })

        it('A blog can be liked', function () {
            cy.contains('Add Blog').click()
            cy.get('.titleInput').type('A Test Blog Created By Cypress')
            cy.get('.authorInput').type('Fictional Testwriter')
            cy.get('.urlInput').type('http://testurl.com')
            cy.get('.submit-blog-button').click()

            cy.contains('show').click()
            cy.get('.like').click()
            cy.get('.likes').should('contain', '1')

            cy.get('.like').click()
            cy.get('.likes').should('contain', '2')
        })

        it('User can remove blogs they have added', function () {
            cy.contains('Add Blog').click()
            cy.get('.titleInput').type('A Test Blog Created By Cypress')
            cy.get('.authorInput').type('Fictional Testwriter')
            cy.get('.urlInput').type('http://testurl.com')
            cy.get('.submit-blog-button').click()

            cy.get('.detailButton').click()
            cy.get('.detailedInfo').find('button.remove').as('removeButton')
            cy.get('@removeButton').click()

            cy.request('GET', 'http://localhost:3003/api/blogs').then(
                (response) => {
                    const data = response.body
                    expect(data).to.have.length(0)
                }
            )
        })

        it('Blogs are ordered based on likes', function () {
            cy.contains('Add Blog').click()
            cy.get('.titleInput').type('A Test Blog Created By Cypress')
            cy.get('.authorInput').type('Fictional Testwriter')
            cy.get('.urlInput').type('http://testurl.com')
            cy.get('.submit-blog-button').click()

            cy.contains('Add Blog').click()
            cy.get('.titleInput').type('Another Test Blog Created By Cypress')
            cy.get('.authorInput').type('Fictional Testwriter(2)')
            cy.get('.urlInput').type('http://testurl.com')
            cy.get('.submit-blog-button').click()

            cy.contains('Add Blog').click()
            cy.get('.titleInput').type(
                'Yet Another Test Blog Created By Cypress'
            )
            cy.get('.authorInput').type('Fictional Testwriter(3)')
            cy.get('.urlInput').type('http://testurl.com')
            cy.get('.submit-blog-button').click()

            cy.contains('Yet Another').parent().find('button').as('showButton')
            cy.get('@showButton').click()

            cy.contains('Yet Another').parent().find('.like').as('likeButton')
            cy.get('@likeButton').click()
            cy.get('@showButton').click()

            cy.get('.detailButton')
                .should('have.length', 3)
                .click({ multiple: true })

            cy.get('.likes').then((likes) => {
                expect(likes[0]).to.contain(1)
            })
        })
    })
})
