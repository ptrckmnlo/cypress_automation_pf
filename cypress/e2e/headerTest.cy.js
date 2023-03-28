describe('Header + Menu Test', () => {

    const menu_items = ['All Items', 'About', 'Logout', 'Reset App State'];
    const links = ['#', 'https://saucelabs.com/', '#', '#']

    before(() => {
        cy.visit('/');
        cy.fixture('login-details').then(function (data) {
            this.data = data;
            const { username, password } = this.data.stdUser;
              cy.login(username, password);
          })
    });

    it('1. Check each links for each menu items from hamburger menu', () => {
        cy.clickBtn('.bm-burger-button');
        cy.get('.bm-item-list').find('a').each(($ele, index) => {
            cy.wrap($ele)
                .should('have.text', menu_items[index])
                .and('have.attr', 'href', links[index])
          })
    });
});