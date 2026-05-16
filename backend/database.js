const mysqlq = require('mysql2/promise');
require('dotenv').config();

const pool = mysqlq.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

pool.getConnection()
  .then(connection => {
    console.log('Database connection established');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

  module.exports = pool;