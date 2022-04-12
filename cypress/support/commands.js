// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const baseUrl = Cypress.config().baseUrl

Cypress.Commands.add('createUser', () => {
    let payload = {
        "id": 999123999,
        "username": "automated_user_sita",
        "firstName": "Automated",
        "lastName": "Users",
        "email": "automated_user_sita@mailinator.com",
        "password": "12345678",
        "phone": "12345678",
        "userStatus": 1
    }

    cy
        .request(
            'POST',
            `${baseUrl}/user`,
            payload
        )
})

Cypress.Commands.add('deleteUser', () => {
    cy
        .request(
            'DELETE',
            `${baseUrl}/user/automated_user_sita`
        )
})