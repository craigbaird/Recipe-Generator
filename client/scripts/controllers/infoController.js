myApp.controller("InfoController", ["$scope", "$http", "$location", "ApiService", "UserService", function($scope, $http, $location, ApiService, UserService) {
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
  $scope.submit = function(){
    console.log("submit button clicked", $scope.myModel);

  // Sends value to API
    var input = $scope.myModel;
    ApiService.getSpoonacular(input);
  }; // end ingredients.submit
  ingredients.infoFromApi = ApiService.infoFromApi;


}]); // end myApp.controller

myApp.factory("ApiService", ["$http", function($http){
  var infoFromApi = {};
    return {
      infoFromApi : infoFromApi,
      getSpoonacular : function(ingredients){
        $http.get("/api/" + ingredients).then(function(response){
        infoFromApi.response = response;
        console.log("data from Api", response);
        }); //end $http.get
      } //end getSpoonacular
    }; //end return
}]); // end recipeApp.factory
