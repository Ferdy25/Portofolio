import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';

function App() {
  return (
    <div className="bg-gray-950 min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <About />
      </main>
    </div>
  );
}

export default App;