const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const pool = require('../database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const fs = require('fs');
require('dotenv').config();

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer Config
const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = file.originalname.split('.').pop();
      cb(null, uniqueName + '.' + ext);
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Hanya file gambar yang diizinkan!'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }
});

// GET ALL PROJECTS (Public)
router.get('/', async (req, res) => {
  try {
    const [projects] = await pool.query(
      'SELECT id, title, description, image_url, created_at FROM projects ORDER BY created_at DESC'
    );
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Gagal mengambil project!' });
  }
});

// GET SINGLE PROJECT (Public)
router.get('/:id', async (req, res) => {
  try {
    const [projects] = await pool.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    
    if (projects.length === 0) {
      return res.status(404).json({ error: 'Project tidak ditemukan!' });
    }
    
    res.json(projects[0]);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Gagal mengambil project!' });
  }
});

// CREATE PROJECT (Admin Only)
router.post('/', authenticateToken, requireAdmin, upload.single('image'), async (req, res) => {
  let cloudinaryResult = null;
  
  try {
    const { title, description } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ error: 'Judul dan deskripsi wajib!' });
    }
    
    let imageUrl = null;
    let cloudinaryPublicId = null;
    
    if (req.file) {
      // Upload ke Cloudinary
      cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'portfolio',
        transformation: [
          { width: 800, height: 600, crop: 'limit', quality: 'auto' }
        ]
      });
      
      imageUrl = cloudinaryResult.secure_url;
      cloudinaryPublicId = cloudinaryResult.public_id;
      
      // Hapus file sementara
      fs.unlinkSync(req.file.path);
    }
    
    const [result] = await pool.query(
      'INSERT INTO projects (title, description, image_url, cloudinary_public_id) VALUES (?, ?, ?, ?)',
      [title, description, imageUrl, cloudinaryPublicId]
    );
    
    const [newProject] = await pool.query(
      'SELECT id, title, description, image_url, created_at FROM projects WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json({
      message: 'Project berhasil ditambahkan! 🎉',
      project: newProject[0]
    });
    
  } catch (error) {
    console.error('Create error:', error);
    
    if (cloudinaryResult) {
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }
    
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ error: 'Gagal menambah project!' });
  }
});

// DELETE PROJECT (Admin Only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const { id } = req.params;
    
    await connection.beginTransaction();
    
    const [projects] = await connection.query('SELECT * FROM projects WHERE id = ?', [id]);
    
    if (projects.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Project tidak ditemukan!' });
    }
    
    const project = projects[0];
    
    // Hapus dari Cloudinary
    if (project.cloudinary_public_id) {
      await cloudinary.uploader.destroy(project.cloudinary_public_id);
    }
    
    // Hapus dari database
    await connection.query('DELETE FROM projects WHERE id = ?', [id]);
    
    await connection.commit();
    
    res.json({ message: 'Project berhasil dihapus! 🗑️', deletedId: parseInt(id) });
    
  } catch (error) {
    await connection.rollback();
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Gagal menghapus project!' });
  } finally {
    connection.release();
  }
});

module.exports = router;