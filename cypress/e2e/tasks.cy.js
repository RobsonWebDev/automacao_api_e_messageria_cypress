const { func } = require("assert-plus");

describe('Post /', () => {


    beforeEach(function () {
        cy.fixture('tasks').then(function (tasks) {
            this.tasks = tasks
        })
    })

    it('login via api', function () {

        const { user, task } = this.tasks.create

        cy.postSession(user).then(response => {
            cy.log(response.body.token)
            Cypress.env('token', response.body.token)
        })
    })

    it('register a new task', function () {

        const { user, task } = this.tasks.create

        cy.task('deleteUser', user.email, user.email)
        cy.postUser(user)

        cy.postSession(user).then(response => {

            cy.task('deleteTask', task.name)

            cy.postTask(task, response.body.token)
                .then(response => {
                    expect(response.status).to.eq(200)
                })
        })


    })


})

