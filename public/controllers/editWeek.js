var app = angular.module('bWork_alphaWeb');
app.run();

app.controller('EditWeekCtrl', [
	'$scope',
	'$cookieStore',
	'$window',
	'$http',
	'toastr',
	'$auth',
	'$location',
	'SweetAlert',
	'timeDimensionData',

	function(
		$scope,
		$cookieStore,
		$window,
		$http,
		toastr,
		$auth,
		$location,
		SweetAlert,
		timeDimensionData
	) {

		$scope.weeks = [];
		$scope.weekSelected = false;
		$scope.days = [];
		year = new Date().getFullYear();
		timeDimensionData.getTimeDimensionsByYearAndFirstAndLastDayByWeek(year).then(function(data) {
			data.data.forEach(function(d) {
				var week = {
					week: d.week,
					begin_week: moment(d.begin_week).format('YYYY/MM/DD'),
					end_week: moment(d.end_week).format('YYYY/MM/DD')
				};

				$scope.weeks.push(week);
			});
		})

		$scope.setScope = function(week) {
			$scope.weekSelected = true;
			$scope.days = [];
			timeDimensionData.getTimeDimensionsByStartAndEndDateOfWeek(week.begin_week, week.end_week).then(function(data) {
				if (data.data.length > 0) {
					data.data.forEach(function(d) {
						console.log(d);
						$scope.days.push(moment(d.db_date).format('YYYY/MM/DD'));
					})
				}
			});
		}

	}
]);