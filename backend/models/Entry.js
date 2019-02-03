var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'process.env.MARIADB_HOST',
  user: 'process.env.MARIADB_USER',
  password: 'process.env.MARIADB_PASSWORD',
  database: 'process.env.MARIADB_DATABASE'
});

class Entry {
    constructor(params) {
        this.pool = mysql.createPool({
            host: process.env.MARIADB_HOST,
            port: process.env.MARIADB_PORT,
            user: process.env.MARIADB_USER,
            password: process.env.MARIADB_PASSWORD,
            database: process.env.MARIADB_DATABASE
          });

    }

    all() {
      this.pool.getConnection(function(err, con) {
        if (err) throw err;
        con.query('SELECT * FROM entries', function (err, result, fields) {
          if (err) throw err;
          return result;
        });
      });
    }

    add(data) {
      this.pool.getConnection(function(err, con) {
        if (err) throw err;
        con.query('INSERT INTO entries SET ?', data, function (err, result, fields) {
          if (err) throw err;
          return result;
        });
      });
    }
}

module.exports = Entry;
