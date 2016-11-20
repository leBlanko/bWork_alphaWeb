var app = angular.module('bWork_alphaWeb');

app.controller('AddSupCtrl', ['$scope', '$cookieStore', '$window', '$http', 'toastr', '$auth', '$location', 'SweetAlert', 'moment', 'dayData', function($scope, $cookieStore, $window, $http, toastr, $auth, $location, SweetAlert, moment, dayData) {
	$scope.day = moment();

	$scope.addSup = function() {
		var id = $scope.id;
		var l = Ladda.create(angular.element('.ladda-button').get()[0]);
		if ($scope.day) {
			l.start();
			var sup = parseInt($scope.day.sup.getHours()) * 60 + parseInt($scope.day.sup.getMinutes());

			var day = {
				id: id,
				minSup: sup
			}
			dayData.update(day).then(function(res) {

			}).finally(function() {

				l.stop();
				toastr.success("Le jour " + dateModal + " a été ajouté dans votre nouvelle semaine");

			});
		}
	}

}]);