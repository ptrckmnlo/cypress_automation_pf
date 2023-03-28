describe('Product + Add to cart Test', () => {
    
    beforeEach(() => {
        cy.visit('/');
        cy.fixture('login-details').then(function (data) {
          this.data = data;
          const { username, password } = this.data.stdUser;
            cy.login(username, password);
        })
        cy.fixture('basic-info').then(function (basicInfo) {
            this.basicInfo = basicInfo;
        })
    });

    it('1. Check that filters update the order of items', () => {
        cy.get('[data-test="product_sort_container"]').as('filter')
            .should('have.value', 'az')
        cy.get('@filter').select(1);
        cy.get('@filter').should('have.value', 'za');
        cy.get('@filter').select(2);
        cy.get('@filter').should('have.value', 'lohi');
        cy.get('@filter').select(3);
        cy.get('@filter').should('have.value', 'hilo');
    });

    it('2. Check that user can be able to add to cart all products', () => {
        cy.addAllItems();
        cy.addToCartBtn().invoke('text').should('contain', 'Remove');
    });

    it('3. Check that user can be able to remove product/s to cart', () => { 
        cy.addAllItems();
        cy.clickBtn('.shopping_cart_link');
        cy.removeAllItems();
        cy.get('.cart_item').should('not.exist');
    });

    it('4. Check that user can checkout products successfully', function () {
        cy.addAllItems();
        cy.clickBtn('.shopping_cart_link');
        cy.clickBtn('[data-test="checkout"]');
        cy.get('[data-test="firstName"]').type(this.basicInfo.firstName);
        cy.get('[data-test="lastName"]').type(this.basicInfo.lastName);
        cy.get('[data-test="postalCode"]').type(this.basicInfo.zipCode);
        cy.clickBtn('[data-test="continue"]');
        cy.clickBtn('[data-test="finish"]');
        cy.get('.checkout_complete_container').should('be.visible');
    });

    it('5. Check that error appears with blank information', () => {
        cy.addAllItems();
        cy.clickBtn('.shopping_cart_link');
        cy.clickBtn('[data-test="checkout"]');
        cy.clickBtn('[data-test="continue"]');
        cy.get('[data-test="error"]').should('contain', 'Error: First Name is required')
    });

    it('6. Check that error appears with incomplete information', function () {
       cy.addAllItems();
       cy.clickBtn('.shopping_cart_link');
       cy.clickBtn('[data-test="checkout"]');
       cy.get('[data-test="firstName"]').as('fName').type(this.basicInfo.firstName);
       cy.clickBtn('[data-test="continue"]');
       cy.get('[data-test="error"]').as('error').should('contain', 'Error: Last Name is required')
       cy.get('[data-test="lastName"]').type(this.basicInfo.lastName);
       cy.clickBtn('[data-test="continue"]');
       cy.get('@error').should('contain', 'Error: Postal Code is required')
       cy.get('[data-test="postalCode"]').type(this.basicInfo.zipCode);
       cy.get('@fName').clear()
       cy.clickBtn('[data-test="continue"]');
       cy.get('@error').should('contain', 'Error: First Name is required')
    });
})