describe('Sign-in component', () => {
    beforeEach(() => {
        cy.visit('/login');
    })

    it('should redirect to /login path when user try to redirect to / path', () => {
        cy.visit('/');
        cy.url().should('eq', Cypress.config().baseUrl + 'login');
    });

    it('should redirect / path when localstorage loggedIn value is true', () => {
        window.localStorage.setItem('loggedIn', 'true')
        cy.reload()
        cy.url().should('eq', Cypress.config().baseUrl);
    });

    it('should redirect / path when user logged in', () => {
        cy.get('[data-cy="login-username-field"]').type('Marek1234');
        cy.get('[data-cy="login-password-field"]').type('f#@2si142jidqw1314');
        cy.get('[data-cy="login-button"]').click();
        cy.url().should('eq', Cypress.config().baseUrl);
    });

    it('should login header have KGRedHands font-family', () => {
        cy.get('[data-cy="login-header"]').should('have.css', 'font-family', 'KGRedHands')
    });

});
