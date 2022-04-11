describe('Cat-scroll component', () => {
    beforeEach(() => {
        window.localStorage.setItem('loggedIn', 'true')
        cy.visit('/');
    })

    it('should cdk-virtual-scroll-viewport DOM element be visible', () => {
        cy.get('cdk-virtual-scroll-viewport').should('be.visible');
    });

    it('should render at least 2 cat list items after 2 seconds', () => {
        cy.wait(2000)
        cy.get('[data-cy="cat-list-item"]').its('length').should('be.gte', 2);
    });

    it('should redirect to /login path when clicked logout button', () => {
        cy.get('[data-cy="logout-button"]').click();
        cy.url().should('eq', Cypress.config().baseUrl + 'login');
    });

});
