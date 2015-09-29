var myApp = angular.module('app', ['ionic']);


myApp.service('firstService', function ($http)
{
    var baseURL = "https://api.parse.com/1/";
    var authenticationHeaders =
    {
        "x-parse-application-id": "5as9DptmDSswxIrKPUoVbOiBL731Iq2CRwa128uB",
        "x-parse-rest-api-key": "Bd8NNbrxgeLckkeJ7zdXjZOMGYr0saXNVyIVfCDF"
    };


    // CODE GOES HERE
    // these are functions exposed to public
    return{

        login: function ()
        {

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
                .then(function (response) {
                    // In the response resp.data contains the result
                    // check the console to see all of the data returned
                    console.log('login', response);
                    return response.data;
                });
        },


        /**
         * returns all of the data
         */
        getStuff: function ()
        {

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
                .then(function (response) {
                    // In the response resp.data contains the result
                    // check the console to see all of the data returned
                    console.log('getStuff', response);
                    return response.data.results;//WHY RESULTS
                });
        }
    }
});



myApp.controller ('firstController', function($scope, firstService)
{
    $scope.text = "Subhay";
    $scope.itemsList = {};

    firstService.login().then(function(_response){
            
    });


    $scope.load = function () {
       firstService.getStuff().then(function (_response)
    {
        $scope.itemsList = _response;
    });
     
    }

    

});

