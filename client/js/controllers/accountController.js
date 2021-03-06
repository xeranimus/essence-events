var lastError = undefined;
angular.module('accounts').controller('AccountsController', ['$scope', 'Accounts', 
  function($scope, Accounts) {

    $scope.logout = function() {
      console.log("Attempting to Log out");
      Accounts.logOut().then( function(result) {
        window.location.replace("/index.html");
      },
      function (error) {
        window.location.replace("/index.html");
      });
    };

    $scope.createAccount = function() {
      console.log($scope.newAccount);
      Accounts.createAccount($scope.newAccount).then(
        function(result){
          console.log(result);
          alert("Account creation successful.");
          window.location.replace("/AccountManagement.html");
          return result;
        },
        function(error){
          console.log("error callback");
          lastError = error;
          console.log(error.data.error);
          alert(error.data.error);
          return error;
        }
      );

    };

    $scope.logIn = function() {

      //var answer = Accounts.logIn($scope.Account);
      //console.log(answer);

       Accounts.logIn($scope.Account).then(
         function(result2){
           console.log("callback");
           //console.log(result2);
           alert("Logged In");
           window.location.replace("/AccountManagement.html");
           return result2;
         },
         function(error2){
           console.log("error callback");
           console.log(error2.statusText);
           alert("Log In Failed");
           return error2;
         }
       );
    };

    $scope.checkLogIn = function() {
      console.log("Checking Log in Status");

      //var answer = Accounts.logIn($scope.Account);
      //console.log(answer);
      Accounts.checkLogIn().then(
        function(result){
          console.log("true");
          $scope.loggedIn = true;
        },
        function(error){
         console.log("false");
         $scope.loggedIn = false;
        }
      );
    }();

    $scope.changeName = function() {
      console.log("Attempting to change name (Account Controller)");

      //var answer = Accounts.logIn($scope.Account);
      //console.log(answer);

       Accounts.changeName($scope.Account);
    };

  }
]);