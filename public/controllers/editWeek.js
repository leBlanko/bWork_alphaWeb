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
	'dayData',

	function(
		$scope,
		$cookieStore,
		$window,
		$http,
		toastr,
		$auth,
		$location,
		SweetAlert,
		timeDimensionData,
		dayData
	) {

		$scope.weeks = [];
		$scope.weekSelected = false;
		$scope.days = [];
		var year = new Date().getFullYear();
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
						dayData.getDayByDayAndMonthAndYear(moment(d.db_date).format('D'), moment(d.db_date).format('MM'), moment(d.db_date).format('YYYY')).then(function(day) {
							if (day.data.length > 0) {
								var d = {
									beginAfternoon: day.data[0].beginAfternoon,
									beginMorning: day.data[0].beginMorning,
									day: day.data[0].day,
									endAfternoon: day.data[0].endAfternoon,
									endMorning: day.data[0].endMorning,
									id: day.data[0].id,
									minNormal: day.data[0].minNormal,
									minRecup: day.data[0].minRecup,
									minSup: day.data[0].minSup,
									month: day.data[0].month,
									year: day.data[0].year,
									dayComplete: moment(d.db_date).format('YYYY/MM/DD')
								}
							} else {
								var d = {
									dayComplete: moment(d.db_date).format('YYYY/MM/DD')
								}
								$scope.days.push(d);
							}
						})
					})
				}
			});
		}

	}
]);