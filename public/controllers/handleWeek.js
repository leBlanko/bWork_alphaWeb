var app = angular.module('bWork_alphaWeb');

app.controller('HandleWeekCtrl', [
	'$scope',
	'$cookieStore',
	'$window',
	'$http',
	'toastr',
	'$auth',
	'$location',
	'templateData',
	'dayData',
	'timeDimensionData',
	'SweetAlert',

	function(
		$scope,
		$cookieStore,
		$window,
		$http,
		toastr,
		$auth,
		$location,
		templateData,
		dayData,
		timeDimensionData,
		SweetAlert
	) {

		$scope.templates = [];
		$scope.weeks = [];
		$scope.currentWeekPlusOne = 0;
		$scope.showModalWeek = false;
		$scope.showModalTemplate = false;
		$scope.day = {
			monday: {}
		};
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

		$scope.hide = function(m) {
			if (m === 1) {
				$scope.showModalWeek = false;
			} else {
				$scope.showModalTemplate = false;
			}
		}

		templateData.getTemplates().then(function(res) {

			$scope.templates = res.data;
		});

		$scope.setScope = function(week) {
			$scope.weekSelected = true;
			$scope.days = [];
			timeDimensionData.getTimeDimensionsByStartAndEndDateOfWeek(week.begin_week, week.end_week).then(function(data) {
				if (data.data.length > 0) {
					data.data.forEach(function(d) {
						$scope.days.push(moment(d.db_date).format('YYYY/MM/DD'));
					})
				}
			});
		}

		var add = function(l, dateModal, begin_time_morning, end_time_morning, begin_time_afternoon, end_time_afternoon) {
			l.start();

			var date = new Date(dateModal);
			var beginMor = new Date(begin_time_morning).getHours() * 60 + new Date(begin_time_morning).getMinutes();
			var endMor = new Date(end_time_morning).getHours() * 60 + new Date(end_time_morning).getMinutes()
			var beginAft = new Date(begin_time_afternoon).getHours() * 60 + new Date(begin_time_afternoon).getMinutes();
			var endAft = new Date(end_time_afternoon).getHours() * 60 + new Date(end_time_afternoon).getMinutes();
			var day = {
				minNormal: (endMor - beginMor) + (endAft - beginAft),
				day: date.getDate(),
				month: date.getMonth() + 1,
				year: date.getFullYear(),
				beginMorning: beginMor,
				endMorning: endMor,
				beginAfternoon: beginAft,
				endAfternoon: endAft,
			}

			console.log(day);

			dayData.create(day).then(function(res) {

			}).finally(function() {
				l.stop();
				toastr.success("Le jour " + dateModal + " a été ajouté dans votre nouvelle semaine");
			});
		}
		$scope.addWeek = function() {
			if ($scope.day) {
				var l = Ladda.create(angular.element('.ladda-button').get()[0]);
				if ($scope.day.monday != undefined) {
					var beginMorning = ($scope.day.monday.begin_time_morning != undefined) ? $scope.day.monday.begin_time_morning : 0;
					var endMorning = ($scope.day.monday.end_time_morning != undefined) ? $scope.day.monday.end_time_morning : 0;
					var beginAfternoon = ($scope.day.monday.begin_time_afternoon != undefined) ? $scope.day.monday.begin_time_afternoon : 0;
					var endAfternoon = ($scope.day.monday.end_time_afternoon != undefined) ? $scope.day.monday.end_time_afternoon : 0;

					add(l, $scope.days[0], beginMorning, endMorning, beginAfternoon, endAfternoon);
				} else {
					add(l, $scope.days[0], 0, 0, 0, 0);
				}

				if ($scope.day.tuesday != undefined) {
					var beginMorning = ($scope.day.tuesday.begin_time_morning != undefined) ? $scope.day.tuesday.begin_time_morning : 0;
					var endMorning = ($scope.day.tuesday.end_time_morning != undefined) ? $scope.day.tuesday.end_time_morning : 0;
					var beginAfternoon = ($scope.day.tuesday.begin_time_afternoon != undefined) ? $scope.day.tuesday.begin_time_afternoon : 0;
					var endAfternoon = ($scope.day.tuesday.end_time_afternoon != undefined) ? $scope.day.tuesday.end_time_afternoon : 0;

					add(l, $scope.days[0], beginMorning, endMorning, beginAfternoon, endAfternoon);
				} else {
					add(l, $scope.days[1], 0, 0, 0, 0);
				}

				if ($scope.day.wednesday != undefined) {
					var beginMorning = ($scope.day.wednesday.begin_time_morning != undefined) ? $scope.day.wednesday.begin_time_morning : 0;
					var endMorning = ($scope.day.wednesday.end_time_morning != undefined) ? $scope.day.wednesday.end_time_morning : 0;
					var beginAfternoon = ($scope.day.wednesday.begin_time_afternoon != undefined) ? $scope.day.wednesday.begin_time_afternoon : 0;
					var endAfternoon = ($scope.day.wednesday.end_time_afternoon != undefined) ? $scope.day.wednesday.end_time_afternoon : 0;

					add(l, $scope.days[0], beginMorning, endMorning, beginAfternoon, endAfternoon);
				} else {
					add(l, $scope.days[2], 0, 0, 0, 0);
				}

				if ($scope.day.thursday != undefined)  {
					var beginMorning = ($scope.day.thursday.begin_time_morning != undefined) ? $scope.day.thursday.begin_time_morning : 0;
					var endMorning = ($scope.day.thursday.end_time_morning != undefined) ? $scope.day.thursday.end_time_morning : 0;
					var beginAfternoon = ($scope.day.thursday.begin_time_afternoon != undefined) ? $scope.day.thursday.begin_time_afternoon : 0;
					var endAfternoon = ($scope.day.thursday.end_time_afternoon != undefined) ? $scope.day.thursday.end_time_afternoon : 0;

					add(l, $scope.days[0], beginMorning, endMorning, beginAfternoon, endAfternoon);
				} else {
					add(l, $scope.days[3], 0, 0, 0, 0);
				}

				if ($scope.day.friday != undefined) {
					var beginMorning = ($scope.day.friday.begin_time_morning != undefined) ? $scope.day.friday.begin_time_morning : 0;
					var endMorning = ($scope.day.friday.end_time_morning != undefined) ? $scope.day.friday.end_time_morning : 0;
					var beginAfternoon = ($scope.day.friday.begin_time_afternoon != undefined) ? $scope.day.friday.begin_time_afternoon : 0;
					var endAfternoon = ($scope.day.friday.end_time_afternoon != undefined) ? $scope.day.friday.end_time_afternoon : 0;

					add(l, $scope.days[0], beginMorning, endMorning, beginAfternoon, endAfternoon);
				} else {
					add(l, $scope.days[4], 0, 0, 0, 0);
				}

				if ($scope.day.saturday != undefined) {
					var beginMorning = ($scope.day.saturday.begin_time_morning != undefined) ? $scope.day.saturday.begin_time_morning : 0;
					var endMorning = ($scope.day.saturday.end_time_morning != undefined) ? $scope.day.saturday.end_time_morning : 0;

					add(l, $scope.days[0], beginMorning, endMorning, beginAfternoon, endAfternoon);
				} else {
					add(l, $scope.days[5], 0, 0, 0, 0);
				}

			}
		};
	}
]);