var app = angular.module('bWork_alphaWeb');

app.controller('HandleWeekCtrl', ['$scope', '$cookieStore', '$window', '$http', 'toastr', '$auth', '$location', 'templateData', 'dayData', 'SweetAlert', function($scope, $cookieStore, $window, $http, toastr, $auth, $location, templateData, dayData, SweetAlert) {

	$scope.templates = [];
	$scope.weeks = [];
	$scope.currentWeekPlusOne = 0;
	$scope.showModalWeek = false;
	$scope.showModalTemplate = false;
	$scope.day = {};

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
		dateFromWeekNumber(week.year, week.number);
	}

	var add = function(l, dateModal, begin_time_morning, end_time_morning, begin_time_afternoon, end_time_afternoon) {
		l.start();

		var date = new Date(dateModal.substring(6, 10), dateModal.substring(3, 5), dateModal.substring(0, 2));
		var day = {
			day: date.getDate(),
			month: angular.copy(date.getMonth()),
			year: date.getFullYear(),
			beginMorning: parseInt(begin_time_morning.getHours()) * 60 + parseInt(begin_time_morning.getMinutes()),
			endMorning: parseInt(end_time_morning.getHours()) * 60 + parseInt(end_time_morning.getMinutes()),
			beginAfternoon: parseInt(begin_time_afternoon.getHours()) * 60 + parseInt(begin_time_afternoon.getMinutes()),
			endAfternoon: parseInt(end_time_afternoon.getHours()) * 60 + parseInt(end_time_afternoon.getMinutes()),
		}

		dayData.create(day).then(function(res) {

		}).finally(function() {
			l.stop();
			toastr.success("Le jour " + dateModal + " a été ajouté dans votre nouvelle semaine");

		});
	}
	$scope.addWeek = function(m) {

		//$scope.hide(m);
		if ($scope.day) {
			var l = Ladda.create(angular.element('.ladda-button').get()[0]);
			if ($scope.day.monday != undefined) {
				add(l, $scope.modalDisplay[0], $scope.day.monday.begin_time_morning, $scope.day.monday.end_time_morning, $scope.day.monday.begin_time_afternoon, $scope.day.monday.end_time_afternoon);
			}
			if ($scope.day.tuesday != undefined) {
				add(l, $scope.modalDisplay[1], $scope.day.tuesday.begin_time_morning, $scope.day.tuesday.end_time_morning, $scope.day.tuesday.begin_time_afternoon, $scope.day.tuesday.end_time_afternoon);
			}
			if ($scope.day.wednesday != undefined) {
				add(l, $scope.modalDisplay[2], $scope.day.wednesday.begin_time_morning, $scope.day.wednesday.end_time_morning, $scope.day.wednesday.begin_time_afternoon, $scope.day.wednesday.end_time_afternoon);
			}
			if ($scope.day.thursday != undefined)  {
				add(l, $scope.modalDisplay[3], $scope.day.thursday.begin_time_morning, $scope.day.thursday.end_time_morning, $scope.day.thursday.begin_time_afternoon, $scope.day.thursday.end_time_afternoon);
			}
			if ($scope.day.friday != undefined) {
				add(l, $scope.modalDisplay[4], $scope.day.friday.begin_time_morning, $scope.day.friday.end_time_morning, $scope.day.friday.begin_time_afternoon, $scope.day.friday.end_time_afternoon);
			}
			if ($scope.day.saturday != undefined) {
				add(l, $scope.modalDisplay[5], $scope.day.saturday.begin_time_morning, $scope.day.saturday.end_time_morning, $scope.day.saturday.begin_time_afternoon, $scope.day.saturday.end_time_afternoon);
			}
		}
	};

	var format = function(type, data) {
		if (type == "day") {
			var dayFormat;
			if (data.getDate() < 10) {
				dayFormat = "0" + data.getDate();
			} else {
				dayFormat = data.getDate();
			}

			return dayFormat;
		} else {
			var monthFormat;
			var month = parseInt(data.getMonth() + 1);
			if (month < 10) {
				monthFormat = "0" + month;
			} else {
				monthFormat = month;
			}
			return monthFormat;
		}
	}

	var dateFromWeekNumber = function(year, week) {
		var days = [];
		$scope.modalDisplay = [];
		var monday = new Date(year, 0, 1);
		var tuesday = new Date(year, 0, 1);
		var wednesday = new Date(year, 0, 1);
		var thursday = new Date(year, 0, 1);
		var friday = new Date(year, 0, 1);
		var saturday = new Date(year, 0, 1);
		var dayNum = d.getDay();
		var diff = --week * 7;

		if (!dayNum || dayNum > 4) {
			diff += 7;
		}

		monday.setDate(monday.getDate() - monday.getDay() + ++diff);
		tuesday.setDate(tuesday.getDate() - tuesday.getDay() + ++diff);
		wednesday.setDate(wednesday.getDate() - wednesday.getDay() + ++diff);
		thursday.setDate(thursday.getDate() - thursday.getDay() + ++diff);
		friday.setDate(friday.getDate() - friday.getDay() + ++diff);
		saturday.setDate(saturday.getDate() - saturday.getDay() + ++diff);


		mondayDay = format("day", monday);
		tuesdayDay = format("day", tuesday);
		wednesdayDay = format("day", wednesday);
		thursdayDay = format("day", thursday);
		fridayDay = format("day", friday);
		saturdayDay = format("day", saturday);

		mondayMonth = format("month", monday);
		tuesdayMonth = format("month", tuesday);
		wednesdayMonth = format("month", wednesday);
		thursdayMonth = format("month", thursday);
		fridayMonth = format("month", friday);
		saturdayMonth = format("month", saturday);


		$scope.modalDisplay.push(
			mondayDay + "/" + mondayMonth + "/" + monday.getFullYear(),
			tuesdayDay + "/" + tuesdayMonth + "/" + tuesday.getFullYear(),
			wednesdayDay + "/" + wednesdayMonth + "/" + wednesday.getFullYear(),
			thursdayDay + "/" + thursdayMonth + "/" + thursday.getFullYear(),
			fridayDay + "/" + fridayMonth + "/" + friday.getFullYear(),
			saturdayDay + "/" + saturdayMonth + "/" + saturday.getFullYear()
		);
		days.push(monday, tuesday, wednesday, thursday, friday, saturday);

		return days;
	}

	var getWeekNumber = function(d) {
		d = new Date(+d);
		d.setHours(0, 0, 0);
		d.setDate(d.getDate() + 4 - (d.getDay() || 7));
		var yearStart = new Date(d.getFullYear(), 0, 1);
		var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
		return [d.getFullYear(), weekNo];
	}

	var weeksInYear = function(year) {
		var month = 11,
			day = 31,
			week;

		do {
			d = new Date(year, month, day--);
			week = getWeekNumber(d)[1];
		} while (week == 1);

		return week;
	}

	Date.prototype.getWeek = function() {
		var determinedate = new Date();
		determinedate.setFullYear(this.getFullYear(), this.getMonth(), this.getDate());
		var D = determinedate.getDay();
		if (D == 0) D = 7;
		determinedate.setDate(determinedate.getDate() + (4 - D));
		var YN = determinedate.getFullYear();
		var ZBDoCY = Math.floor((determinedate.getTime() - new Date(YN, 0, 1, -6)) / 86400000);
		var WN = Math.floor(ZBDoCY / 7);
		return WN;
	}


	var d = new Date();
	var currentYear = d.getFullYear();
	$scope.currentWeekPlusOne = parseInt(d.getWeek()) + 1;

	var weeks = weeksInYear(currentYear);

	for (i = 1; i <= weeks; i++) {
		var days = dateFromWeekNumber(currentYear, i);
		var day, day1;
		var month, month1;

		day = format("day", days[0]);
		day1 = format("day", days[5]);
		month = format("month", days[0]);
		month1 = format("month", days[5]);

		var week = {
			number: i,
			firstday: day + "/" + month + "/" + days[0].getFullYear(),
			lastday: day1 + "/" + month1 + "/" + days[5].getFullYear(),
			year: days[0].getFullYear()
		}

		$scope.weeks.push(week);
	}


	$scope.testSweetAlert = function() {
		//A injecter en haut dans app.controller() SweetAlert
		console.log('ici');
		SweetAlert.swal("Good job!", "You clicked the button!", "success");
	}

}]);