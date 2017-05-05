var myApp = angular.module("myApp", ["ngRoute", "ngMaterial",]);

/// Routes ///
myApp.config(["$routeProvider", "$locationProvider",
      function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");

  $routeProvider
    .when("/home", {
      templateUrl: "/views/templates/home.html",
      controller: "LoginController",
    })
    .when("/register", {
      templateUrl: "/views/templates/register.html",
      controller: "LoginController"
    })
    .when("/user", {
      templateUrl: "/views/templates/user.html",
      controller: "UserController",
      resolve: {
        getuser : ["UserService", function(UserService){
          return UserService.getuser();
        }]
      }
    })
    .when("/findByIngredients", {
      templateUrl: "/views/templates/findByIngredients.html",
      controller: "FindByIngController",
      controllerAs: "recipe",
      resolve: {
        getuser : ["UserService", function(UserService){
          return UserService.getuser();
        }]
      }
    })
    .when("/recipeResults", {
      templateUrl: "/views/templates/recipeResults.html",
      controller: "FindByIngController",
      controllerAs: "recipe",
      resolve: {
        getuser: ["UserService", function(UserService){
          return UserService.getuser();
        }]
      }
    })
    .when("/recipeDetails", {
      templateUrl: "/views/templates/recipeDetails.html",
      controller: "FindByIngController",
      controllerAs: "recipe",
      resolve: {
        getuser: ["UserService", function(UserService){
          return UserService.getuser();
        }]
      }
    })
    .otherwise({
      redirectTo: "home"
    });
}]);
