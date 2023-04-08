describe('app works correctly with routes', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000');
    });
  
    it('should open cart page by default', function() {
      cy.contains('МБОУ АЛГОСОШ');
    });
  
    it('should open string', function() {
      cy.get('[data-testid="recursion"]').click();
    });
    it('should open fibonacci', function() {
        cy.get('[data-testid="fibonacci"]').click();
      });
    it('should open sorting', function() {
      cy.get('[data-testid="sorting"]').click();
    });
    it('should open stack', function() {
        cy.get('[data-testid="stack"]').click();
      });
		it('should open queue', function() {
      cy.get('[data-testid="queue"]').click();
    });
		it('should open list', function() {
      cy.get('[data-testid="list"]').click();
    });
  }); 