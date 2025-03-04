"use client";

import { useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic  
import '../styles/global.css'; // Import du fichier CSS global

let options = require("../public/livre.json");

const QuillEditor = dynamic(() => import('../component/QuillEditor'), {
  ssr: false, // This ensures the QuillEditor is only rendered on the client  
});

export default function Home() {
  const [message, setMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0); // État pour suivre l'index actuel

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

      setMessage("Fichier téléchargé !");
    } catch (error) {
      console.error("Erreur lors de l'exécution des tests :", error);
      setMessage("Erreur lors de l'exécution des tests.");
    }
  };

  // Fonction pour gérer le changement de page  
  const handleSelectPage = (index) => {
    setCurrentIndex(index); // Met à jour l'index courant  
  };

  return (
    <div className="h-full">
      <div className="container">
        <div className="sidebar">
          <h2>Liste des Pages</h2>
          <ul>
            {options.content.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelectPage(index)} // Appelle la fonction lors du clic  
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="editor-container">
          <link rel="stylesheet" href="https://cdn.quilljs.com/1.3.6/quill.snow.css" />
          <h3>{options.content[currentIndex]?.title || "Sélectionnez un chapitre"}</h3> {/* Affiche le titre du chapitre sélectionné */}
          <QuillEditor
            initialContent={options.content[currentIndex]?.data || ""} // Passer le contenu initial  
          />
        </div>
      </div>
    </div>
  );
}
/* Idee : 
- Faire des boutons pour envoyer d'une page vers une autre
- authentification pour continuer la modification du fichier sauvegarder temporairement sur supabase
- voir le saut de page
- voir si on peut écrire en markdown / choix html ou markdown
- voir peut-être des idées pour faire un cahier genre devoir de vacances
*/