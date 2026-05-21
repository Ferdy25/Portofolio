import { useRef, useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const Project = () => {
  const scrollRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data dari backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/projects`);
        if (!res.ok) throw new Error('Gagal ambil data');
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Scroll function
  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = 350;
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Loading
  if (loading) {
    return (
      <section id="projects" className="py-100 bg-gray-950">
        <div className="text-center text-gray-400">
          <p>Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-100 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          My Projects
        </h2>

        {projects.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada project.</p>
        ) : (
          <div className="relative group">
            
            {/* Tombol Kiri */}
            <button
              onClick={() => scroll('left')}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 
                bg-gray-800 hover:bg-white hover:text-gray-900 text-white
                p-3 rounded-full shadow-lg transition-all duration-300
                opacity-0 group-hover:opacity-100 -translate-x-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Container Slider */}
            <div
              ref={scrollRef}
              className="md:flex md:flex-nowrap md:gap-6 md:overflow-x-auto 
                md:snap-x md:snap-mandatory md:scroll-smooth md:pb-4 scrollbar-hide
                grid grid-cols-1 gap-6"
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="md:min-w-[350px] lg:min-w-[400px] md:snap-center md:flex-shrink-0
                    bg-gray-900 border border-gray-800 rounded-lg overflow-hidden
                    hover:border-blue-500/50 transition-all duration-300"
                >
                  {project.image_url && (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-400">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tombol Kanan */}
            <button
              onClick={() => scroll('right')}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 
                bg-gray-800 hover:bg-white hover:text-gray-900 text-white
                p-3 rounded-full shadow-lg transition-all duration-300
                opacity-0 group-hover:opacity-100 translate-x-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

          </div>
        )}
      </div>
    </section>
  );
};

export default Project;