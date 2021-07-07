$(document).ready(function () {
  var user_recipes;
  // var userString;

  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    console.log(data.email);
    console.log(data.id);
    user_ID = data.id;
  });
  
  $.get("/api/recipes").then(function (data) {
    console.log(data);
    // var postsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      // postsToAdd.push(data[i]);
      // var newRecipeURL = recipe.recipe_URL.replace(/\/$/, "");
      console.log(data[i]);
      var newRecipeURL = data[i].recipe_URL.replace(/\/$/, "");
      var divRecipes = $("<div>");
      divRecipes.attr("class", "recipe");
      divRecipes.append("<p><a href=" + newRecipeURL + '>' + data[i].recipe_name + "</a></p>");
      $("#savedRecipes").append(divRecipes);
    };
    // var newRecipeURL = recipe.recipe_URL.replace(/\/$/, "");
    // var divRecipes = $("<div>");
    // divRecipes.attr("class", "recipe");
    // divRecipes.append("<p><a href=" + newRecipeURL + '>' + recipe.recipe_name + "</a></p>");
    // $("#savedRecipes").append(divRecipes);
  });

  // showFavorites();

  // function showFavorites(recipename) {
  //   userString = recipename || "";
  //   $.get("/api/recipes", function (data) {
  //     user_recipes = data;
  //     initializeRows()
  //   });
  // };

  // function initializeRows() {
  //   var postsToAdd = [];
  //   for (var i = 0; i < user_recipes.length; i++) {
  //     postsToAdd.push(createNewRow(user_recipes[i]));
  //   }
  // };

  // function createNewRow(recipe) {
  //   var newRecipeURL = recipe.recipe_URL.replace(/\/$/, "");
  //   var divRecipes = $("<div>");
  //   divRecipes.attr("class", "recipe");
  //   divRecipes.append("<p><a href=" + newRecipeURL + '>' + recipe.recipe_name + "</a></p>");
  //   $("#recipe_name").append(divRecipes);
  //   // return divRecipes;
  // }

  // function noRecipes() {
  //   console.log("Somethings forked up. Please try again")
  //   blogContainer.append("<p>You Forked Up Again</p>");
  // }




});