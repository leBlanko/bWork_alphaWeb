var app = angular.module('bWork_alphaWeb');
app.directive("calendar", ["moment", "dayData", function(moment, dayData) {
    return {
        restrict: "E",
        templateUrl: "templates/calendar.html",
        scope: {
            selected: "=",
            schedule: "=",
            id: "="
        },
        link: function(scope) {
            scope.selected = _removeTime(scope.selected || moment());
            scope.month = scope.selected.clone();

            var start = scope.selected.clone();
            start.date(1);
            _removeTime(start.day(1));

            _buildMonth(scope, start, scope.month);

            scope.select = function(day) {
                scope.selected = day.date;
                var d = new Date(scope.selected);
                dayData.getDayByDayAndMonthAndYear(d.getDate(), d.getMonth() + 1, d.getFullYear()).then(function(data) {
                    scope.schedule = {};
                    if (data.data.length > 0) {
                        var res = data.data[0];

                        var schedule = {
                            beginMorning: convertMinsToHrsMins(res.beginMorning),
                            endMorning: convertMinsToHrsMins(res.endMorning),
                            beginAfternoon: convertMinsToHrsMins(res.beginAfternoon),
                            endAfternoon: convertMinsToHrsMins(res.endAfternoon),
                            minNormal: convertMinsToHrsMins(res.minNormal),
                            minRecup: convertMinsToHrsMins(res.minRecup),
                            minSup: convertMinsToHrsMins(res.minSup),
                            day: res.day,
                            month: res.month,
                            year: res.year,
                            id: res.id
                        }
                        scope.schedule = schedule;
                        scope.id = schedule.id;
                    }
                })
            };

            var convertMinsToHrsMins = function(minutes) {
                var h = Math.floor(minutes / 60);
                var m = minutes % 60;
                h = h < 10 ? '0' + h : h;
                m = m < 10 ? '0' + m : m;
                return h + ':' + m;
            }

            scope.next = function() {
                var next = scope.month.clone();
                _removeTime(next.month(next.month() + 1)).date(1);
                scope.month.month(scope.month.month() + 1);
                _buildMonth(scope, next, scope.month);
            };

            scope.previous = function() {
                var previous = scope.month.clone();
                _removeTime(previous.month(previous.month() - 1).date(1));
                scope.month.month(scope.month.month() - 1);
                _buildMonth(scope, previous, scope.month);
            };
        }
    };

    function _removeTime(date) {
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }

    function _buildMonth(scope, start, month) {
        scope.weeks = [];
        var done = false,
            date = start.clone(),
            monthIndex = date.month(),
            count = 0;
        while (!done) {
            scope.weeks.push({
                days: _buildWeek(date.clone(), month)
            });
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
    }

    function _buildWeek(date, month) {
        var days = [];
        for (var i = 0; i < 7; i++) {
            days.push({
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date
            });
            date = date.clone();
            date.add(1, "d");
        }
        return days;
    }
}]);