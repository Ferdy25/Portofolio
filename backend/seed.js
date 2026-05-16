require('dotenv').config();
const bcrypt = require('bcrypt');
const pool = require('./database');

const seedAdmin = async () => {
  try {
    const [existing] = await pool.query('SELECT id FROM users WHERE username = ?', ['admin']);
    
    if (existing.length > 0) {
      console.log('⚠️ Admin sudah ada!');
      process.exit(0);
    }
    
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await pool.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      ['admin', hashedPassword, 'admin']
    );
    
    console.log('✅ Admin created!');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedAdmin();