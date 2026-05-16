import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Project from './components/Project';
import Contact from './components/Contact';
import Login from './components/Login';          // ← TAMBAHIN
import AdminPanel from './components/AdminPanel'; // ← TAMBAHIN

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-950 min-h-screen text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Project />
              <Contact />
            </>
          } />
          <Route path="/login" element={<Login />} />          {/* ← TAMBAHIN */}
          <Route path="/admin" element={<AdminPanel />} />      {/* ← TAMBAHIN */}
        </Routes>
      </div>
       <div className="fixed bottom-4 right-4 text-gray-600 text-sm opacity-50 select-none z-50">
        © 2026 Ferdy Adnan Hernando. All rights reserved.
      </div>
    </BrowserRouter>
  );
}

export default App; 
     
 