const baseUrl = Cypress.config().baseUrl


describe('Authentication Scenario', () => {
    before(() => {
        cy.createUser()
    })
    
    beforeEach(() => {
        cy.wait(2000)
    })

    after(() => {
        cy.deleteUser()
    })

    context('Given valid username and password', () => {
        it('Successfully log in', () => {
            cy
                .request({
                    method: 'GET',
                    url: `${baseUrl}/user/login`,
                    qs: {
                        username: 'automated_user_sita',
                        password: '12345678'
                    }
                })
                .then((response) => {
                    expect(response.status).to.eql(200)
                })
        })
    })

    context('Given it was successfully logged in', () => {
        it('succesfully log iout', () => {
            cy
                .request({
                    method: 'GET',
                    url: `${baseUrl}/user/logout`
                })
                .then((response) => {
                    expect(response.status).to.eql(200)
                })
        })
    })
})