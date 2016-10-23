var app = angular.module('bWork_alphaWeb');
app.run();

app.controller('HandleWeekCtrl', ['$scope', '$cookieStore', '$window', '$http', 'toastr', '$auth', '$location', 'templateData', 'dayData', function($scope, $cookieStore, $window, $http, toastr, $auth, $location, templateData, dayData) {

	$scope.templates = [];
	$scope.weeks = [];
	$scope.currentWeekPlusOne = 0;

	templateData.getTemplates().then(function(res) {

		$scope.templates = res.data;
	});

	$scope.AddWeek = function(DayModel) {
		//console.log(DayModel.selectWeek);

		//var day = new Day(DayModel.Monday.begin_time_morning, DayModel.Monday.end_time_morning, DayModel.begin_time_afternoon, DayModel.end_time_afternoon);
    	var day = 1;
		dayData.create(day).then(function(res)
		{

		});

	};

	var dateFromWeekNumber = function(year, week) {
		var days = [];
		var d = new Date(year, 0, 1);
		var d1 = new Date(year, 0, 1);
		var dayNum = d.getDay();
		var diff = --week * 7;

		if (!dayNum || dayNum > 4) {
			diff += 7;
		}

		d.setDate(d.getDate() - d.getDay() + ++diff);
		d1.setDate(d1.getDate() - d1.getDay() + ++diff + 4);
		days.push(d, d1);
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
	console.log(d, d.getWeek());
	$scope.currentWeekPlusOne = parseInt(d.getWeek()) + 1;

	var weeks = weeksInYear(currentYear);

	for (i = 1; i <= weeks; i++) {
		var days = dateFromWeekNumber(currentYear, i);
		var day, day1;
		var month, month1;

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

		day = format("day", days[0]);
		day1 = format("day", days[1]);
		month = format("month", days[0]);
		month1 = format("month", days[1]);

		var week = {
			number: i,
			firstday: day + "/" + month + "/" + days[0].getFullYear(),
			lastday: day1 + "/" + month1 + "/" + days[1].getFullYear()
		}

		$scope.weeks.push(week);
	}

}]);