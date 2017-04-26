myApp.controller("InfoController", ["$scope", "$http", "$location", "UserService", function($scope, $http, $location, UserService) {
  var ingredients = this;
  ingredients.logout = UserService.logout;

  var ingredient = {};

  // ingredients.submit = function(){
  //   var input = ingredients.input.title;
  //   RecipeService.getSpoonacular(input);
  // }; // end ingredients.submit
  // ingredients.infoFromApi = RecipeService.infoFromApi;

  var addIngredient = function(ingredientObject) {
    // input post new ingredients when you post refresh dropdown ingredients
    $http.post('/ingredients/addIngredient', ingredientObject).then(function(response){
      getIngredients();
    });//ends post to addFavorite
  };

  var getIngredients = function() {
    $http.get('/ingredients').then(function(response){
      console.log(response);
      favorites.list = response.data;
    });// ends get to favorites
  };

  ingredients.addIngredient = addIngredient;
  getIngredients();
}]);
