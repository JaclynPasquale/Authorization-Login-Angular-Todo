;(function() {
  "use strict";

  angular.module("todoApp")
  .config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl: "views/landing.html"
    })
    .when("/login", {
      templateUrl: "views/login.html",
      controller: "LoginController",
      controllerAs: "login",
      resolve: {
        data: function(authFactory){
          // if logged in then redirect
          authFactory.disallowLogin();
        }
      }
    })
    .when("/logout", {
      template: "",
      controller: "LogoutController"
    })
    .when("/changepassword", {
      templateUrl: "views/changepassword.html",
      controller: "ChangePasswordController",
      controllerAs: "changepw",
      private: true
    })

    .when("/todos", {
      templateUrl: "views/table.html",
      controller: "TodoController",
      controllerAs: "todo",
      private: true
    })
    .when("/todos/new", {
      templateUrl: "views/form.html",
      controller: "TodoController",
      controllerAs: "todo",
      private: true
    })
    .when("/todos/:id", {
      templateUrl: "views/show.html",
      controller: "ShowController",
      controllerAs: "show",
      private: true
    })
    .when("/todos/:id/edit", {
      templateUrl: "views/form.html",
      controller: "EditController",
      controllerAs: "todo",
      private: true
    })
    .otherwise({ redirectTo: "/" });
  })
  .run(function($rootScope, authFactory){
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, priorRoute){
      if (nextRoute.$$route && nextRoute.$$route.private) {
          authFactory.requireLogin();
      }
    })
  })
}());
