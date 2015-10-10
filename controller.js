
myApp.controller('homeCtrl', function($scope, $state, firstService) {
  $scope.text = '';
  $scope.itemsList = {};
  $scope.loginDetail = {};
  $scope.stateInfo = $state.current;
  $scope.stuffFromParse = '';

  $scope.inputItem = 
  {
    value: "",
    name: "",
    room: ""
  };

  $scope.loginButton = function() {
    firstService.login().then(function(_response) {
      $scope.loginDetail = _response;
    });
  };


  $scope.load = function(){
    $scope.text = "This is after the click of the button";

    firstService.getStuff().then(function(_response) {
      $scope.itemsList = _response;
    });
  }

    $scope.stuffFromParse = "Stuff from parse";

  $scope.goToDetailState = function(_id) {
    $state.go("detail", {
      objectId: _id
    });
  };

  function populateList() {
    return firstService.getStuff().then(function(_listData) {
      // successful response from server with data, lets
      // assign to scope variable to display in index.html
      $scope.itemsList = _listData.results.data;
    });
  }

  $scope.editObject = function editObject(_object) {

    var data = null;
    var editedObject = {};
    var objectData = prompt("Enter the Edited Information", _object.name + ", " + _object.room);

    // check if the user entered some data
    if (objectData !== null) {
      // separate the values
      data = objectData.split(",");
    }

    // check if the user entered some data and if i got two items
    // back when I split the data for name and room value
    if (objectData && (data.length === 2)) {

      // create object parameters to save
      editedObject.name = data[0].trim();
      editedObject.room = data[1].trim();
      editedObject.objectId = _object.objectId;

      console.log(JSON.stringify(editedObject));

      firstService.updateObject(editedObject)
        .then(function itemUpdated(_updatedItem) {
          //  alert("Item Updated " + _updatedItem.objectId);

      populateList();
              firstService.getStuff().then(function(_response) {
      $scope.itemsList = _response;
    });

        }, function errorSaving(_error) {
          // alert("Error Editing Object " + _error)
        });
    } else {
      if (objectData !== null) {
        // alert("Invalid Input: " + objectData);
      }
    }
  };

  $scope.deleteObject = function editObject(_objectId) {
    firstService.deleteObjectById(_objectId)
      .then(function itemSaved(_deletedObject) {
        //  alert("Item Deleted " + _deletedObject.objectId);

      populateList();

    firstService.getStuff().then(function(_response) {
      $scope.itemsList = _response;
    });

      }, function errorDeleting(_error) {
        // alert("Error Deleting Object " + _objectId)
      });
  };

  $scope.addItem = function addItem() {

    // separate the values you get from the ng-model
    // on the input field
    var data = $scope.inputItem.value.split(",");

    if (data.length === 2) {
      $scope.inputItem.name = data[0].trim();
      $scope.inputItem.room = data[1].trim();

      firstService.addObject($scope.inputItem)
        .then(function itemSaved(_newItem) {
          //alert("Item Saved", _newItem.objectId);
          $scope.inputItem = {};

          populateList();
              firstService.getStuff().then(function(_response) {
      $scope.itemsList = _response;
    });

        }, function errorSaving(_error) {
          $scope.inputItem = {};
        });
    } else {
      //  alert("Invalid Input: " + $scope.inputItem.value);
      $scope.inputItem = {};
    }
  };

});





  
myApp.controller('detailCtrl', function($scope, $state, firstService) {
  $scope.itemDetail = '';
  $scope.stateInfo = $state.current;
  $scope.detailParams = $state.params;
    //$scope.detailStuff = firstService.itemByIndex($state.params.obhectid)
  firstService.getStuffById($state.params.objectId).then(function(_data) {
    console.log(_data);
    $scope.itemDetail = _data;
  });
});
