import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
// import { TrustBar } from './components/sections/TrustBar';
import { Comparison } from "./components/sections/Comparison";
import { Services } from "./components/sections/Services";
import { Features } from "./components/sections/Features";
import { Demo } from "./components/sections/Demo";
import { Testimonials } from "./components/sections/Testimonials";
import "./styles/globals.css";
import "./styles/utilities.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        {/* <TrustBar /> */}
        <Comparison />
        <Services />
        <Features />
        <Demo />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;
