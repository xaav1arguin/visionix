import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Film from './pages/Film';
import Categorie from './pages/Categorie';
import Acteur from './pages/Acteur';
import Recherche from './pages/Recherche';
import About from './pages/About';
import 'bootstrap-icons/font/bootstrap-icons.css';


const App: React.FC = () => {
  return (
    <>
      <AppNavbar />
      <div style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/film/:id" element={<Film />} />
          <Route path="/categorie" element={<Categorie />} />
          <Route path="/acteur/:id" element={<Acteur />} />
          <Route path="/recherche" element={<Recherche />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
