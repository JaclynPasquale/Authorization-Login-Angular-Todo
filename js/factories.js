;(function() {
  "use strict";

  angular.module("todoApp")

    .factory("todoFactory", function($rootScope, $http, $location, FIREBASE_URL) {

      function _todoUrl(id){
        if (id) {
          return FIREBASE_URL + '/' + $rootScope.user.uid + '/tasks/' + id + '.json';

        } else {
          return FIREBASE_URL + "/" + $rootScope.user.uid + '/tasks.json';
        }
      }


      function getTodo(id, cb) {
        $http.get(_todoUrl(id))
        .success(function(data) {
          cb(data);
        })
        .error(function(err) {
          console.log(err);
        });
      }

      function editTodo(id, todo) {
        $http.put(_todoUrl(id), todo)
        .success(function(data) {
          $location.path("/");
        })
        .error(function(err) {
          console.log(err);
        });
      }

      function getAllTodos(cb) {
        $http.get(_todoUrl())
        .success(function(data) {
          cb(data);
        })
        .error(function(err) {
          console.log(err);
        });
      }

      function createTodo(task, cb) {
        $http.post(_todoUrl(), task)
        .success(function(data) {
          cb(data);
        })
        .error(function(err) {
          console.log(err);
        });
      }

      function deleteTodo(todoId, cb) {
        $http.delete(_todoUrl(todoId))
        .success(function() {
          cb();
        })
        .error(function(err) {
          console.log(err);
        });
      }

      var priorityOptions = {
        high: "High",
        medium: "Medium",
        low: "Low",
        whocares: "Whatev"
      };

      return {
        getTodo: getTodo,
        editTodo: editTodo,
        getAllTodos: getAllTodos,
        createTodo: createTodo,
        deleteTodo: deleteTodo,
        priorityOptions: priorityOptions
      };
    })
}());
