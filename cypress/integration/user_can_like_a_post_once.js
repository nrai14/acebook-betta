describe("Posts - Likes", () => {
it("user can like a post once", () => {
    // sign up
    cy.visit("/");
    cy.get('a.global-button[href="/users/new"]').click()
    cy.get("#email").type("admin@example.com");
    cy.get("#password").type("Password!123");
    cy.get("#confirm-password").type("Password!123");
    cy.get("#first-name").type("Mrtest")
    cy.get("#last-name").type("Testtest")
    cy.get("#submit").click();

    // sign in
    // cy.visit("/");
    // cy.get('a.global-button[href="/sessions/new"]').click()
    // cy.get("#email").type("admin@example.com");
    // cy.get("#password").type("Password!123");
    // cy.get("#submit").click();

    // create a post
    cy.visit("/posts/new");
    cy.get('#new-post-form').find('[type="text"]').type("Hello World!");
    cy.get('#new-post-form').submit();
    let likeButton = cy.get(".like-button").first();
    likeButton.click();
    let likeCount = cy.get(".likes-count").first();
    likeCount.should("have.text", "0");


});
});