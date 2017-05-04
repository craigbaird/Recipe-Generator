var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var IngredientsSchema = mongoose.Schema({
  "ingredient": String,
  "user_id": String
}); // end IngredientsSchema

var Ingredients = mongoose.model("Ingredients", IngredientsSchema);

// GET Route to return all ingredients for the authenticated user

router.get("/", function(req, res) {

  // console.log("get /user route");
  // check if logged in
  if(req.isAuthenticated()) {
    var user = req.user._id;
    // send back user object from database
    // console.log("logged in with user", req.user._id);
    // Query for ingredients
    Ingredients.find({user_id : user}, function(err, allIngredients){
      if (err){
        console.log(err);
        res.sendStatus(500);
      }
      res.send(allIngredients);
      // console.log("response from allIngredients", allIngredients);
    });
    // res.send();
  } else {
    // failure best handled on the server. do redirect here.
    console.log("not logged in");
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  } // end else
}); // end router.get

// POST Route to add ingredient for the authenticated user
router.post("/", function(req, res, next) {
    // console.log('POST',req.body);
    var ingredientToSave = {
      ingredient : req.body.name,
      user_id : req.user._id
    };

    Ingredients.create(ingredientToSave, function(err, post) {
         if(err) {
           res.sendStatus(500);
         } else {
          res.sendStatus(200);
         }
    });
});

module.exports = router;
