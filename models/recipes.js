module.exports = function (sequelize, DataTypes) {
  var recipes = sequelize.define("recipes", {
    recipe_name: DataTypes.STRING,
    recipe_URL: DataTypes.STRING,
  });
  return recipes;
};
