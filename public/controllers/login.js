var app = angular.module('bWork_alphaWeb');
app.run();

app.controller('LoginCtrl', ['$scope', '$cookieStore', '$window', '$http', 'toastr', '$auth', '$location', function($scope, $cookieStore, $window, $http, toastr, $auth, $location) {

	$(document).ready(function() {

		$("body").addClass("error-body");
	});

	$scope.login = function() {
		$auth.login($scope.user)
			.then(function(data) {
				$cookieStore.put('user', data.data);
				$scope.user = $cookieStore.get('user');
				toastr.success('You have successfully signed in!');
				$location.path('/');
			})
			.catch(function(error) {
				toastr.error(error.data.message, error.status);
			});
	};
}]);