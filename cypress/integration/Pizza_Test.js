describe("Full test on the Pizza Order js", function(){
    beforeEach("Locate the website", function(){
        cy.visit('http://localhost:3000/Pizza');
    })

    it("test the inputs on the order with errors", function(){
        cy.get('select[name="pizzaSize"]')
        .select('Large')
        .select('--Select Size--')
        .should("have.value", "")

        cy.get('#sizeErr')
        .should('be.visible')

        cy.get('input[name="orderName"]')
        .type('a')
        .should("have.value", "a")

        cy.get('#nameErr')
        .should('be.visible')

    })

    it("Test the inputs on the order without errors and submission", function(){
        cy.get('select[name="pizzaSize"]')
        .select('Large')
        .should("have.value", "lg")

        cy.get('input[name="pineapple"]')
        .check()
        .should('be.checked')

        cy.get('input[name="onions"]')
        .check()
        .should('be.checked')

        cy.get('input[name="pepperoni"]')
        .check().uncheck()
        .should('not.be.checked')

        cy.get('input[name="sausage"]')
        .check().uncheck()
        .should('not.be.checked')

        cy.get('textarea[name="special"]')
        .type("don't need any specialty")
        .should("have.value", "don't need any specialty")

        cy.get('input[name="orderName"]')
        .type('abba')
        .should("have.value", "abba")

        cy.get('[type="submit"]')
        .click()
    })
})