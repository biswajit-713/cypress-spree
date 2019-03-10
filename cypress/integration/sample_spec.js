/// <reference types="Cypress" />


describe('search and add to cart functionality', () => {
  
    beforeEach(() => {
      cy.visit('/');
    })

    it('searches product successfully', () => {
      const searchItem = 'bag';

      cy.get('#keywords').type(searchItem);
      cy.get("input[value='Search']").click();
      cy.get('.search-results-title').should("have.text", `Search results for '${searchItem}'`);

      cy.get('#products').find("div[data-hook='products_list_item']").should('have.length', 2);

        cy.get('#products')
          .find('img')
          .then($elements => {
            $elements.each((index, $element) => {
              var imageUrl = `${Cypress.config('baseUrl')}${$element.getAttribute('src')}`;
              cy.request(imageUrl)
                .then(response => {
                  expect(response.status).to.equal(200);
                });
            });
          });
    });

    it('adds products to the cart successfully', () => {

      // get both the product elements
      cy.get('#products').find("div[data-hook='products_list_item']").first().as('product1');
      cy.get('#products').find("div[data-hook='products_list_item']").first().next().as('product2');

      // add 2 items of product 1 and 3 items of product 2 to cart
      cy.get('@product1').find('#quantity').clear().type(2);
      cy.get('@product1').find('.add_to_cart_products__button').click();
      cy.get('@product2').find('#quantity').clear().type(3);
      cy.get('@product2').find('.add_to_cart_products__button').click();

      // view the cart summary and verify
      cy.get('#link-to-cart').find('.amount')
        .then($element => {
          let totalCartValue = $element.text();
          cy.wrap(totalCartValue).as('totalCartValue');

          cy.get('@product1').find('.price').invoke('text').as('priceOfProduct1');
          cy.get('@product2').find('.price').invoke('text').as('priceOfProduct2');

          cy.then(function() {
            let priceOfProduct1 = parseFloat(this.priceOfProduct1.replace('$', ''));
            let priceOfProduct2 = parseFloat(this.priceOfProduct2.replace('$', ''));
            let calculatedCartValue = priceOfProduct1 * 2 + priceOfProduct2 * 3;
            expect(totalCartValue).to.eq(`$${calculatedCartValue.toFixed(2).toString()}`);
          })
        });

      // click the cart
      cy.get('#link-to-cart').click();

      // validate the result
      cy.get('@totalCartValue')
        .then(element => {
          cy.get('.cart-total').find('.lead').should('have.text', element);
        })
      // remove them from cart
      cy.get("input[value='Empty Cart']").click();
    });
});