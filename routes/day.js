var day = require('../models/Day');

module.exports = {
	configure: function(app) {

		app.get('/days/', function(req, res) {
			day.get(res);
		});

		app.get('/day/:id/', function(req, res) {
			day.getDayById(req.params.id, res);
		})

		app.get('/day/:day/month/:month/year/:year', function(req, res) {
			day.getDayByDayAndMonthAndYear(req.params.day, req.params.month, req.params.year);
		})
		app.post('/day/', function(req, res) {
			day.create(req.body, res);
		});

		app.put('/day/:day/:id', function(req, res) {
			day.update(req.params.day, req.params.id, res);
		});
	}
};