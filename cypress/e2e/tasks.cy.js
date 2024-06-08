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
            Cypress.env('token', response.body.token)
        })
    })

    it('register a new task', function () {

        const { user, task } = this.tasks.create

        cy.task('deleteUser', user.email, user.email)
        cy.postUser(user)

        cy.postSession(user).then(userResp => {

            cy.task('deleteTask', task.name, user.email)

            cy.postTask(task, userResp.body.token)
                .then(response => {
                    expect(response.status).to.eq(201)
                    expect(response.body.name).to.eq(task.name)
                    expect(response.body.tags).to.eql(task.tags)
                    expect(response.body.is_done).to.be.false
                    expect(response.body.user).to.eq(userResp.body.user._id)
                })
        })


    })


})

