myApp = angular.module('app', ['ionic']);

myApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/home");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "home.html",
      controller: "homeCtrl"
    })
    .state('detail', {
      url: "/detail/:objectId",
      templateUrl: "detail.html",
      controller: "detailCtrl"
    });
})

myApp.service('firstService', function($http) {
  var baseURL = "https://api.parse.com/1/";
  var authenticationHeaders = {
    "x-parse-application-id": "5as9DptmDSswxIrKPUoVbOiBL731Iq2CRwa128uB",
    "x-parse-rest-api-key": "Bd8NNbrxgeLckkeJ7zdXjZOMGYr0saXNVyIVfCDF"
  };

  // CODE GOES HERE
  // these are functions exposed to public
  return {

    login: function() {

      var credentials = {
        "username": "admin",
        "password": "test"
      };

      var settings = {
        method: 'GET',
        url: baseURL + 'login',
        headers: authenticationHeaders,
        // params are for query string parameters
        params: credentials
      };
      // $http returns a promise, which has a then function,
      // which also returns a promise
      return $http(settings)
        .then(function(response) {
          // In the response resp.data contains the result
          // check the console to see all of the data returned
          console.log('login', response);
          return response.data;
        });
    },

    /**
     * returns all of the data
     */
    getStuff: function(_id) {

      // if an id is passed in then use it when querying
      // stuff data
      var settings = {
        method: 'GET',
        url: baseURL + 'classes/stuff/',
        headers: authenticationHeaders
      };

      // $http returns a promise, which has a then function,
      // which also returns a promise
      return $http(settings)
        .then(function(response) {
          // In the response resp.data contains the result
          // check the console to see all of the data returned
          console.log('getStuff', response);
          return response.data.results; //WHY RESULTS
        });
    }

    /*    getStuffById : function(_id) 
      {

      var settings = {
        headers: authenticationHeaders
      };

      // $http returns a promise, which has a then function,
      // which also returns a promise
      return $http.get(baseURL + 'classes/stuff/' + _id, settings)
        .then(function(response) {
          // In the response resp.data contains the result
          // check the console to see all of the data returned
          console.log('getObjectById', response);
          return response.data;
        });
    }
*/
    //       itemByIndex: function (_index)
    //     {
    //     return itemsList[_index];
    //   }
  }
});

myApp.controller('homeCtrl', function($scope, $state, firstService) {
  $scope.text = '';
  $scope.itemsList = {};
  $scope.loginDetail = {};
  $scope.stateInfo = $state.current;
  $scope.stuffFromParse = '';

  $scope.loginButton = function() {
    firstService.login().then(function(_response) {
      $scope.loginDetail = _response;
    });
  }

  $scope.load = function() {

    $scope.text = "This is after the click of the button";

    firstService.getStuff().then(function(_response) {
      $scope.itemsList = _response;
    });

    $scope.stuffFromParse = "Stuff from parse";
  }

  $scope.goToDetailState = function(_id) {
    $state.go("detail", {
      objectId: _id
    })
  }

});

myApp.controller('detailCtrl', function($scope, $state, firstService) {
  $scope.stateInfo = $state.current;
  $scope.detailParams = $state.params
    //$scope.detailStuff = firstService.itemByIndex($state.params.obhectid)
  firstService.getStuff($state.params.objectId).then(function(_data) {
    console.log(_data);
    $scope.item = _data;
  })
});
