$(document).ready(function () {

  //establish global variables
  var recipe_name = "";
  var recipe_URL = "";
  var diet_label = "";
  var health_label = "";
  var ingredient = "";
  var ingredients = "";
  var calories = 0;
  var yields = 0;
  var minCal = $("#minCal").val().trim();
  var maxCal = $("#maxCal").val().trim();
  var dietLabelSelected = $("#dietLabel").val();
  var healthLabelSelected = $("#healthLabel").val();
  var minResult = 0;
  var maxResult = 10;
  var appID = "5c3e07f7";
  var apiKey = "1316c756340d9d944deb3b65ac2a7e52";


  //create button listener for searching
  $("#searchBtn").click(function (event) {
    event.preventDefault();
    getRecipes();
  });

  //create function that searches Edamam API for recipes based on certain parameters
  function getRecipes() {
    var queryURL;
    ingredient = $("#searchIngredient").val().trim();

    if (($("#dietLabel").val() === "all") && ($("#healthLabel").val() === "none")) {
      queryURL = "https://api.edamam.com/search?q=" + ingredient + "&app_id=" + appID + "&app_key=" + apiKey + "&from=" + minResult + "&to=" + maxResult + "&calories=" + minCal + "-" + maxCal;
    }
    else if (($("#dietLabel").val() === "all") && ($("#healthLabel").val() !== "none")) {
      healthLabelSelected = $("#healthLabel").val();
      queryURL = "https://api.edamam.com/search?q=" + ingredient + "&app_id=" + appID + "&app_key=" + apiKey + "&from=" + minResult + "&to=" + maxResult + "&calories=" + minCal + "-" + maxCal + "&health=" + healthLabelSelected;
    }
    else if (($("#dietLabel").val() !== "all") && ($("#healthLabel").val() === "none")) {
      dietLabelSelected = $("#dietLabel").val();
      queryURL = "https://api.edamam.com/search?q=" + ingredient + "&app_id=" + appID + "&app_key=" + apiKey + "&from=" + minResult + "&to=" + maxResult + "&calories=" + minCal + "-" + maxCal + "&diet=" + dietLabelSelected;
    }
    else {
      dietLabelSelected = $("#dietLabel").val();
      healthLabelSelected = $("#healthLabel").val();
      var queryURL = "https://api.edamam.com/search?q=" + ingredient + "&app_id=" + appID + "&app_key=" + apiKey + "&from=" + minResult + "&to=" + maxResult + "&calories=" + minCal + "-" + maxCal + "&diet=" + dietLabelSelected + "&health=" + healthLabelSelected;
    };
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      $("#foodData").html("<h3>Your results:</h3>");
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
        //
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
    divRecipes.append("<button class='saveRecipeBtn' data-recipe-name='" + recipe_name + "' data-recipe-url='" + recipe_URL + "'>Save this delicious recipe!</button>");
    divRecipes.append("<button class='emailRecipeBtn' data-recipe-name='" + recipe_name + "' data-recipe-url='" + recipe_URL + "'data-recipe-ingredients='" + ingredients + "'>Email me a link to this recipe!</button>");
    divRecipes.append("<p>------------------------------------------------------------------------<p>");
    $("#foodData").append(divRecipes);
  };

  $.get("/api/user_data").then(function (data) {
    user_ID = data.id;
  });

  $(document).on("click", ".saveRecipeBtn", function () {
    console.log("clicked to save recipe");
    var recipe_name = $(this).attr("data-recipe-name");
    var recipe_url = $(this).attr("data-recipe-url");
    var newSavedRecipe = {
      user_ID: user_ID,
      recipe_name: recipe_name,
      recipe_URL: recipe_url,
    };
    console.log(newSavedRecipe);
    $.post("/api/recipes", newSavedRecipe, function () {
      alert("Recipe saved!");
    });
  });

  $(document).on("click", ".emailRecipeBtn", function () {
    console.log("clicked to email recipe");
    var recipe_name = $(this).attr("data-recipe-name");
    var recipe_url = $(this).attr("data-recipe-url");
    var email = "";
    var subject = recipe_name;
    var body = recipe_name + ": " + recipe_url;
    $.get("/api/user_data").then(function (data) {
      console.log(data.email);
      email = data.email;
      window.open('mailto:' + email + '?subject=' + subject + '&body=' + body);
    });
  });


});