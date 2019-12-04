var path = require("path");

// require custom middleware to check if user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to their account page
    if (req.user) {
      res.redirect("/account");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to their account page
    if (req.user) {
      res.redirect("/account");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/search", function(req, res) {
    // If the user already has an account send them to their account page
    res.sendFile(path.join(__dirname, "../public/search.html"));
  });

  // if user is not logged in & tries to access this route they will be redirected to the signup page
  app.get("/account", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/account.html"));
  });

};
