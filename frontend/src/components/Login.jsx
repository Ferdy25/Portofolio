import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/admin');
      } else {
        setError(data.error || 'Login gagal!');
      }
    } catch (err) {
      setError('Gagal koneksi ke server!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <form onSubmit={handleLogin} className="bg-gray-900 border border-gray-800 p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded mb-4 focus:outline-none focus:border-blue-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded mb-6 focus:outline-none focus:border-blue-500"
          required
        />

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 disabled:bg-gray-600 transition-colors font-medium"
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;