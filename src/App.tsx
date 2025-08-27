import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
// import { TrustBar } from './components/sections/TrustBar';
import { Comparison } from "./components/sections/Comparison";
import { Services } from "./components/sections/Services";
import { Features } from "./components/sections/Features";
import { Demo } from "./components/sections/Demo";
import { Testimonials } from "./components/sections/Testimonials";
import { Technology } from "./components/sections/Technology";
import { Solutions } from "./components/sections/Solutions";
import { Workflow } from "./components/sections/Workflow";
import { FAQ } from "./components/sections/FAQ";
import { Contact } from "./components/sections/Contact";
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
        <Technology />
        <Solutions />
        <Workflow />
        <Demo />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
