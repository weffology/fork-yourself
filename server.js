var express = require("express");
var session = require("express-session");
var passport = require("./config/passport");
var app = express();
var PORT = process.env.PORT || 8080;
var db = require("./models");

// set up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// sync sequelize models and then start express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
