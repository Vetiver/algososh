import {SHORT_ANIMATION, LONG_ANIMATION} from '../../src/constants/constants'
describe('queue', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000/queue');
      cy.contains('Очередь');
    });
    it('button disabled', function() {
        cy.get('[data-testid="queueButtonAdd"]').should("be.disabled");
        cy.get('[data-testid="queueButtonDel"]').should("be.disabled");
        cy.get('[data-testid="queueButtonVoid"]').should("be.disabled");
      });
      it("add", function () {
        const numbers = [1,2,3];
        for (let i = 0; i < numbers.length; i++) {
          cy.get('[data-testid="queueInput"]').type(numbers[i]);
          cy.get('[data-testid="queueButtonAdd"]').click();
          cy.get('[data-testid="stringCircle"]')
            .eq(i)
            .should("have.css", "border-color", "rgb(210, 82, 225)");
          cy.wait(SHORT_ANIMATION);
          cy.get('[data-testid="stringCircle"]').eq(i).should("have.text", numbers[i]);
          cy.get('[data-testid="stringCircle"]')
            .eq(i)
            .should("have.css", "border-color", "rgb(0, 50, 255)");
          cy.wait(SHORT_ANIMATION);
        }
        cy.get('[data-testid="head"]').eq(0).within((el) => expect(el).to.have.text("head"));
        cy.get('[data-testid="tail"]').eq(2).within((el) => expect(el).to.have.text("tail"));
      });
    
      it("remove", function () {
        const numbers = [1,2,3];
        for (let i = 0; i < numbers.length; i++) {
          cy.get('[data-testid="queueInput"]').type(numbers[i]);
          cy.get('[data-testid="queueButtonAdd"]').click();
        }
        for (let i = 0; i < numbers.length - 1; i++) {
          cy.get('[data-testid="queueButtonDel"]').click();
          cy.get('[data-testid="stringCircle"]').eq(i).should("have.css", "border-color", "rgb(210, 82, 225)");
          cy.wait(LONG_ANIMATION);
          cy.get('[data-testid="stringCircle"]').eq(i).should("have.css", "border-color", "rgb(0, 50, 255)");
          cy.get('[data-testid="head"]').eq(i + 1).within((el) => expect(el).to.have.text("head"));
          cy.get('[data-testid="tail"]').eq(numbers.length - 1).within((el) => expect(el).to.have.text("tail"));
          cy.get('[data-testid="stringCircle"]').eq(i).should("have.text", "");
        }
        cy.get('[data-testid="head"]').eq(numbers.length - 1).within((el) => expect(el).to.have.text("head"));
        cy.get('[data-testid="tail"]').eq(numbers.length - 1).within((el) => expect(el).to.have.text("tail"));
        cy.get('[data-testid="queueButtonDel"]').click();
        cy.get('[data-testid="stringCircle"]').eq(numbers.length - 1).should("have.css", "border-color", "rgb(210, 82, 225)");
        cy.wait(LONG_ANIMATION);
        cy.get('[data-testid="stringCircle"]').eq(numbers.length - 1).should("have.css", "border-color", "rgb(0, 50, 255)");
        cy.get('[data-testid="stringCircle"]').each((el) => {
          cy.get(el).should("have.text", "");
        });
        cy.get('[data-testid="head"]').each((el) => {
          cy.get(el).should("have.text", "");
        });
        cy.get('[data-testid="tail"]').each((el) => {
          cy.get(el).should("have.text", "");
        });
      });
    
      it("clean", function () {
        const numbers = [1,2,3];
        for (let i = 0; i < numbers.length; i++) {
          cy.get('[data-testid="queueInput"]').type(numbers[i]);
          cy.get('[data-testid="queueButtonAdd"]').click();
          cy.wait(LONG_ANIMATION);
        }
        cy.get('[data-testid="queueButtonVoid"]').click();
    
        cy.get('[data-testid="stringCircle"]').each((el) => {
          cy.get(el).should("have.text", "");
        });
        cy.get('[data-testid="head"]').each((el) => {
          cy.get(el).should("have.text", "");
        });
        cy.get('[data-testid="tail"]').each((el) => {
          cy.get(el).should("have.text", "");
        });
      });
  }); 