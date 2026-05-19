const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME ,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// RETRY CONNECTION (BUAT DOCKER)
const connectWithRetry = async (retries = 10) => {
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await pool.getConnection();
      console.log(' Database sudah terkoneksi!');
      connection.release();
      return;
    } catch (err) {
      console.log(`Menunggu database... (${i + 1}/${retries})`);
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  console.error('Gagal konek ke database!');
  process.exit(1);
};

connectWithRetry();

module.exports = pool;