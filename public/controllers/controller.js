
var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http', function($scope, $http){
	//console.log('Hello World form controller!');
	
	fetchContactList();
	function fetchContactList(){
		$http.get('/contactlist').success( function( response ){
			//console.log('I got the data i requested! ');
			$scope.contactList = response;
		});
	}
	function clear(){
		$scope.contact = {};
	}

	$scope.addContact = function(){
		//console.log( $scope.contact );
		$http.post('/contactlist',$scope.contact).success( function(response){
			//console.log('response posted data : ', response);
			fetchContactList();
			clear();
		});

	};

}]);