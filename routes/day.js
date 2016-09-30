var Day = require('../models/Day');

module.exports = {
	configure: function(app) {
		// User

		app.get('/day/', function(req, res) {
			user.get(res);
		});

		app.get('/day/:id/', function(req, res) {
			user.getUserById(req.params.id, res);
		})

		app.post('/day/', function(req, res) {
			user.create(req.body, res);
		});

		app.put('/day/:name/:firstname/:password/:id', function(req, res) {
			user.update(req.params.name, req.params.firstname, req.params.password, req.params.id, res);
		});
	}
};