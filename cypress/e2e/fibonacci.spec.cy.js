describe('fibonacci', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000/fibonacci');
      cy.contains('Последовательность Фибоначчи');
    });
    it('button disabled', function() {
        cy.get('[data-testid="fibonacciButton"]').should("be.disabled");
      });
      it('to do', function() {
        const number = 5;
        const result = [1,1,2,3,5,8];
        cy.get('[data-testid="fibonacciInput"]').type(number);
        cy.get('[data-testid="fibonacciButton"]').click();
        for (let i = 0; i < number; i++) {
            cy.get('[data-testid="stringCircle"]').each((el, index, list) => {
              cy.get(el).contains(result[index]);
            });
      }});
  }); 