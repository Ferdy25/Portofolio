import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const AdminPanel = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', image: null });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Cek login
  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.title || !form.description) {
      alert('Judul dan deskripsi wajib!');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    if (form.image) formData.append('image', form.image);

    try {
      const res = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        alert('Project berhasil ditambahkan! 🎉');
        setForm({ title: '', description: '', image: null });
        setPreview(null);
        fetchProjects();
      } else {
        alert(data.error || 'Gagal upload!');
      }
    } catch (err) {
      alert('Gagal koneksi ke server!');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin hapus project ini?')) return;

    try {
      const res = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        setProjects(projects.filter(p => p.id !== id));
        alert('Project berhasil dihapus! 🗑️');
      }
    } catch (err) {
      alert('Gagal menghapus!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Tambah Project Baru</h2>
          
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Judul Project"
            className="w-full bg-gray-800 border border-gray-700 p-3 rounded mb-4 focus:outline-none focus:border-blue-500"
            required
          />
          
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Deskripsi Project"
            className="w-full bg-gray-800 border border-gray-700 p-3 rounded mb-4 focus:outline-none focus:border-blue-500"
            rows="4"
            required
          />
          
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-4 text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            accept="image/*"
          />
          
          {preview && (
            <img src={preview} alt="Preview" className="w-48 h-32 object-cover rounded border border-gray-700 mb-4" />
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded transition-colors disabled:bg-gray-600"
          >
            {loading ? 'Uploading...' : 'Upload Project'}
          </button>
        </form>

        {/* Projects List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
              {project.image_url && (
                <img src={project.image_url} alt={project.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold">{project.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{project.description}</p>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors w-full"
                >
                  Hapus Project
                </button>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="text-center text-gray-500 mt-8">Belum ada project. Tambahin dulu bro! 🚀</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;