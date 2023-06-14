const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  //Hash password

  Create: (req, res) => {
    const { email, firstName, lastName, password } = req.body;
    const maxLength = 50; // Define the maximum character limit for the names

    if (firstName.length > maxLength) {
      return res.status(400).render("users/new", {
        error: "First name exceeds the character limit",
      });
    }

    if (lastName.length > maxLength) {
      return res.status(400).render("users/new", {
        error: "Last name exceeds the character limit",
      });
    }

    // Validate the first name to check for punctuation
    const hasFirstNamePunctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(
      firstName
    );

    // Validate the last name to check for punctuation
    const hasLastNamePunctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(
      lastName
    );

    if (hasFirstNamePunctuation) {
      return res.status(400).render("users/new", {
        error: "First name should not contain punctuation",
      });
    } else if (hasLastNamePunctuation) {
      return res.status(400).render("users/new", {
        error: "Last name should not contain punctuation",
      });
    }

    // Password validation
    const isPasswordValid = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/.test(
      password
    );

    if (!isPasswordValid) {
      return res.status(400).render("users/new", {
        error:
          "Password is not valid. Passwords must contain at least 8 characters, a number, and a special character",
      });
    }

    User.findOne({ email: email }, (err, existingUser) => {
      if (existingUser) {
        // A user with the same email address already exists.
        res
          .status(400)
          .render("users/new", { error: "Email address already taken" });
      } else {
        // Validate the first name to check for punctuation
        const firstName = req.body.firstName;
        const hasFirstNamePunctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(
          firstName
        );

        // Validate the last name to check for punctuation
        const lastName = req.body.lastName;
        const hasLastNamePunctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(
          lastName
        );

        if (hasFirstNamePunctuation) {
          res
            .status(400)
            .render("users/new", {
              error: "First name should not contain punctuation",
            });
        } else if (hasLastNamePunctuation) {
          res
            .status(400)
            .render("users/new", {
              error: "Last name should not contain punctuation",
            });
        } else {
          const user = new User(req.body);
          user.save((err) => {
            if (err) {
              res.status(500).render("users/new", { error: err.message });
            } else {
              // Create session for new user
              req.session.user = user;
              res.status(201).redirect("/posts"); // Add confirmation message
            }
          });
        }
      }

      const user = new User({ email, firstName, lastName, password });
      user.save((err) => {
        if (err) {
          return res.status(500).render("users/new", { error: err.message });
        }

        req.session.user = user;
        res.status(201).redirect("/posts");
      });
    });
  },
};

module.exports = UsersController;