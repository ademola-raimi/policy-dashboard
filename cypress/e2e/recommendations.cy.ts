/// <reference types="cypress" />

describe('Policy Recommendations Dashboard', () => {
  beforeEach(() => {
    cy.visit('/recommendations');
  });

  it('should display the recommendations list with skeleton loader', () => {
    cy.get('.animate-pulse').should('exist');
    cy.get('.animate-pulse').should('have.length.greaterThan', 0);
    cy.get('h1').contains('Recommendations');
  });

  it('should load more recommendations on scroll (infinite scroll)', () => {
    cy.get('[data-cy="recommendation-card"]').should('have.length.greaterThan', 0);
    cy.scrollTo('bottom');
    cy.get('.text-cyan-600').contains('Loading more...');
  });

  it('should open and close the side panel with details', () => {
    cy.get('[data-cy="recommendation-card"]').first().click();
    cy.get('[data-cy="side-panel"]').should('be.visible');
    cy.get('[aria-label="Close"]').click();
    cy.get('[data-cy="side-panel"]').should('not.exist');
  });

  it('should archive a recommendation and refetch the list', () => {
    cy.get('[data-cy="recommendation-card"]').first().click();
    cy.get('[data-cy="side-panel"]').should('be.visible');
    cy.get('[data-cy="archive-btn"]').click();
    cy.get('[data-cy="side-panel"]').should('not.exist');
    // Optionally check for a refetch or success message
  });

  it('should highlight Recommendations menu for /recommendations/archive', () => {
    cy.visit('/recommendations/archive');
    cy.get('nav').contains('Recommendations').should('have.class', 'text-blue-600');
  });

  it('should show mobile sidebar and hamburger menu', () => {
    cy.viewport('iphone-6');
    cy.get('[aria-label="Open menu"]').click();
    cy.get('nav').contains('Recommendations').should('be.visible');
    cy.get('nav').contains('Recommendations').click();
    cy.get('[aria-label="Open menu"]').should('be.visible');
  });
});
