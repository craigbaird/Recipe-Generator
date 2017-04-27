var express = require("express");
var router = express.Router();
var path = require("path");
var unirest = require("unirest");

// Base router
router.get("/:ingredients", function(req, res){
  var ingredients = req.params.ingredients;

  unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients"+
            "?fillIngredients=false&ingredients=" + ingredients + "&limitLicense=false&number=5&ranking=1")
  .header("X-Mashape-Key", "5odaehKxNbmshul9AvfFy6EBdgBXp1Dcw1rjsnR8zfBgCuY9mH")
  .header("Accept", "application/json")
  .end(function (result) {
  // console.log(result.status, result.headers, result.body);
  res.send(result.body);
  }); // end unirest.get
});

module.exports = router;
