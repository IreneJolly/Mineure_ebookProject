// app/page.js  
'use client';

import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  const handleRunTests = async () => {
    try {
      const response = await fetch('/api/run-test', {
        method: 'POST',
      });
      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      console.error("Erreur lors de l'exécution des tests :", error);
      setMessage('Erreur lors de l\'exécution des tests.');
    }
  };

  return (
    <div>
      <h1>Exécuteur de Tests</h1>
      <button onClick={handleRunTests}>Exécuter les Tests</button>
      {message && <p>{message}</p>}
    </div>
  );
}