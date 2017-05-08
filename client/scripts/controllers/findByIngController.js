myApp.controller("FindByIngController", ["$scope", "$http", "$location" , "ApiService", "UserService", function($scope, $http, $location, ApiService, UserService) {
  console.log('FindByIngController loaded');
  var recipe = this;
  recipe.logout = UserService.logout;
  recipe.ingredient = {};

  recipe.addIngredient = function(ingredientObject) {
    console.log('ADDING INGREDIENT', ingredientObject);
    var ingredient = ingredientObject.name;
    swal(
      ingredient + " added!",
      ingredient + " is now available to select in Ingredients List",
      "success"
    );

    // input post new ingredients when you post refresh dropdown ingredients
    $http.post('/ingredients', ingredientObject).then(function(response){
      getIngredients();
      recipe.ingredient.name = "";
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

myApp.factory("ApiService", ["$http", '$sce', "$location", function($http, $sce, $location){
  var infoFromApi = {};
  var detailsFromApi = {};
  var recipeInstructions = {};
  // var summary = {};
  return {
    infoFromApi : infoFromApi,
    getRecipes : function(ingredients){
      $http.get("/api/" + ingredients).then(function(response){
        infoFromApi.response = response.data;
        $location.path("/recipeResults");
        console.log("relevant recipes", response);
      }); //end $http.get
    },//end getSpoonacular

    detailsFromApi : detailsFromApi,
    getDetails : function(id){
      $http.get("/api/detail/" + id).then(function(response){
        detailsFromApi.response = response.data;
        detailsFromApi.response.summaryTrusted = $sce.trustAsHtml(detailsFromApi.response.summary);
        $location.path("/recipeDetails");
        console.log("recipe details", response);
      }); // end $http.get
    }, // end getDetails

    recipeInstructions : recipeInstructions,
    getInstructions : function(id){
      $http.get("/api/instructions/" + id).then(function(response){
        recipeInstructions.response = response.data;
        recipeInstructions.response.summaryTrusted = $sce.trustAsHtml(recipeInstructions.response.instructions);
        console.log("recipe instructions", response);
      }); // end $http.get
    } // end getDetails

  }; //end return

}]); // end recipeApp.factory
