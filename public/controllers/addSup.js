var app = angular.module('bWork_alphaWeb');

app.controller('AddSupCtrl', ['$scope', '$cookieStore', '$window', '$http', 'toastr', '$auth', '$location', 'SweetAlert', 'moment', function($scope, $cookieStore, $window, $http, toastr, $auth, $location, SweetAlert, moment) {
	$scope.day = moment();

}]);