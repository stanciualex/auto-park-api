const rdb = require('rethinkdb');
const async = require('async');

const db = process.env.DB_NAME;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

const dropDb = (next) => {
  rdb.connect({host: host, port: port}, (error, connection) => {
    rdb.dbDrop(db).run(connection, (error, response) => {
      connection.close();
      next(error, response);
    });
  });
};

const createDb = (next) => {
  rdb.connect({host: host, port: port}, (error, connection) => {
    rdb.dbCreate(db).run(connection, (error, response) => {
      connection.close();
      next(error, response);
    });
  });
};

async.series({
  dropped: dropDb,
  created: createDb
}, (error, response) => {
  console.log(response);
});
