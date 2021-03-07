// @ts-nocheck

/// <reference types="cypress" />

context("PokemonImage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/pokemons/", {
      onBeforeLoad(window) {
        window.speechSynthesis.speak = function () {};
      },
    });
    cy.get(".pokemon-navigation ul li:first-child").click();
  });

  it("should have be a figure element", () => {
    cy.get(".pokemon-image").should($element => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect($element.is("figure")).to.be.true;
    });
  });

  it("should show a front view of the pokemon", () => {
    cy.get(".pokemon-image").should($element => {
      const image = $element.find("img");

      expect(image.get(0).alt).to.match(/front view of/i);

      const caption = $element.find("figcaption");

      expect(caption.get(0).textContent).to.match(/front view of/i);
    });
  });

  it("should show a back view of the pokemon when clicked", () => {
    cy.get(".pokemon-image")
      .click()
      .should($element => {
        const image = $element.find("img");

        expect(image.get(0).alt).to.match(/back view of/i);

        const caption = $element.find("figcaption");

        expect(caption.get(0).textContent).to.match(/back view of/i);
      });
  });
});
