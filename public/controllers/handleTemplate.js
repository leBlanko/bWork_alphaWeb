var app = angular.module('bWork_alphaWeb');
app.run();

app.controller('HandleWeekCtrl', ['$scope', '$cookieStore', '$window', '$http', 'toastr', '$auth', '$location', 'templateData', function($scope, $cookieStore, $window, $http, toastr, $auth, $location, templateData) {


	templateData.getTemplates().then(function(res) {

		$scope.templates = res.data;
	});



}]);