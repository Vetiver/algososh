import {LONG_ANIMATION} from '../../src/constants/constants'
describe('stack', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000/stack');
      cy.contains('Стек');
    });
    it('button disabled', function() {
        cy.get('[data-testid="stackButtonAdd"]').should("be.disabled");
        cy.get('[data-testid="stackButtonDel"]').should("be.disabled");
        cy.get('[data-testid="stackButtonVoid"]').should("be.disabled");
      });
      it('add stack', function() {
        const numbers = [1,2];
        for (let i = 0; i < numbers.length; i++) {
          cy.get('[data-testid="stackInput"]').type(numbers[i]);
          cy.get('[data-testid="stackButtonAdd"]').click();
          cy.get('[data-testid="stringCircle"]').each((el, index, list) => {
            if (index < list - 1 && list !== 1) {
              cy.get(el).contains(numbers[index]);
              cy.get(el).should("have.css", "border-color",  "rgb(0, 50, 255)");
            }
            if (list === 1 || index === list - 1) {
              cy.get(el).contains(numbers[index]);
              cy.get(el).should("have.css", "border-color", "rgb(210, 82, 225)");
              cy.get(el).contains(numbers[index]);
              cy.get(el).should("have.css", "border-color", "rgb(0, 50, 255)");
            }
          });
        }
      });
      it('remove stack', function() {
        const numbers = [1,2];
        for (let i = 0; i < numbers.length; i++) {
            cy.get('[data-testid="stackInput"]').type(numbers[i]);
            cy.get('[data-testid="stackButtonAdd"]').click();
          }
        cy.get('[data-testid="stackButtonDel"]').click();
        cy.get('[data-testid="stringCircle"]').last().should("have.css", "border-color", "rgb(210, 82, 225)");
        cy.wait(LONG_ANIMATION)
        cy.get('[data-testid="stringCircle"]').should("have.css", "border-color", "rgb(0, 50, 255)");
      });
      it('clear stack', function() {
        const numbers = [1,2];
        for (let i = 0; i < numbers.length; i++) {
            cy.get('[data-testid="stackInput"]').type(numbers[i]);
            cy.get('[data-testid="stackButtonAdd"]').click();
          }
        cy.get('[data-testid="stackButtonVoid"]').click();
        cy.get('[data-testid="stringCircle"]').should("have.length", 0);
      });

  }); 