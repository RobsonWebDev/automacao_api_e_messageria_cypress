Cypress.Commands.add('postUser', (user) => {
    cy.api({
        url: '/users',
        method: 'POST',
        body: user,
        failOnStatusCode: false,
    }).then(response => {
        return response
    })

})

Cypress.Commands.add('postSession', (userData) => {

    cy.api({
        url: '/sessions',
        method: 'POST',
        body: { email: userData.email, password: userData.password },
        failOnStatusCode: false,
    }).then(response => {return response})

})

Cypress.Commands.add('postTask', (task, token) => {
    cy.api({
        url: '/tasks',
        method: "POST",
        body: task,
        headers: {
            authorization: token
        },
        failOnStatusCode: false
    }).then(response => {
        return response
    })
})