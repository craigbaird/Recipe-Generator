myApp.controller("FindByIngController", ["$scope", "$http", "$location", "ApiService", "UserService", function($scope, $http, $location, ApiService, UserService) {
  console.log('FindByIngController loaded');
  var recipe = this;
  recipe.logout = UserService.logout;
  recipe.ingredient = {};

  recipe.addIngredient = function(ingredientObject) {
    console.log('ADDING INGREDIENT', ingredientObject);
    // input post new ingredients when you post refresh dropdown ingredients
    $http.post('/ingredients', ingredientObject).then(function(response){
      getIngredients();
    });//ends post to addFavorite
  };

  var getIngredients = function() {
    $http.get('/ingredients').then(function(response){
      // console.log("All Current Ingredients: ", response);
      recipe.list = response.data;
      //  console.log(response.data);
    });// end $http get
  }; // end get ingredients
  getIngredients();

  // Button functionality for dropdown list
  $scope.findRecipes = function(){
    // console.log("Find Recipes button clicked", $scope.selectedIng);
    // Sends value to API
    var input = $scope.selectedIng;
    ApiService.getRecipes(input);
  }; // end ingredients.submit

  // When "learn more" button is clicked sends ID to api for description
  recipe.learnMore = function(id){
    ApiService.getDetails(id);
    ApiService.getInstructions(id);
    //$location.url('/detail');
  }; // end $http.get

  // connect controller data to factory data
  recipe.infoFromApi = ApiService.infoFromApi;
  recipe.detailsFromApi = ApiService.detailsFromApi;
  recipe.recipeInstructions = ApiService.recipeInstructions;

}]); // end myApp.controller


// everythingArray = []
//
//  function GET (array) {
//  for (item of Array)
//   var obj = {
//     id : item.id
//     name : item.name
//     summary :
//     recipe :
//   }
//    get {(return summary)
//      obj.summary = summary
//    } get {(return recipe)
//      obj.recipe = recipe
//    }
//    everythingArray.push(obj)


myApp.factory("ApiService", ["$http", function($http){
  var infoFromApi = {};
  var detailsFromApi = {};
  var recipeInstructions = {};

  return {
    infoFromApi : infoFromApi,
    getRecipes : function(ingredients){
      $http.get("/api/" + ingredients).then(function(response){
        infoFromApi.response = response.data;
        console.log("relevant recipes", response);
      }); //end $http.get
    },//end getSpoonacular

    detailsFromApi : detailsFromApi,
    getDetails : function(id){
      $http.get("/api/detail/" + id).then(function(response){
        detailsFromApi.response = response.data;
        console.log("recipe summary", response);
        // for(var i = 0; i < infoFromApi.response.length; i++) {
        //   if(infoFromApi.response[i].id) {
        //   response[i].summary = summary;
        //   }
        //   console.log(summary);
        // }
      }); // end $http.get
    }, // end getDetails

    recipeInstructions : recipeInstructions,
    getInstructions : function(id){
      console.log("id", id);
      $http.get("/api/instructions/" + id).then(function(response){
        recipeInstructions.response = response.data;
        console.log("recipe instructions", response);
      }); // end $http.get
    } // end getDetails

  }; //end return
}]); // end recipeApp.factory
