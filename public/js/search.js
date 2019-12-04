$(document).ready(function () {
  
  //establish global variables
  var recipe_name = "";
  var image_URL = "";
  var recipe_URL = "";
  var diet_label = "";
  var health_label = "";
  var ingredients = "";
  var calories = 0;
  var yields = 0;

  //create function that searches Edamam API for recipes based on certain parameters
  function getRecipes() {
    var ingredient = $("#searchIngredient").val().trim();
    var dietLabelSelected = $("#dietLabel").val();
    var healthLabelSelected = $("#healthLabel").val();
    var minCal = $("#minCal").val().trim();
    var maxCal = $("#maxCal").val().trim();
    var minResult = 0;
    var maxResult = 10;
    var appID = "5c3e07f7";
    var apiKey = "1316c756340d9d944deb3b65ac2a7e52";
    var queryURL = "https://api.edamam.com/search?q=" + ingredient + "&app_id=" + appID + "&app_key=" + apiKey + "&from=" + minResult + "&to=" + maxResult + "&calories=" + minCal + "-" + maxCal + "&diet=" + dietLabelSelected + "&health=" + healthLabelSelected;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      for (var i = 0; i < response.hits.length; i++) {
        console.log(response.hits[i])
        recipe_name = response.hits[i].recipe.label;
        image_URL = response.hits[i].recipe.image;
        recipe_URL = response.hits[i].recipe.url;
        diet_label = response.hits[i].recipe.dietLabels;
        health_label = response.hits[i].recipe.healthLabels;
        ingredients = response.hits[i].recipe.ingredientLines;
        calories = response.hits[i].recipe.calories;
        yields = response.hits[i].recipe.yield;
        $("#foodData").html("<h3>Your results:</h3>");
        returnRecipes();
      }
    })
  };

  //create function that dynamically pushes results into HTML on page
  function returnRecipes() {
    var divRecipes = $("<div>");
    divRecipes.attr("class", "recipe");
    divRecipes.append("<p><strong>Recipe Name:</strong> " + recipe_name + "</p>");
    divRecipes.append("<p><strong>Recipe Link:</strong> " + recipe_URL + "</p>");
    divRecipes.append("<p><strong>Diet:</strong> " + diet_label + "</p>");
    divRecipes.append("<p><strong>Health Label(s):</strong> " + health_label + "</p>");
    divRecipes.append("<p><strong>Ingredients List</strong></p><p><ul>");
    for (var j = 0; j < ingredients.length; j++) {
      divRecipes.append("<li>" + ingredients[j] + "</li>");
    }
    divRecipes.append("</ul></p>");
    divRecipes.append("<p><strong>Calories:</strong> " + Math.round(calories) + "</p>");
    divRecipes.append("<p><strong>Yields:</strong> " + yields + "</p>");
    $("#foodData").append(divRecipes);
  };

  $("#searchBtn").click(function (event) {
    event.preventDefault();
    getRecipes();
  });

  $.get("/api/user_data").then(function(data) {
    console.log(data.email);
    console.log(data.id);
    user_ID = data.id;
  });

  $("#saveBtn").click(function (event) {
    var newSave = {
      user_ID: user_ID,
      recipe_name: recipe_name,
      recipe_URL: recipe_URL
    };
    console.log(newSave);
    $.post("/api/recipes/", newSave, function() {
      console.log("----- recipes saved -----")
  });
});



});