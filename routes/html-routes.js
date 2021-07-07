var path = require("path");

// require custom middleware to check if user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/search", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/search.html"));
  });

  app.get("/account", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/account.html"));
  });
  
  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/");
    }
  });
};
