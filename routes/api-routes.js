// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var Sequelize = require("sequelize");

module.exports = function(app) {

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  app.post("/api/recipes", function(req, res) {
    db.recipes.create(req.body).then(function(dbrecipes) {
      res.json(dbrecipes);
    });
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/recipes", function(req, res) {
    console.log(req.session.passport.user.id);
    db.recipes.findAll({
      where: {
        user_ID: req.session.passport.user.id
      }
    }).then(function(dbrecipes) {
      console.log(dbrecipes);
      res.json(dbrecipes);
    });
  });







};
