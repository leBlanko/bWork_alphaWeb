var app = angular.module('bWork_alphaWeb');
app.run();

app.controller('HandleWeekCtrl', ['$scope', '$cookieStore', '$window', '$http', 'toastr', '$auth', '$location', 'templateData', 'SweetAlert', function($scope, $cookieStore, $window, $http, toastr, $auth, $location, templateData, SweetAlert) {


	templateData.getTemplates().then(function(res) {

		$scope.templates = res.data;
	});

	$scope.verif_delete = function(id) {
		SweetAlert.swal({
				title: "Est tu sur?",
				text: "Tu vas supprimer definitivement cette template",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Oui, supprimer!",
				cancelButtonText: "Oups, non!",
				closeOnConfirm: false,
				closeOnCancel: false
			},
			function(isConfirm) {
				if (isConfirm) {
					templateData.delete(id).then(function() {
							var found = false;
							var index = 0;
							while (!found && index < $scope.templates.length) {
								if ($scope.templates[index].id == id) {
									$scope.templates.splice(index, 1);
									found = true;
								}
							}

						})
						.finally(function() {
							SweetAlert.swal("Supprimé!", "La template a été supprimée.", "success");
						});

				} else {
					SweetAlert.swal("Annulé", "Ouf :)", "error");
				}
			});
	}

}]);