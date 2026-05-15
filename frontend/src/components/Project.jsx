import { useRef } from 'react';

const Project = () => {
  const scrollRef = useRef(null);

  const projects = [
    { id: 1, title: 'Project 1', desc: 'Description of Project 1.', image: '/project1.jpg' },
    { id: 2, title: 'Project 2', desc: 'Description of Project 2.', image: '/project2.jpg' },
    { id: 3, title: 'Project 3', desc: 'Description of Project 3.', image: '/project3.jpg' },
    { id: 4, title: 'Project 4', desc: 'Description of Project 4.', image: '/project4.jpg' },
    { id: 5, title: 'Project 5', desc: 'Description of Project 5.', image: '/project5.jpg' },
  ];

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 350;
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          My Projects
        </h2>

        {/* Container Slider */}
        <div className="relative group">
          
          {/* Tombol Panah (CUMA MUNCUL DI TABLET+) */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 
              bg-white hover:bg-gray-800 hover:text-white text-gray-800 
              p-3 rounded-full shadow-lg transition-all duration-300
              opacity-0 group-hover:opacity-100 -translate-x-4"
          >
            ←
          </button>

          {/* Card Container - INI BAGIAN RESPONSIVE-NYA! */}
          <div
            ref={scrollRef}
            className="
              md:flex md:flex-nowrap md:gap-8 md:overflow-x-auto md:snap-x md:snap-mandatory md:scroll-smooth md:pb-4 md:scrollbar-hide
              grid grid-cols-1 gap-8
            "
          >
            {projects.map(project => (
              <div
                key={project.id}
                className="
                  md:min-w-[350px] lg:min-w-[400px]
                  md:snap-center md:flex-shrink-0
                  bg-white rounded-lg shadow-md overflow-hidden
                  hover:shadow-xl transition-shadow duration-300
                "
              >
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tombol Panah (CUMA MUNCUL DI TABLET+) */}
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 
              bg-white hover:bg-gray-800 hover:text-white text-gray-800 
              p-3 rounded-full shadow-lg transition-all duration-300
              opacity-0 group-hover:opacity-100 translate-x-4"
          >
            →
          </button>

        </div>
      </div>
    </section>
  );
};

export default Project;