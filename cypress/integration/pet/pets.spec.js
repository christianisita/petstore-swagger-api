const baseUrl = Cypress.config().baseUrl

describe('CRUD Pet Scenario', () => {
    afterEach(() => {
        cy.wait(2000)
    })

    context('Given a pet data', () => {
        it('Creates new pet data', () => {
            let payload = {
                "id": 12345678,
                "category": {
                  "id": 0,
                  "name": "dogs"
                },
                "name": "pepsi",
                "photoUrls": [
                ],
                "tags": [
                  {
                    "id": 0,
                    "name": "pet"
                  }
                ],
                "status": "available"
              }
            cy.request({
                method: 'POST',
                url: `${baseUrl}/pet`,
                body: payload
            })
            .then((response) => {
                expect(response.status).to.eql(200)
            })
        })
    })

    context('Given an existing pet and picture', () => {
        it('Update picture of pet', () => {
            cy.fixture("dogs.png").then((image) => {
                const blob = Cypress.Blob.base64StringToBlob(image, 'image/png')

                let formdata = new FormData
                formdata.append('file', blob) 

                cy.request({
                    method: 'POST',
                    url: `${baseUrl}/pet/12345678/uploadImage`,
                    headers: {
                        'content-type': 'multipart/form-data'
                    },
                    body: formdata
                }).then((response) => {
                    expect(response.status).to.eql(200)
                })
            })
        })

        it('Getting pet detail', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/pet/12345678`
            }).then((response) => {
                expect(response.status).to.eql(200)
            })
        })

    })

    context('Given pet id', () => {
        it('Delete pet', () => {
            cy.request({
                method: 'DELETE',
                url:`${baseUrl}/pet/12345678`
            }).then((response) => {
                expect(response.status).to.eql(200)
            })
        })

        it('Pet id doesn\'t found', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/pet/12345678`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eql(404)
            })
        })
    })

})