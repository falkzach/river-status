var mysql = require('mysql');

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

    all(callback) {
      this.pool.getConnection((err, con) => {
        if (err) callback(err, null);
        con.query('SELECT * FROM entries', (err, result, fields) => {
          con.release();
          if (err) callback(err, null);
          callback(null, result);
        });
      });
    }

    add(data) {
      this.pool.getConnection((err, con) => {
        if (err) throw err;
        con.query('INSERT INTO entries SET ?', data, (err, result, fields) => {
          con.release();
          if (err) throw err;
          return result;
        });
      });
    }
}

module.exports = Entry;
