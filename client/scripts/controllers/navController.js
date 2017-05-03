myApp.controller("navController", ["$location", function($location) {
  var self = this;

  self.state =$location.path();
    self.go=function(path){
      console.log(path);
      $location.path(path);
    };

}]);
