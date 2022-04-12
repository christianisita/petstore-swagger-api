import { firstName, lastName } from "../../support/randomGenerator";

const baseUrl = Cypress.config().baseUrl
let first = firstName()
let last = lastName()
let username = `${first}_${last}`
let email = `${username}@mailinator.com`
let password = '12345678'
let phone = '0123456'
let userStatus = 0
let payload

describe('CRUD User Scenario', () => {
    afterEach(() => {
        cy.wait(2000)
    });

    context('Given valid of inputs for creating user', () => {
        it('Create single user', () => {
            let payload = {
                "id": 123123,
                "username": username,
                "firstName": first,
                "lastName": last,
                "email": email,
                "password": password,
                "phone": phone,
                "userStatus": userStatus
            }
    
            cy
                .request({
                    method: 'POST',
                    url: `${baseUrl}/user`,
                    body: payload
                })
                .then((response) => {
                    expect(response.status).to.eql(200)
                })
        })
    })
    context('Given valid username on getting user detail', () => {
        it('Get the user detail', () => {
            cy
                .request({
                    method: 'GET',
                    url: `${baseUrl}/user/${username}`
                })
                .then((response) => {
                    let body = response.body
                    expect(response.status).to.eql(200)
                    expect(body.username).to.eql(username)
                    expect(body.firstName).to.eql(first)
                    expect(body.lastName).to.eql(last)
                })
        })
    })
    context('Given invalid username on getting user detail', () => {
        it('Shows error message user not found', () => {
            cy
                .request({
                    method: 'GET',
                    url: `${baseUrl}/user/hmhmhmhmhmmmhhhh`,
                    failOnStatusCode: false
                })
                .then((response) => {
                    let body = response.body
                    expect(response.status).to.eql(404)
                    expect(body.message).to.eql("User not found")
                })
        })
    })
    context('Given valid username for updating user', () => {
        it('Update the user data', () => {
            let payload = {
                "id": 123123,
                "username": username,
                "firstName": first + 'edited',
                "lastName": last + 'edited',
                "email": email,
                "password": password,
                "phone": phone,
                "userStatus": 1
            }
            cy
                .request({
                    method: 'PUT',
                    url: `${baseUrl}/user/${username}`,
                    body: payload
                })
                .then((response) => {
                    expect(response.status).to.eql(200)
                })
        })
    })

    context('Given valid username of updated user', () => {
        it('Get the detail as what has been updated', () => {
            cy
            .request({
                method: 'GET',
                url: `${baseUrl}/user/${username}`
            })
            .then((response) => {
                let body = response.body
                expect(response.status).to.eql(200)
                expect(body.username).to.eql(username)
                expect(body.firstName).to.eql(first+'edited')
                expect(body.lastName).to.eql(last+'edited')
            })
        })
    });

    context('Given valid username for deleting user', () => {
        it('Delete the user', () => {
            cy
                .request({
                    method: 'DELETE',
                    url: `${baseUrl}/user/${username}`
                })
                .then((response) => {
                    expect(response.status).to.eql(200)
                    expect(response.body.message).to.eql(username)
                })
        })
    })

    context('Given valid deleted username', () => {
        it('Doesn\'t found when getting the data after deleting', () => {
            cy
            .request({
                method: 'GET',
                url: `${baseUrl}/user/${username}`,
                failOnStatusCode: false
            })
            .then((response) => {
                let body = response.body
                expect(response.status).to.eql(404)
                expect(body.message).to.eql("User not found")
            })
        })
    });
})