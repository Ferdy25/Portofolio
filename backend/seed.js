require('dotenv').config();
const bcrypt = require('bcrypt');
const pool = require('./database');

const seedAdmin = async () => {
  try {
    console.log('⏳ Menunggu database siap...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    const [existing] = await pool.query('SELECT id FROM users WHERE username = ?', ['admin']);
    
    if (existing.length > 0) {
      console.log('⚠️  Admin sudah ada!');
      return;
    }
    
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await pool.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      ['admin', hashedPassword, 'admin']
    );
    
    console.log('✅ Admin berhasil dibuat!');
    console.log('   Username: admin');
    console.log('   Password: admin123');
  } catch (error) {
    console.error('❌ Seed gagal:', error.message);
  }
};

seedAdmin();