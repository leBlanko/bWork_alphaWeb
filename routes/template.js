var Template = require('../models/Template');


module.exports = {
	configure: function(app) {
		// User

		app.get('/template/', function(req, res) {
			user.get(res);
		});

		app.get('/template/:id/', function(req, res) {
			user.getUserById(req.params.id, res);
		})

		app.post('/template/', function(req, res) {
			user.create(req.body, res);
		});

		app.put('/user/:name/:firstname/:password/:id', function(req, res) {
			user.update(req.params.name, req.params.firstname, req.params.password, req.params.id, res);
		});
	}
};