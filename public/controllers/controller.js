
var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http', function($scope, $http){
	console.log('Hello World form controller!');
	$http.get('/contactlist').success( function( response ){
		console.log('I got the data i requested! ');
		$scope.employeesList = response;
	});

	$scope.addEmployee = function(){
		console.log( $scope.employee );
		$http.post('/contactlist',$scope.employee).success( function(response){
			console.log('response posted data : ', response);
		});
	};

}]);