var timeDimension = require('../models/TimeDimension');


module.exports = {
	configure: function(app) {

		app.get('/timeDimension/', function(req, res) {
			timeDimension.get(res);
		});

		app.get('/timeDimension/year/:year/', function(req, res) {
			timeDimension.getTimeDimensionsByYearAndFirstAndLastDayByWeek(req.params.year, res);
		});

		app.get('/timeDimension/startDate/:startDate/endDate/:endDate', function(req, res) {
			timeDimension.getTimeDimensionsByStartAndEndDateOfWeek(req.params.startDate, req.params.endDate, res);
		})
	}
};