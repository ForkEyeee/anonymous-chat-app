describe('Send a Message', () => {
  it('should be send a message', () => {
    cy.get('#chat-input').type('This is my message');
    cy.get('#message-send-btn').click();
    cy.get('#message-list').contains('This is my message');
  });
});
