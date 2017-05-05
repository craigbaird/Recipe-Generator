myApp.controller("navController", ["$location", "ApiService", function($location, ApiService) {
  var self = this;


  self.state = $location.path();
    self.go = function(path){
      // console.log(path);
      $location.path(path);
    };

    self.infoFromApi = ApiService.infoFromApi;
    self.detailsFromApi = ApiService.detailsFromApi;

}]);
