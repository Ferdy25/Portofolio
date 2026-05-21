const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-yellow-700/30 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2">
            <img src="/Me.jpeg" alt="Logo" className="w-8 h-8 rounded-full object-cover" />
          <span className="text-white font-bold text-lg">Ferdy Adnan Hernando</span>
        </a>

        {/* Navigation links */}
        <ul className="flex items-center gap-8 text-yellow-600 text-sm font-medium">
          <li>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
          </li>
          <li>
            <a href="#projects" className="hover:text-white transition-colors">
                Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </li>
          <li>
            <a
              href="#Github"
              className="px-4 py-2  bg-yellow-700  transition delay-150 duration-300  hover:bg-stone-400 rounded-full text-white transition-colors"
            >
              Donation
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;