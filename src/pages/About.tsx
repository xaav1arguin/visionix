import React, { useEffect } from 'react';
import maxImg from '../assets/max.png';
import xavImg from '../assets/xav.png';

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
          {/* Maxime */}
          <div style={{ textAlign: 'center' }}>
            <img
              src={maxImg}
              alt="Maxime Morissette"
              style={{
                width: '220px',
                height: '260px',
                borderRadius: '10px',
                objectFit: 'cover',
                marginBottom: '10px'
              }}
            />
            <div style={{ fontWeight: 'bold' }}>Maxime Morissette</div>
            <div style={{ color: '#ccc' }}>UX/UI Designer</div>
          </div>

          {/* Xavier */}
          <div style={{ textAlign: 'center' }}>
            <img
              src={xavImg}
              alt="Xavier Arguin"
              style={{
                width: '220px',
                height: '260px',
                borderRadius: '10px',
                objectFit: 'cover',
                marginBottom: '10px'
              }}
            />
            <div style={{ fontWeight: 'bold' }}>Xavier Arguin</div>
            <div style={{ color: '#ccc' }}>Développeur / Programmeur</div>
          </div>
        </div>

        {/* Mention IA */}
        <p style={{
          fontSize: '0.95rem',
          color: '#888',
          marginTop: '40px',
          maxWidth: '700px',
          marginInline: 'auto',
          fontStyle: 'italic'
        }}>
          Les images des membres de l’équipe présentées ci-dessus ont été générées à l’aide d’une intelligence artificielle.
          Elles ont été créées dans un souci de confidentialité et de protection de notre identité personnelle.
        </p>
      </div>
    </div>
  );
};

export default About;