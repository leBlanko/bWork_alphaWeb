var app = angular.module('bWork_alphaWeb');
app.run();

app.controller('HandleWeekCtrl', ['$scope', '$cookieStore', '$window', '$http', 'toastr', '$auth', '$location', 'templateData', function($scope, $cookieStore, $window, $http, toastr, $auth, $location, templateData) {

	$scope.templates = [];
	$scope.weeks = [];

	templateData.getTemplates().then(function(res) {

		$scope.templates = res.data;
	});



	var getDays = function(year, week) {
		var j10 = new Date(year, 0, 10, 12, 0, 0),
			j4 = new Date(year, 0, 4, 12, 0, 0),
			mon = j4.getTime() - j10.getDay() * 86400000,
			result = [];

		for (var i = -1; i < 6; i++) {
			result.push(new Date(mon + ((week - 1) * 7 + i) * 86400000));
		}

		return result;
	}


	var getWeekNumber = function(d) {
		// Copy date so don't modify original
		d = new Date(+d);
		d.setHours(0, 0, 0);
		// Set to nearest Thursday: current date + 4 - current day number
		// Make Sunday's day number 7
		d.setDate(d.getDate() + 4 - (d.getDay() || 7));
		// Get first day of year
		var yearStart = new Date(d.getFullYear(), 0, 1);
		// Calculate full weeks to nearest Thursday
		var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
			// Return array of year and week number
		return [d.getFullYear(), weekNo];
	}

	var weeksInYear = function(year) {
		var month = 11,
			day = 31,
			week;

		// Find week that 31 Dec is in. If is first week, reduce date until
		// get previous week.
		do {
			d = new Date(year, month, day--);
			week = getWeekNumber(d)[1];
		} while (week == 1);

		return week;
	}



	var d = new Date();
	var currentYear = d.getYear();

	var weeks = weeksInYear(currentYear);

	for (i = 0; i < weeks; i++) {
		var days = getDays(currentYear, i);

		var week = {
			number: i,
			firstday: new Date(days[1]),
			lastday: new Date(days[days.length - 1])
		}

		$scope.weeks.push(week);
	}
}]);