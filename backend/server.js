const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

app.get('/', (req, res) => {
  res.json({ message: '🚀 Portfolio API Running!' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error!' });
});

app.listen(PORT, () => {
  console.log(`✅ Server: http://localhost:${PORT}`);
});