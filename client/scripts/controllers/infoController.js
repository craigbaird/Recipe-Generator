myApp.controller("InfoController", ["$scope", "$http", "$location", "UserService", function($scope, $http, $location, UserService) {
  var ingredients = this;
  ingredients.logout = UserService.logout;

  ingredients.ingredient = {};




  // ingredients.submit = function(){
  //   var input = ingredients.input.title;
  //   RecipeService.getSpoonacular(input);
  // }; // end ingredients.submit
  // ingredients.infoFromApi = RecipeService.infoFromApi;




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
       console.log(response.data);

    });// ends get to favorites
  };

  $scope.clear = function(){
      $scope.myModel = undefined;



  ingredients.addIngredient = addIngredient;
  // getIngredients();
}]);
