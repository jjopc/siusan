describe("Navigation", function () {
  it("Can navigate to log in from home", function () {
    cy.visit("/#/");
    cy.get("a").contains("Log in").click();
    cy.hash().should("eq", "#/login");
  });
});
