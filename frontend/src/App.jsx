import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Project from './components/Project';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-gray-950 min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <About />
        <Project />
        <Contact />
      </main>
      <div className="fixed bottom-4 right-4 text-gray-600 text-sm opacity-50 select-none z-50">
        © 2026 Ferdy Adnan Hernando. All rights reserved.
      </div>
    </div>
  );
}

export default App;