var connection = require("../config/connection");

function TimeDimension(db_date, year, month, day, quarter, week, day_name, month_name, holiday_flag, weekend_flag) {
	this.db_date = db_date;
	this.year = year;
	this.month = month;
	this.day = day;
	this.quarter = quarter;
	this.week = week;
	this.day_name = day_name;
	this.month_name = month_name;
	this.holiday_flag = holiday_flag;
	this.weekend_flag = weekend_flag;
}

TimeDimension.prototype.get = function(res) {
	connection.acquire(function(err, con) {
		con.query('select * from time_dimension', function(err, result) {
			con.release();
			res.send(result);
		});
	});
}

TimeDimension.prototype.getTimeDimensionsByYear = function(year, res) {
	connection.acquire(function(err, con) {
		con.query('select DISTINCT week from time_dimension where year = ?', [year], function(err, result) {
			con.release();
			res.send(result);
		});
	});
}

TimeDimension.prototype.getTimeDimensionsByYearAndFirstAndLastDayByWeek = function(year, res) {
	connection.acquire(function(err, con) {
		con.query('SELECT min(db_date) as begin_week, max(db_date) as end_week, week FROM time_dimension where year = ? group by week ORDER by begin_week,end_week', [year], function(err, result) {
			con.release();
			res.send(result);
		})
	})
}

TimeDimension.prototype.getTimeDimensionsByStartAndEndDateOfWeek = function(startDate, endDate, res) {
	connection.acquire(function(err, con) {
		con.query('SELECT db_date FROM time_dimension where db_date BETWEEN ? and ? and day_name != "Sunday" order by db_date', [startDate, endDate], function(err, result) {
			con.release();
			res.send(result);
		})
	})
}

module.exports = new TimeDimension();