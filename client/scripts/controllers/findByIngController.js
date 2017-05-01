myApp.controller("FindByIngController", ["$scope", "$http", "$location", "ApiService", "UserService", function($scope, $http, $location, ApiService, UserService) {
  var ingredients = this;
  ingredients.logout = UserService.logout;

  ingredients.ingredient = {};

  var addIngredient = function(ingredientObject) {
    console.log('ADDING INGREDIENT', ingredientObject);
    // input post new ingredients when you post refresh dropdown ingredients
    $http.post('/ingredients', ingredientObject).then(function(response){
      getIngredients();
    });//ends post to addFavorite
  };

  var getIngredients = function() {
    $http.get('/ingredients').then(function(response){
      console.log("All Current Ingredients: ", response);
       ingredients.list = response.data;
      //  console.log(response.data);

    });// ends get to favorites
  };
  ingredients.addIngredient = addIngredient;
  getIngredients();

  // Button functionality for dropdown list
  $scope.findRecipes = function(){
    console.log("Find Recipes button clicked", $scope.selectedIng);

  // Sends value to API
    var input = $scope.selectedIng;
    ApiService.getSpoonacular(input);
  }; // end ingredients.submit
  ingredients.infoFromApi = ApiService.infoFromApi;

  // When "learn more" button is clicked sends ID to api for description
  ingredients.learnMore = function(id){
    ApiService.getDetails(id);
    ApiService.getInstructions(id);
    //$location.url('/detail');
     }; // end $http.get

  // ingredients.detailsFromApi = ApiService.detailsFromApi;
  ingredients.recipeInstructions = ApiService.recipeInstructions;


}]); // end myApp.controller

myApp.factory("ApiService", ["$http", function($http){
  var infoFromApi = {};
  var detailsFromApi = {};
  var recipeInstructions = {};
    return {
      infoFromApi : infoFromApi,
      getSpoonacular : function(ingredients){
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
        }); // end $http.get
      }, // end getDetails

      recipeInstructions : recipeInstructions,
      getInstructions : function(id){
        $http.get("/api/instructions/" + id).then(function(response){
          recipeInstructions.response = response.data;
          console.log("recipe instructions", response);
        }); // end $http.get
      } // end getDetails

    }; //end return
}]); // end recipeApp.factory
