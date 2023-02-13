describe('login page', () => {
  it('the button contains the correct text', () => {
    cy.visit('http://localhost:3000/login')
    cy.get(".btn").should("exist").contains("SingIn") 
  })
})