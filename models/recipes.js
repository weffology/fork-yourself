module.exports = function (sequelize, DataTypes) {
  var recipes = sequelize.define("Recipes", {
    recipe_name: DataTypes.STRING,
    image_URL: DataTypes.STRING,
    recipe_URL: DataTypes.STRING,
    diet_label: DataTypes.STRING,
    health_label: DataTypes.STRING,
    ingredients: DataTypes.TEXT,
    calories: DataTypes.INTEGER,
    yields: DataTypes.INTEGER,
  });
  return recipes;
};
