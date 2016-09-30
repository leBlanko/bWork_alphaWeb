module.exports = function(app) {

  var moment = require('moment');
  var jwt = require('jwt-simple');
  var request = require('request');
  var User = require('../models/User');

  function ensureAuthenticated(req, res, next) {
    if (!req.header('Authorization')) {
      return res.status(401).send({
        message: 'Please make sure your request has an Authorization header'
      });
    }
    var token = req.header('Authorization').split(' ')[1];

    var payload = null;
    try {
      payload = jwt.decode(token, 'YOUR_UNIQUE_JWT_TOKEN_SECRET');
    } catch (err) {
      return res.status(401).send({
        message: err.message
      });
    }

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        message: 'Token has expired'
      });
    }
    req.user = payload.sub;
    next();
  }

  function createJWT(user) {
    var payload = {
      sub: user._id,
      iat: moment().unix(),
      exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, 'YOUR_UNIQUE_JWT_TOKEN_SECRET');
  }

  app.post('/auth/login', function(req, res) {
    User.find({}, function(err, user) {});
    User.findOne({
        username: req.body.username,
        password: req.body.password
      },
      function(err, user) {
        if (err) return res.status(401).send({
          message: 'Invalide mail and/or password'
        });
        if (user != null) {
          res.send({
            token: createJWT(user),
            user: user
          });
        } else {
          res.status(401).send({
            message: 'Invalide mail and/or password'
          });
        }
      });
  });

  /*
   |--------------------------------------------------------------------------
   | Login with Google
   |--------------------------------------------------------------------------
   */
  app.post('/auth/google', function(req, res) {
    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    var params = {
      code: req.body.code,
      client_id: req.body.clientId,
      client_secret: config.GOOGLE_SECRET,
      redirect_uri: req.body.redirectUri,
      grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, {
      json: true,
      form: params
    }, function(err, response, token) {
      var accessToken = token.access_token;
      var headers = {
        Authorization: 'Bearer ' + accessToken
      };

      // Step 2. Retrieve profile information about the current user.
      request.get({
        url: peopleApiUrl,
        headers: headers,
        json: true
      }, function(err, response, profile) {
        if (profile.error) {
          return res.status(500).send({
            message: profile.error.message
          });
        }
        // Step 3a. Link user accounts.
        if (req.header('Authorization')) {
          connection.acquire(function(err, con) {
            con.query("select * from user where google = ?", [profile.sub], function(err, existingUser) {
              con.release();

              if (existingUser && existingUser.length != 0) {
                return res.status(409).send({
                  message: 'There is already a Google account that belongs to you'
                });
              }

              var token = req.header('Authorization').split(' ')[1];
              var payload = jwt.decode(token, config.TOKEN_SECRET);
              connection.acquire(function(err, con) {
                con.query("select * from user where id = ?", [payload.sub], function(err, us) {
                  con.release();
                  if (!us) {
                    return res.status(400).send({
                      message: 'User not found'
                    });
                  }
                  user.google = profile.sub;
                  user.name = profile.name;
                  user.firstname = profile.firstname;
                  user.mail = profile.email;

                  connection.acquire(function(err, con) {
                    con.query('insert into user set ?', user, function(err, result) {
                      con.release();
                      var token = createJWT(user);
                      res.send({
                        token: token
                      });
                    });
                  })
                })
              })
            })
          })
        } else {
          // Step 3b. Create a new user account or return an existing one.

          connection.acquire(function(err, con) {
            con.query("select * from user where google = ?", [profile.sub], function(err, existingUser) {
              if (existingUser && existingUser.length != 0) {
                return res.send({
                  token: createJWT(existingUser)
                });
              }

              var user = require('../models/usermodel.js');
              user.google = profile.sub;
              user.name = profile.name;
              user.firstname = profile.firstname;
              user.mail = profile.email;
              connection.acquire(function(err, con) {
                con.query('insert into user set ?', user, function(err, result) {
                  con.release();
                  var token = createJWT(user);
                  res.send({
                    token: token
                  });
                });
              })
            })
          })
        }
      });
    });
  });


  /*
   |--------------------------------------------------------------------------
   | Login with Facebook
   |--------------------------------------------------------------------------
   */
  app.post('/auth/facebook', function(req, res) {
    var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
    var params = {
      code: req.body.code,
      client_id: req.body.clientId,
      client_secret: config.FACEBOOK_SECRET,
      redirect_uri: req.body.redirectUri
    };

    // Step 1. Exchange authorization code for access token.
    request.get({
      url: accessTokenUrl,
      qs: params,
      json: true
    }, function(err, response, accessToken) {
      if (response.statusCode !== 200) {
        return res.status(500).send({
          message: accessToken.error.message
        });
      }


      // Step 2. Retrieve profile information about the current user.
      request.get({
        url: graphApiUrl,
        qs: accessToken,
        json: true
      }, function(err, response, profile) {
        if (response.statusCode !== 200) {
          return res.status(500).send({
            message: profile.error.message
          });
        }


        if (req.header('Authorization')) {
          connection.acquire(function(err, con) {
            con.query('select * from user where facebook = ?', [profile.id], function(err, exUser) {
              con.release();
              console.log(exUser);
              if (exUser && exUser.length != 0) {
                return res.status(409).send({
                  message: 'There is already a Facebook account that belongs to you'
                });
              }

              var token = req.header('Authorization').split(' ')[1];
              console.log(token);
              var payload = jwt.decode(token, config.TOKEN_SECRET);
              console.log("payload", profile.id);
              connection.acquire(function(err, con) {
                con.query("select * from user where id = ?", [payload.sub], function(err, user) {
                  user.facebook = profile.id;
                  user.name = profile.name;
                  user.firstname = profile.firstname;
                  user.mail = profile.email;
                  connection.acquire(function(err, con) {
                    con.query('insert into user set ?', user, function(err, result) {
                      con.release();
                      var token = createJWT(user);
                      res.send({
                        token: token
                      });
                    });
                  })
                })
              });
            })
          })
        } else {
          connection.acquire(function(err, con) {
            con.query('select * from user where facebook = ?', [profile.id], function(err, exUser) {

              if (exUser && exUser.length != 0) {
                var token = createJWT(exUser);
                return res.send({
                  token: token
                });
              }
              var user = require('../models/usermodel.js');
              user.facebook = profile.id;
              user.name = profile.name;
              user.firstname = profile.first_name;
              user.mail = profile.email;

              connection.acquire(function(err, con) {
                con.query('insert into user set ?', user, function(err, result) {
                  con.release();
                  var token = createJWT(user);
                  res.send({
                    token: token
                  });
                });
              })
            })
          })
        }
      });
    });
  });

  /*
   |--------------------------------------------------------------------------
   | Unlink Provider
   |--------------------------------------------------------------------------
   */
  app.post('/auth/unlink', ensureAuthenticated, function(req, res) {
    var provider = req.body.provider;
    var providers = ['facebook', 'google'];

    if (providers.indexOf(provider) === -1) {
      return res.status(400).send({
        message: 'Unknown OAuth Provider'
      });
    }

    connection.acquire(function(err, con) {
      con.query('select * from user where id = ?', [req.user], function(err, user) {
        if (!user)
          return res.status(400).send({
            message: 'User Not Found'
          });
      })
      user[provider] = undefined;
      connection.acquire(function(err, con) {
        con.query('insert into user set ?', user, function(err, result) {
          con.release();
          res.status(200).end();
        });
      })
    })
  });
};