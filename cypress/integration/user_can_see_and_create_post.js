//Feature: Posts Page
//
//As a logged-in user,
//I want to be able to see posts, See comments on posts, and number of likes, and the initials of the author user, So that I can connect with other users.
//Feature: Create Post
//
//As a logged-in user, I want to be able to click create post, And be taken to new post page, Enter some content or upload an image, So that I can create a post.
//Feature: Comment on Post
//
//As a logged-in user,
//I want to be able to comment on an existing post, By entering a comment and submitting it, So that I can see my comment is reflected on the post.
//Feature: Like a Post
//
//As a logged-in user,
//I want to be able to like an existing post, By clicking a like button, So that I can see my like is reflected on the post.


const Chance = require('chance');
const chance = new Chance();


describe("Posts", () => {

    it("A signed in user can create a post and see it displayed", () => {
    //create random post message
    const new_post = chance.paragraph({ sentences: 1 })

  
      // sign in
    cy.signIn();
  
    cy.url().should("include", "/posts");

    //create a new post
    cy.get('a.global-button.new-post-link[href="/posts/new"]').click();

    //type in a random message
    cy.get('#message').type(new_post);
    cy.get('input[type="submit"][value="Submit"]').click();
    //assert that message is displayed
    cy.get('p.message')
      .should('exist')
      .contains(new_post);
  // Assert the existence of the "author" element
  //cy.get('div.author').should('exist');

  // Assert that the "author" element contains the name of the admin account
  //cy.get('div.author').should('contain', 'Mrtest Testtest');
    });



    it("A signed in user cannot create an empty post - test currently inactive", () => {

      // sign in
    cy.signIn();

    cy.url().should("include", "/posts");

    cy.get('a.global-button.new-post-link[href="/posts/new"]').click();

    //submit without typing anything
    cy.get('input[type="submit"][value="Submit"]').click();

    //shouldnt move from the page
    cy.url().should('include', '/posts/new');

    });


it("User can click on and add a comment to a post", () => {

    const new_post_3 = chance.paragraph({ sentences: 1 })
    const new_comment = chance.paragraph({ sentences: 1 })
      // sign in
    cy.signIn();

    //click new post
    cy.get('a.global-button.new-post-link[href="/posts/new"]').click();

    cy.get('#message').type(new_post_3);
    cy.get('input[type="submit"][value="Submit"]').click();

  // Grab any one of the input elements
  cy.get('input#comment.comment-box.input-box').first().as('commentInput');

  // Type text into the input element
  cy.get('@commentInput').type(new_comment);

  // Assert that any of the elements contains the entered text eventually
  cy.get('input#comment.comment-box.input-box').should('have.value', new_comment);

});



it("User can click on and see likes count, and add more likes and see it reflected", () => {
    const new_post_2 = chance.paragraph({ sentences: 1 })

  cy.signIn();


    //create a new post in case of test order issues
  cy.get('a.global-button.new-post-link[href="/posts/new"]').click();

    cy.get('#message').type(new_post_2);
    cy.get('input[type="submit"][value="Submit"]').click();


  cy.get('.post-details').contains('.message', new_post_2).parent('.post-details').within(() => {

        // Click the Like button
        cy.get('.like-button').click();

        });


    //check that the count has increased
  cy.get('.post-details').contains('.message', new_post_2).parent('.post-details').within(() => {

        cy.get('p.likes-count').should('have.text', '1');


      });
    });

});







