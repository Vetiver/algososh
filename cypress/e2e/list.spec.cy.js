import {SHORT_ANIMATION} from '../../src/constants/constants'
describe('list', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000/list');
      cy.contains('Связный список');
    });
    it("button disabled", () => {
        cy.get('[data-testid="listButtonAddHead"]').should("be.disabled");
        cy.get('[data-testid="listButtonAddTail"]').should("be.disabled");
        cy.get('[data-testid="listButtonAddIndex"]').should("be.disabled");
        cy.get('[data-testid="listButtonDelIndex"]').should("be.disabled");
      });
    
      it("default array", () => {
        cy.get('[data-testid="stringCircle"]').should("have.length", 4);
        cy.get('[data-testid="stringCircle"]').each((el) => {
          cy.get(el).should("have.css", "border-color", "rgb(0, 50, 255)");
        });
    
        cy.get('[data-testid="contentCircle"]').each((el) => {
          [][0] = el.text();
          [][1] = el.text();
          [][2] = el.text();
          [][3] = el.text();
        });
    
        cy.get('[data-testid="head"]').then((el) => {
          cy.get(el).eq(0).should("have.text", "head");
          for (let i = 1; i < Cypress.$(el); i++) {
            cy.get(el).eq(i).should("have.text", "");
          }
        });
    
        cy.get('[data-testid="tail"]').then((el) => {
          const { length } = Cypress.$(el);
          for (let i = 0; i < length - 1; i++) {
            cy.get(el).eq(i).should("have.text", "");
          }
    
          cy.get(el)
            .eq(length - 1)
            .should("have.text", "tail");
        });
      });

      it("add element to head", () => {
        cy.get('[data-testid="listInputEl"]').type(1);
        cy.get('[data-testid="listButtonAddHead"]').click();

        cy.get('[data-testid="circleTarget"]').should("have.text", 1);
        cy.get('[data-testid="circleTarget"]').should("have.css", "border-color", "rgb(210, 82, 225)");
        cy.wait(SHORT_ANIMATION);
        cy.get('[data-testid="circleTarget"]').should("not.exist");
        cy.get('[data-testid="stringCircle"]')
          .eq(0)
          .should("have.css", "border-color", "rgb(127, 224, 81)");
        cy.get('[data-testid="stringCircle"]').eq(0).should("have.css", "border-color", "rgb(0, 50, 255)");
        cy.get('[data-testid="stringCircle"]').eq(0).should("have.text", 1);
    
        cy.get('[data-testid="head"]').then((el) => {
          cy.get(el).eq(0).should("have.text", "head");
          for (let i = 1; i < Cypress.$(el); i++) {
            cy.get(el).eq(i).should("have.text", "");
          }
        });
    
        cy.get('[data-testid="tail"]').then((el) => {
          for (let i = 0; i < Cypress.$(el) - 1; i++) {
            cy.get(el).eq(i).should("have.text", "");
          }
        });
      });
    
      it("remove element head", () => {
        const numbers = [1, 2];
    
        for (let i = 0; i < numbers.length; i++) {
          cy.get('[data-testid="listInputEl"]').type(numbers[i]);
          cy.get('[data-testid="listButtonAddHead"]').click();
          cy.wait(SHORT_ANIMATION);
        }
        cy.get('[data-testid="stringCircle"]').should("exist");
        cy.get('[data-testid="listButtonDelHead"]').click();
    
        cy.get('[data-testid="stringCircle"]').eq(0).should("have.text", "");
        cy.get('[data-testid="circleTarget"]').should("have.text", numbers[1]);
        cy.get('[data-testid="circleTarget"]').should("have.css", "border-color","rgb(210, 82, 225)");
        cy.get('[data-testid="stringCircle"]').eq(0).should("have.text", numbers[0]);
    
        cy.get('[data-testid="head"]').then((el) => {
          cy.get(el).eq(0).should("have.text", "head");
          for (let i = 1; i < Cypress.$(el); i++) {
            cy.get(el).eq(i).should("have.text", "");
          }
        });
        cy.get('[data-testid="tail"]').then((el) => {
          for (let i = 0; i < Cypress.$(el) - 1; i++) {
            cy.get(el).eq(i).should("have.text", "");
          }
          cy.get('[data-testid="circleIndex"]').each((el, index) => {
            cy.get(el).should("contain", index);
          });
        });
      });
    
      it("add element to tail", () => {
        cy.get('[data-testid="listInputEl"]').type(1);
        cy.get('[data-testid="listButtonAddTail"]').click();
        cy.get('[data-testid="circleTarget"]').should("have.text", 1);
        cy.get('[data-testid="circleTarget"]').should("have.css", "border-color", "rgb(210, 82, 225)");
        cy.wait(SHORT_ANIMATION);
        cy.get('[data-testid="stringCircle"]').last().should("have.css", "border-color", "rgb(127, 224, 81)");
        cy.get('[data-testid="stringCircle"]').last().should("have.css", "border-color", "rgb(0, 50, 255)");
        cy.get('[data-testid="stringCircle"]').last().should("have.text", 1);
        cy.get('[data-testid="head"]').then((el) => {
          cy.get(el).eq(0).should("have.text", "head");
          for (let i = 1; i < Cypress.$(el); i++) {
            cy.get(el).eq(i).should("have.text", "");
          }
        });
    
        cy.get('[data-testid="tail"]').then((el) => {
          for (let i = 0; i < Cypress.$(el) - 1; i++) {
            cy.get(el).eq(i).should("have.text", "");
          }
          cy.get('[data-testid="circleIndex"]').each((el, index) => {
            cy.get(el).should("contain", index);
          });
        });
      });
    
      it("remove element tail", () => {
        const numbers = [1, 2];
    
        for (let i = 0; i < numbers.length; i++) {
          cy.get('[data-testid="listInputEl"]').type(numbers[i]);
          cy.get('[data-testid="listButtonAddTail"]').click();
          cy.wait(SHORT_ANIMATION);
        }
        cy.get('[data-testid="stringCircle"]').should("exist");
        cy.get('[data-testid="listButtonDelTail"]').click();
        cy.get('[data-testid="stringCircle"]').last().should("have.text", "");
        cy.get('[data-testid="circleTarget"]').should("have.text", numbers[1]);
        cy.get('[data-testid="circleTarget"]').should("have.css", "border-color", "rgb(210, 82, 225)");
        cy.get('[data-testid="stringCircle"]').last().should("have.text", numbers[0]);
    
        cy.get('[data-testid="head"]').then((el) => {
          cy.get(el).eq(0).should("have.text", "head");
          for (let i = 1; i < Cypress.$(el); i++) {
            cy.get(el).eq(i).should("have.text", "");
          }
        });
        cy.get('[data-testid="tail"]').then((el) => {
          for (let i = 0; i < Cypress.$(el) - 1; i++) {
            cy.get(el).eq(i).should("have.text", "");
          }
        cy.get('[data-testid="circleIndex"]').each((el, index) => {
          cy.get(el).should("contain", index);
          });
        });
      });
    
      it("add by index", () => {
        const data = {
          value: 1,
          index: 2,
        };
        cy.get('[data-testid="listInputEl"]').type(data.value);
        cy.get('[data-testid="listInputIndex"]').type(data.index);
        cy.get('[data-testid="listButtonAddIndex"]').click();
    
        cy.get('[data-testid="stringCircle"]')
          .eq(data.index)
          .should("have.css", "border-color",'rgb(0, 50, 255)');
        cy.get('[data-testid="stringCircle"]')
          .eq(data.index)
          .should("have.css", "border-color","rgb(0, 50, 255)");
        cy.get('[data-testid="stringCircle"]')
          .eq(data.index)
          .should("have.text", data.value);
    
        cy.get('[data-testid="head"]').then((el) => {
          cy.get(el).eq(0).should("have.text", "head");
          for (let i = 1; i <  Cypress.$(el); i++) {
            cy.get(el).eq(i).should("have.text", "");
          }
        });
    
        cy.get('[data-testid="tail"]').then((el) => {
          for (let i = 0; i <  Cypress.$(el) - 1; i++) {
            cy.get(el).eq(i).should("have.text", "");
          }  
          cy.get('[data-testid="circleIndex"]').each((el, index) => {
            cy.get(el).should("contain", index);
          });
        });
      });
    
      it("remove by index", () => {
        const numbers = ['t','e'];
        const index = 4;
        for (let i = 0; i < numbers.length; i++) {
          cy.get('[data-testid="listInputEl"]').type(numbers[i]);
          cy.get('[data-testid="listButtonAddTail"]').click();
          cy.wait(SHORT_ANIMATION);
        }
        cy.get('[data-testid="listInputIndex"]').type(index);
        cy.get('[data-testid="listButtonDelIndex"]').click();
    
        for (let i = 0; i < index - 1; i++) {
          cy.get('[data-testid="stringCircle"]').should("have.css", "border-color", "rgb(210, 82, 225)");
          cy.get('[data-testid="stringCircle"]').last().should("have.text", 'e');
          cy.get('[data-testid="circleIndex"]').should("have.css", "border-color", 'rgb(61, 61, 61)');
        }
        cy.get('[data-testid="stringCircle"]').should("have.css", "border-color", 'rgb(210, 82, 225)');
        cy.get('[data-testid="head"]').then((el) => {
          for (let i = 1; i < Cypress.$(el); i++) {
            cy.get(el).eq(i).should("have.text", "");
          }
        });
    
        cy.get('[data-testid="tail"]').then((el) => {
          for (let i = 0; i < Cypress.$(el) - 1; i++) {
            cy.get(el).eq(i).should("have.text", "");
          }
          cy.get('[data-testid="circleIndex"]').each((el, index) => {
            cy.get(el).should("contain", index);
          });
        });
      });

  }); 