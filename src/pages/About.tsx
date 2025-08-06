import React from 'react';

const About: React.FC = () => {
  return (
    <div style={{ padding: '80px 20px', backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '3rem' }}>
          À PROPOS DE VISION<span style={{ color: '#ff7900' }}>X</span>
        </h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginTop: '20px' }}>
          VisioniX est une plateforme fictive de streaming conçue dans le cadre d’un projet d’intégration.
          Elle vise à simuler une expérience utilisateur moderne, immersive et intuitive, inspirée de plateformes populaires
          comme Netflix ou Disney+. Ce projet met en valeur les compétences en design UI/UX, en développement web et en
          création de contenu multimédia.
        </p>

        <h2 style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '2rem',
          marginTop: '60px',
          marginBottom: '30px'
        }}>
          NOTRE ÉQUIPE
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '120px',
              height: '160px',
              backgroundColor: '#1c1c1c',
              borderRadius: '10px',
              marginBottom: '10px'
            }} />
            <div style={{ fontWeight: 'bold' }}>Maxime Morissette</div>
            <div style={{ color: '#ccc' }}>UX/UI Designer</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '120px',
              height: '160px',
              backgroundColor: '#1c1c1c',
              borderRadius: '10px',
              marginBottom: '10px'
            }} />
            <div style={{ fontWeight: 'bold' }}>Xavier Arguin</div>
            <div style={{ color: '#ccc' }}>Développeur</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
