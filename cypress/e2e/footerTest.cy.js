describe('Footer Test', () => {

    const social_media = ['Twitter', 'Facebook', 'LinkedIn'];
    const links = ['https://twitter.com/saucelabs', 
                'https://www.facebook.com/saucelabs', 
                'https://www.linkedin.com/company/sauce-labs/'];

    const year = new Date().getFullYear()

    beforeEach(() => {
        cy.visit('/');
        cy.fixture('login-details').then(function (data) {
          this.data = data;
          const { username, password } = this.data.stdUser;
            cy.login(username, password);
        })
    });

    it('1. Check the social media links are correct', function () {
        cy.get('.social').find('a').each(($ele, index) => {
            cy.wrap($ele)
                .should('have.text', social_media[index])
                .and('have.attr', 'href', links[index])
          })
    });

    it('2. Check footer copy and copyright year is updated', () => {
        cy.get('.footer_copy')
            .should('contain', year + ' Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy')
    });

});