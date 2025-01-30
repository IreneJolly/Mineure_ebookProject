// app/page.js  
'use client';

import { useState } from 'react';
let options = require("../public/livre.json");
const fs = require('fs');
const path = require('path');

export default function Home() {
  const [message, setMessage] = useState('');

  const handleRunTests = async () => {
    options.output = "./vhjbh.epub";
    const jsonFilePath = path.join(__dirname, '../public/livre.json');
    try {

      const response = await fetch("/api/writeJson", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options), // Send the modified options in the request body  
      });

      const response1 = await fetch('/api/run-test', {
        method: 'POST',
      });
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

/*
// app/page.js  
"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  const handleRunTests = async () => {
    let options = require("../public/livre.json");

    // Modify your options  
    options.output = "./vhjbh.epub";

    try {
      const response = await fetch("/api/writeJson", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options), // Send the modified options in the request body  
      });

      // Check if the response is OK  
      if (!response.ok) {
        const errorText = await response.text(); // Get the response as text  
        console.error("Response error:", errorText); // Log the error for debugging  
        setMessage(`Error: ${response.status} - ${response.statusText}`);
        return;
      }

      const result = await response.json(); // Parse the JSON response

      setMessage(result.message);
    } catch (error) {
      console.error("Erreur lors de l'exécution des tests :", error);
      setMessage("Erreur lors de l'exécution des tests.");
    }
  };

  return (
    <div>
      <h1>Exécuteur de Tests</h1>
      <button onClick={handleRunTests}>Exécuter les Tests</button>
      {message && <p>{message}</p>}
    </div>
  );
}*/