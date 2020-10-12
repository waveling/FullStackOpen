describe('Bloglist app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.contains('login').click()
    })
})
