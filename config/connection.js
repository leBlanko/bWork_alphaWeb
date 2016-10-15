var mysql = require('mysql');

function Connection() {
  this.pool = null;

  this.init = function() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'bwork_alphaWeb',
      socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
    });

    this.pool.on('connection', function(connection) {
      console.log('connected to mysql db');
    })
  };

  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  };
}

module.exports = new Connection();