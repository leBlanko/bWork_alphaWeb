var connection = require("../config/connection");

function Day(minNormal, minSup, minRecup, day, month, year, beginMorning, endMorning, beginAfternoon, endAfternoon) {
	this.minNormal = minNormal;
	this.minSup = minSup;
	this.minRecup = minRecup;
	this.day = day;
	this.month = month;
	this.year = year;
	this.beginMorning - beginMorning;
	this.endMorning = endMorning;
	this.beginAfternoon = beginAfternoon;
	this.endAfternoon = endAfternoon;
}

function Day(beginMorning, endMorning, beginAfternoon, endAfternoon) {
	this.minNormal = beginMorning;
	this.minSup = 0;
	this.minRecup = 0;
	this.day = 11; //A CHANGER , pour les test
	this.month = 12; //A CHANGER , pour les test
	this.year = 2016; //A CHANGER , pour les test
	this.beginMorning = beginMorning;
	this.endMorning = endMorning;
	this.beginAfternoon = beginAfternoon;
	this.endAfternoon = endAfternoon;
}

Day.prototype.setMinNormal = function(mins) {
	this.hNormal = mins;
}
Day.prototype.setMinSup = function(mins) {
	this.hSup = mins;
}
Day.prototype.setMinRecup = function(mins) {
	this.minRecup = mins;
}
Day.prototype.setDay = function(day) {
	this.day = day;
}
Day.prototype.setMonth = function(month) {
	this.month = month;
}
Day.prototype.setYear = function(year) {
	this.year = year;
}
Day.prototype.setBeginMorning = function(mins) {
	this.beginMorning = mins;
}
Day.prototype.setEndMorning = function(mins) {
	this.endMorning = mins;
}
Day.prototype.setBeginAfternoon = function(mins) {
	this.beginAfternoon = mins;
}
Day.prototype.setEndAfternoon = function(mins) {
	this.endAfternoon = mins;
}


Day.prototype.get = function(res) {
	connection.acquire(function(err, con) {
		con.query('select * from day', function(err, result) {
			con.release();
			res.send(result);
		});
	});
}


Day.prototype.getDayById = function(id, res) {
	connection.acquire(function(err, con) {
		con.query('select * from day where id = ?', [id], function(err, result) {
			con.release();
			res.send(result);
		});
	});
}

Day.prototype.getDaysByFirstAndLastDay = function(first_day_year, first_day_month, first_day_day, last_day_year, last_day_month, last_day_day, res) {
	connection.acquire(function(err, con) {
		con.query('select * from day d  where d.year BETWEEN ? and ? and d.month BETWEEN ? and ? and d.day BETWEEN ? and ?', [first_day_year, last_day_year, first_day_month, last_day_month, first_day_day, last_day_day], function(err, result) {
			con.release();
			res.send(result);
		})
	})
}
Day.prototype.getDayByDayAndMonthAndYear = function(day, month, year, res) {
	connection.acquire(function(err, con) {
		con.query('select * from day where day = ? and month = ? and year = ?', [day, month, year], function(err, result) {
			con.release();
			res.send(result);
		})
	})
}

Day.prototype.create = function(day, res) {
	connection.acquire(function(err, con) {
		con.query('insert into day set ?', day, function(err, result) {
			con.release();
			if (err) {

				res.status(500);
				res.send({
					status: 1,
					message: 'Day creation failed'
				});

			} else {
				res.status(201);
				res.send({
					status: 0,
					message: 'Day created successfully'
				});
			}
		});
	});
}

Day.prototype.update = function(day, res) {
	connection.acquire(function(err, con) {
		con.query('update day set ? where id = ?', [day, day.id], function(err, result) {
			con.release();
			if (err) {
				res.send({
					status: 1,
					message: 'Day update failed'
				});
			} else {
				res.send({
					status: 0,
					message: 'Day updated successfully'
				});
			}
		});
	});
}

Day.prototype.delete = function(id, res) {
	connection.acquire(function(err, con) {
		con.query('delete from day where id = ?', [id], function(err, result) {
			con.release();
			if (err) {
				res.send({
					status: 500,
					message: 'Failed to delete'
				});
			} else {
				res.send({
					status: 200,
					message: 'Deleted successfully'
				});
			}
		});
	});
}
module.exports = new Day();