describe('Blog app', function() {
  beforeEach(function() {
    //Alusta testikanta testejä varten
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    //Alusta kanta uudella käyttäjällä
    const user = {
      name: 'Eppu Peltonen',
      username: 'eppu',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('login').click()
    cy.contains('log in to application')
  })

  describe('Login', function(){
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('eppu')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Eppu Peltonen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('eppu')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
    })
  })
})