"use client";

import { useState } from "react";
import '../styles/global.css';

let options = require("../public/livre.json");

export default function Home() {
  const handleRunTests = async () => {
    try {
      const response = await fetch("../api/writeJson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options), 
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement du fichier JSON");
      }

      const response1 = await fetch("../api/run-test", {
        method: "POST",
      });

      alert("Fichier télécharger !");
    } catch (error) {
      console.error("Erreur lors de l'exécution des tests :", error);
      alert("Erreur lors de l'exécution des tests.");
    }
  };

  return (
    <header>
      <button onClick={handleRunTests}>
        Télécharger le Ebook
      </button>
      <h1>Créateur de ebook</h1>
      <div></div>
    </header>
  );
}