var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var IngredientsSchema = mongoose.Schema({
  "Ingredient": String,
  "User_id": String
}); // end IngredientsSchema

var Ingredients = mongoose.model("Ingredients", IngredientsSchema);

// GET Route to return all ingredients for the authenticated user
router.get("/", function(req, res) {
  console.log("get /user route");
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log("logged in with user", req.user._id);
    // Query for ingredients



    res.send();
  } else {
    // failure best handled on the server. do redirect here.
    console.log("not logged in");
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// POST Route to add ingredient for the authenticated user


module.exports = router;
