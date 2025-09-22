import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { AdminProvider } from './contexts/AdminContext';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Gallery from './components/Gallery/Gallery';
import FAQ from './components/FAQ/FAQ';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './styles/globals.css';

function App() {
  return (
    <LanguageProvider>
      <AdminProvider>
        <div className="App">
          <Header />
          <main>
            <Hero />
            <About />
            <Gallery />
            <FAQ />
            <Contact />
          </main>
          <Footer />
        </div>
      </AdminProvider>
    </LanguageProvider>
  );
}

export default App;