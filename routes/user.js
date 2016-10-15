var user = require('../models/User');

module.exports = {
    configure: function(app) {

        app.get('/users/', function(req, res) {
            user.get(res);
        });

        app.get('/user/:id/', function(req, res) {
            user.getUserById(req.params.id, res);
        })

        app.post('/user/', function(req, res) {
            user.create(req.body, res);
        });

        app.put('/user/:username/:password/:id', function(req, res) {
            user.update(req.params.username, req.params.password, req.params.id, res);
        });
    }
};