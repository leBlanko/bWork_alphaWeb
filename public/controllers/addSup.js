var app = angular.module('bWork_alphaWeb');

app.controller('AddSupCtrl', ['$scope', '$cookieStore', '$window', '$http', 'toastr', '$auth', '$location', 'SweetAlert', 'moment', 'dayData', function($scope, $cookieStore, $window, $http, toastr, $auth, $location, SweetAlert, moment, dayData) {
	$scope.day = moment();
	$scope.schedule = {};
	$scope.showModalDay = false;

	var convertMinsToHrsMins = function(minutes) {
		var h = Math.floor(minutes / 60);
		var m = minutes % 60;
		h = h < 10 ? '0' + h : h;
		m = m < 10 ? '0' + m : m;
		return h + ':' + m;
	}

	$scope.showModal = function() {
		if ($scope.id)
			$scope.showModalDay = true;
	}

	$scope.addSup = function() {
		var id = $scope.id;
		console.log(id);
		var l = Ladda.create(angular.element('.ladda-button').get()[0]);
		if ($scope.day) {

			l.start();
			var sup = parseInt($scope.day.sup.getHours()) * 60 + parseInt($scope.day.sup.getMinutes());
			console.log(sup);
			var day = {
				id: id,
				minSup: sup
			}

			dayData.update(day).then(function(res) {

				if (res.data.status == 0) {
					$scope.schedule.minSup = convertMinsToHrsMins(day.minSup);
					toastr.success("L'heure sup a bien été ajoutée");
				} else {
					toastr.error("Le jour " + dateModal + " a été ajouté dans votre nouvelle semaine");
				}
				l.stop();
				$scope.showModalDay = false;

			});
		}
	}

}]);