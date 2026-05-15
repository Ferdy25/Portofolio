const Project = () => {
  return (
    <section id="projects" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/project1.jpg" alt="Project 1" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Project 1</h3>
              <p className="text-gray-600">Description of Project 1.</p>
            </div>
          </div>
            {/* Project 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/project2.jpg" alt="Project 2" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Project 2</h3>
              <p className="text-gray-600">Description of Project 2.</p>
            </div>
          </div>
            {/* Project 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/project3.jpg" alt="Project 3" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Project 3</h3>
              <p className="text-gray-600">Description of Project 3.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;
  