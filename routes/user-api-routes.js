var db = require("../models");

module.exports = function (app) {

  // GET route for all of the user's recipes
  app.get("/api/:user", function (req, res) {
    db.Post.findAll({
      where: {
        id: req.params.user,
      }
    })
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });

  // GET route for the user's recipes by diet category
  app.get("/api/:user/:diet", function (req, res) {
    db.Post.findAll({
      where: {
        id: req.params.user,
        dietLabels: req.params.diet
      }
    })
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });

  app.post("/api/user/recipes", function(req, res) {
    db.Post.create(req.body).then(function(dbPost){
      res.json(dbPost);
    })
  })

  // DELETE route for deleting recipe
  app.delete("/api/:user/:id", function (req, res) {
    db.Post.destroy({
      where: {
        id: req.params.user,

      }
    })
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });

};
