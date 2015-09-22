var myApp = angular.module('app', ['ionic']);

myApp.controller ('firstController', function($scope, ParseHttpService ){
    $scope.text = "Subhay";
    $scope.items = ParseHttpService.apiResponseData;

    $scope.currentUser = null;
    $scope.apiResponseData = {};
    $scope.uiData = {};

    function _alertHandler(_error) {
        alert("ERROR " + JSON.stringify(_error, null, 2));
    }
    /**
     * logs the user into the application
     */
    $scope.doLogin = function () {
        return ParseHttpService.login().then(function (_response) {
            $scope.currentUser = _response;
            $scope.apiResponseData = _response;
        }, _alertHandler);
    }

    $scope.getStuffList = function () {
            return ParseHttpService.getStuff("").then(function (_response) {
                var apiResponseData = _response;
                console.log(apiResponseData);
                $scope.apiResponseData = _response;
            }, _alertHandler);
        }
        



});

myApp.service('ParseHttpService', function ($http) 
{
        var baseURL = "https://api.parse.com/1/";
        var authenticationHeaders = {
        "x-parse-application-id": "5as9DptmDSswxIrKPUoVbOiBL731Iq2CRwa128uB",
        "x-parse-rest-api-key": "Bd8NNbrxgeLckkeJ7zdXjZOMGYr0saXNVyIVfCDF"
    };

        return
         {
            /**
             * [[Description]]
             * @returns {Promise} [[Description]]
             */
            login: function()
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
             * gets a specific stuff item based on the id provided, if no id then 
             * return all stuff items
             * 
             * @param   {String}   _id object id in parse
             * @returns {Promise} [[Description]]
             */
            getStuff: function (_id) 
            {
                // if an id is passed in then use it when querying
                // stuff data
                var settings = {
                    method: 'GET',
                    url: baseURL + 'classes/stuff/' + _id,
                    headers: authenticationHeaders,
                };

                // $http returns a promise, which has a then function,
                // which also returns a promise
                return $http(settings)
                    .then(function (response) 
                    {
                        // In the response resp.data contains the result
                        // check the console to see all of the data returned
                        console.log('getStuff', response);
                        console.log(response);
                        return response.data;
                    });
            },
        }
    });
