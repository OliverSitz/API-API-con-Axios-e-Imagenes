import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'HgAiK4TazmIs70wAhQFTP9AtC7EGEPPjtVZF5PULAglbLXwCd6hyS4rX';

function App() {
  const [imageUrl, setImageUrl] = useState('');

  const getRandomImage = async () => {
    try {
      const response = await axios.get('https://api.pexels.com/v1/search', {
        headers: {
          Authorization: API_KEY,
        },
        params: {
          query: 'nature',
          per_page: 1,
          page: Math.floor(Math.random() * 100) + 1,
        },
      });

      if (response.data.photos.length > 0) {
        const randomPhoto = response.data.photos[0].src.large;
        setImageUrl(randomPhoto);
      }
    } catch (error) {
      console.error('Error al cargar la imagen de Pexels:', error);
    }
  };

  useEffect(() => {
    getRandomImage();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Random Image</h1>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Random from Pexels"
          style={{ width: '400px', height: 'auto', borderRadius: '20px' }}
        />
      ) : (
        <p>Cargando imagen...</p>
      )}
      <br />
      <button
        onClick={getRandomImage}
        style={{
          padding: '10px 20px',
          marginTop: '20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Cargar nueva imagen
      </button>
    </div>
  );
}

export default App;