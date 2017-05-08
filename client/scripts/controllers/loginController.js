myApp.controller("LoginController", ["$scope", "$http", "$location", "UserService", function($scope, $http, $location, UserService) {

    $scope.user = {
      username: "",
      password: ""
    };
    $scope.message = "";

    $scope.login = function() {
      if($scope.user.username === "" || $scope.user.password === "") {
        // $scope.message = "Please enter your username and password";
        swal(
          "You forgot to enter something in.",
          "Please enter your username and password.",
          "warning"
        );
      } else {
        $http.post("/", $scope.user).then(function(response) {
          if(response.data.username) {
            // console.log("success: ", response.data);
            // location works with SPA (ng-route)
            $location.path("/user");
          } else {
            console.log("failure: ", response);
            // $scope.message = "Your username/password was incorrect. Please try again.";
            swal(
              "Your username or password was incorrect.",
              "Please try again.",
              "warning"
            );
          }
        });
      }
    };

    $scope.registerUser = function() {
      if($scope.user.username === "" || $scope.user.password === "") {
        // $scope.message = "Please choose a username and password";
        swal(
          "You forgot to enter something in.",
          "Please choose a username and password.",
          "warning"
        );
      } else {
        // console.log("sending to server...", $scope.user);
        $http.post("/register", $scope.user).then(function(response) {
          // console.log("success");
          $location.path("/home");
        },
        function(response) {
          console.log("error");
          // $scope.message = "Please try again";
          swal(
            "Please try again.",
            "warning"
          );
        });
      }
    };
}]);
