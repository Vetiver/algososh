import {LONG_ANIMATION} from '../../src/constants/constants'
describe('string', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000/recursion');
      cy.contains('Строка');
    });
    it('button disabled', function() {
        cy.get('[data-testid="stringButton"]').should("be.disabled");
      });
    it('to do', function() {
      const text = 'text'
      const textMod = 'txet'
      const color1 = ["rgb(210, 82, 225)",  "rgb(0, 50, 255)",  "rgb(0, 50, 255)", "rgb(210, 82, 225)"]
      const color2 = ["rgb(127, 224, 81)", "rgb(210, 82, 225)", "rgb(210, 82, 225)", "rgb(127, 224, 81)"]
      const color3 = ["rgb(127, 224, 81)", "rgb(127, 224, 81)", "rgb(127, 224, 81)", "rgb(127, 224, 81)"]
      cy.get('[data-testid="stringInput"]').type(text);
      cy.get('[data-testid="stringButton"]').click();
      cy.get('[data-testid="stringCircle"]').each((element, index, list) => {
        cy.get(list).should('have.length', text.length)
        cy.get(element).contains(text[index])
        cy.get(element).should('have.css', 'border-color', color1[index])
      })
      cy.wait(LONG_ANIMATION)
      cy.get('[data-testid="stringCircle"]').each((element, index) => {
        cy.get(element).contains(text[index])
        cy.get(element).should('have.css', 'border-color', color2[index])
      })
      cy.wait(LONG_ANIMATION)
      cy.get('[data-testid="stringCircle"]').each((element, index) => {
        cy.get(element).contains(textMod[index])
        cy.get(element).should('have.css', 'border-color', color3[index])
      })
    });
    
  }); 