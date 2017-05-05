myApp.controller("navController", ["$location", "ApiService", function($location, ApiService) {
  var self = this;

  //ApiService.recipeInstructions

  self.recipeInstructions = ApiService.recipeInstructions;

  self.state =$location.path();
    self.go=function(path){
      // console.log(path);
      $location.path(path);
    };

}]);
