"use client";

import { useState } from "react";
import '../styles/global.css';

let options = require("../public/livre.json");

export default function Home() {
  const [message, setMessage] = useState("");

  const handleRunTests = async () => {
    try {
      const response = await fetch("../api/writeJson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options), // Send the modified options in the request body  
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement du fichier JSON");
      }

      const response1 = await fetch("../api/run-test", {
        method: "POST",
      });

      setMessage("Fichier télécharger !");
    } catch (error) {
      console.error("Erreur lors de l'exécution des tests :", error);
      setMessage("Erreur lors de l'exécution des tests.");
    }
  };

  return (
    <header>
      <button onClick={handleRunTests} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Exécuter les Tests
      </button>
      <h1 className="flex text-center mx-4">Créateur de ebook</h1>
      <div></div>
    </header>
  );
}