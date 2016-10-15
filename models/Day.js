var connection = require("../config/connection");

function Day(day, year) {
	this.day = day;
	this.year = year;
}

Day.prototype.setDay = function(day) {
	this.day = day;
}

Day.prototype.setYear = function(year) {
	this.year = year;
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