const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../database');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Limit login/register attempts to 5 requests per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, 
  message: { error: 'Terlalu banyak percobaan, silakan coba lagi nanti.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username dan password wajib!' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password minimal 6 karakter!' });
    }
    
    const [existing] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
    
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Username sudah terdaftar!' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    await pool.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, role || 'user']
    );
    
    res.status(201).json({ message: 'Registrasi berhasil!' });
    
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error!' });
  }
});

// LOGIN
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username dan password wajib!' });
    }
    
    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Username atau password salah!' });
    }
    
    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Username atau password salah!' });
    }
    
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      message: 'Login berhasil!',
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error!' });
  }
});

// VERIFY TOKEN
router.get('/verify', require('../middleware/auth').authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

module.exports = router;