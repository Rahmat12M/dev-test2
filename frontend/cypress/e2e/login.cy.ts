/// <reference types="cypress" />


describe('login page',()=>{
    it('should login a user', ()=>{
        cy.visit('http://localhost:4400/login');
        cy.url().should('include','/login');
        cy.get('input[name="username"]').type('admin');
        cy.get('input[name="password"]').type('1234');
        cy.get('button').click();
    })
});


describe('register page test', () => {

  it('should register new user', () => {

    cy.visit('http://localhost:4400/register');
    cy.get('input[name="username"]').type('test123');
    cy.get('input[name="password"]').type('1234');
    cy.get('input[name="confirmPassword"]').type('1234');

    cy.get('button').click();
    cy.url().should('include', '/book');

  });

});

