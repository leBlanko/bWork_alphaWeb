var User = require('../models/User');

module.exports = {
    configure: function(app) {
        // User

        app.get('/user/', function(req, res) {
            User.find(function(err, users) {
                if (err) return next(err);
                res.json(users);
            });
        });

        app.get('/user/:id/', function(req, res) {
            User.findById(req.params.id, function(err, post) {
                if (err) return next(err);
                res.json(post);
            });
        })

        app.post('/user/', function(req, res) {
            User.create(req.body, function(err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });

        app.put('/user/:id', function(req, res) {
            User.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });
    }
};