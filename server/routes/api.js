var express = require("express");
var router = express.Router();
var path = require("path");
var unirest = require("unirest");

// API call to get images and id for recipes
router.get("/:ingredients", function(req, res){
  var ingredients = req.params.ingredients;
  unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients"+
            "?fillIngredients=false&ingredients=" + ingredients + "&limitLicense=true&number=8&ranking=1")
  .header("X-Mashape-Key", "5odaehKxNbmshul9AvfFy6EBdgBXp1Dcw1rjsnR8zfBgCuY9mH")
  .header("Accept", "application/json")
  .end(function (result) {
  res.send(result.body);
  }); // end unirest.get
});

// API call to get summary from id of item clicked
router.get("/detail/:id", function(req,res){
  var id = req.params.id;
  unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + id + "/summary")
  .header("X-Mashape-Key", "5odaehKxNbmshul9AvfFy6EBdgBXp1Dcw1rjsnR8zfBgCuY9mH")
  .header("Accept", "application/json")
  .end(function (result) {
    // console.log(result.status, result.headers, result.body);
    res.send(result.body);
  }); // end unirest.get
});

// API call to get instructions for recipe from id of item clicked
router.get("/instructions/:id", function(req, res){
  var id = req.params.id;
  unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + id + "/information?includeNutrition=false")
  .header("X-Mashape-Key", "5odaehKxNbmshul9AvfFy6EBdgBXp1Dcw1rjsnR8zfBgCuY9mH")
  .header("Accept", "application/json")
  .end(function (result) {
    // console.log(result.status, result.headers, result.body);
    res.send(result.body);
  }); // end unirest.get
}); // end router.get

module.exports = router;
