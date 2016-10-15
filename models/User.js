var connection = require("../config/connection");

function User(username, password) {
	this.username = username;
	this.password = password;
}

User.prototype.setUsername = function(username) {
	this.username = username;
}

User.prototype.setPassword = function(password) {
	this.password = password;
}

User.prototype.get = function(res) {
	connection.acquire(function(err, con) {
		con.query('select * from user', function(err, result) {
			con.release();
			res.send(result);
		});
	});
}


User.prototype.getUserById = function(id, res) {
	connection.acquire(function(err, con) {
		con.query('select * from user where id = ?', [id], function(err, result) {
			con.release();
			res.send(result);
		});
	});
}

User.prototype.create = function(user, res) {
	connection.acquire(function(err, con) {
		con.query('insert into user set ?', user, function(err, result) {
			con.release();
			if (err) {

				res.status(500);
				res.send({
					status: 1,
					message: 'User creation failed'
				});

			} else {
				res.status(201);
				res.send({
					status: 0,
					message: 'User created successfully'
				});
			}
		});
	});
}

User.prototype.update = function(user, res) {
	connection.acquire(function(err, con) {
		con.query('update user set ? where id = ?', [user, user.id], function(err, result) {
			con.release();
			if (err) {
				res.send({
					status: 1,
					message: 'User update failed'
				});
			} else {
				res.send({
					status: 0,
					message: 'User updated successfully'
				});
			}
		});
	});
}

User.prototype.delete = function(id, res) {
	connection.acquire(function(err, con) {
		con.query('delete from user where id = ?', [id], function(err, result) {
			con.release();
			console.log(err);
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
module.exports = new User();