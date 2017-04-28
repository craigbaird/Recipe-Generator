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
    console.log("submit button clicked", $scope.selectedIng);

  // Sends value to API
    var input = $scope.selectedIng;
    ApiService.getSpoonacular(input);
  }; // end ingredients.submit
  ingredients.infoFromApi = ApiService.infoFromApi;


  var learnMore = function(id){
    console.log("hi", id);
    getSpoonacular2(id);
    //$location.url('/detail');
     }; // end $http.get

  ingredients.learnMore = learnMore;
  ingredients.infoFromApi2 = ApiService.infoFromApi2;


}]); // end myApp.controller

myApp.factory("ApiService", ["$http", function($http){
  var infoFromApi = {};
  var infoFromApi2 = {};
    return {
      infoFromApi : infoFromApi,
      getSpoonacular : function(ingredients){
        $http.get("/api/" + ingredients).then(function(response){
        infoFromApi.response = response.data;
        console.log("data from Api", response);
        }); //end $http.get
      },//end getSpoonacular

      infoFromApi2 : infoFromApi2,
      getSpoonacular2 : function(id){
        $http.get("/api/detail/" + id).then(function(response){
          infoFromApi2.response = response.data;
          console.log("data from Api", response);
        }); // end $http.get
      } // end getSpoonacular2

    }; //end return
}]); // end recipeApp.factory
