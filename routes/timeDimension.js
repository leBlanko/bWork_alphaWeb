var timeDimension = require('../models/TimeDimension');


module.exports = {
	configure: function(app) {

		app.get('/timeDimension/', function(req, res) {
			timeDimension.get(res);
		});

		app.get('/timeDimension/year/:year/', function(req, res) {
			timeDimension.getTimeDimensionsByYearAndFirstAndLastDayByWeek(req.params.year, res);
		});
	}
};