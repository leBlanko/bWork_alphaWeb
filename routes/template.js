var template = require('../models/Template');


module.exports = {
	configure: function(app) {

		app.get('/templates/', function(req, res) {
			template.get(res);
		});

		app.get('/template/:id/', function(req, res) {
			template.getTemplateById(req.params.id, res);
		})

		app.post('/template/', function(req, res) {
			template.create(req.body, res);
		});

		app.delete('/template/:id', function(req, res) {
			template.delete(req.params.id, res);
		});

		app.put('/template/:name/:id', function(req, res) {
			template.update(req.params.name, req.params.id, res);
		});



	}
};