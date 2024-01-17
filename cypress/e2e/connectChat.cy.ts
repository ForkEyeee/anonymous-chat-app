describe('Connect to User', () => {
  it('should be connect to user', () => {
    cy.get('#status').contains('Connected');
    cy.get('#user-id').should('not.contain', 'Searching for users');
    cy.get('#avatar').should('not.be.empty');
  });
});
