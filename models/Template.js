var connection = require("../config/connection");

function Template(name) {
	this.name = name;
}

Template.prototype.setName = function(name) {
	this.name = name;
}


Template.prototype.get = function(res) {
	connection.acquire(function(err, con) {
		con.query('select * from template', function(err, result) {
			con.release();
			res.send(result);
		});
	});
}


Template.prototype.getTemplateById = function(id, res) {
	connection.acquire(function(err, con) {
		con.query('select * from template where id = ?', [id], function(err, result) {
			con.release();
			res.send(result);
		});
	});
}

Template.prototype.create = function(template, res) {
	connection.acquire(function(err, con) {
		con.query('insert into template set ?', template, function(err, result) {
			con.release();
			if (err) {

				res.status(500);
				res.send({
					status: 1,
					message: 'Template creation failed'
				});

			} else {
				res.status(201);
				res.send({
					status: 0,
					message: 'Template created successfully'
				});
			}
		});
	});
}

Template.prototype.update = function(template, res) {
	connection.acquire(function(err, con) {
		con.query('update template set ? where id = ?', [template, template.id], function(err, result) {
			con.release();
			if (err) {
				res.send({
					status: 1,
					message: 'Template update failed'
				});
			} else {
				res.send({
					status: 0,
					message: 'Template updated successfully'
				});
			}
		});
	});
}

Template.prototype.delete = function(id, res) {
	connection.acquire(function(err, con) {
		con.query('delete from template where id = ?', [id], function(err, result) {
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
module.exports = new Template();