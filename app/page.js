"use client";

import { useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic
import "../styles/global.css"; // Import du fichier CSS global

let options = require("../public/livre.json");

const QuillEditor = dynamic(() => import("../component/QuillEditor"), {
  ssr: false, // This ensures the QuillEditor is only rendered on the client
});

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0); // État pour suivre l'index actuel

  const handleSelectPage = (index) => {
    setCurrentIndex(index);
  };

  const handleRunTests = async () => {
    try {
      const response = await fetch("../api/writeJson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options), // Send the modified options in the request body
      });
    } catch (error) {
      console.error("Erreur lors de l'exécution des tests :", error);
    }
  };

  const handleAddChapter = () => {
    options.content.push({ title: "Chapitre :", data: "" });
    handleRunTests();
  };

  const handleDeleteChapter = () => {
    console.log(currentIndex);
    options.content.splice(currentIndex, 1);
    console.log(options.content);
    handleRunTests();
  };

  const handleTitleChange = () => {
    options.content[currentIndex].title = document.getElementById("title").value;
    document.getElementById("title").value = options.content[currentIndex].title;
    handleRunTests();
  };

  return (
    <div className="h-full">
      <div className="container">
        <div className="sidebar">
          <h2>Liste des Chapitres</h2>
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
          <button
            onClick={handleAddChapter}
            style={{ fontSize: "24px", cursor: "pointer" }}
          >
            +
          </button>
          <button
            onClick={handleDeleteChapter}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <img
              src="delete.png"
              alt="Supprimer"
              style={{ width: "24px", height: "24px" }}
            />
          </button>
        </div>
        <div className="editor-container">
          <link
            rel="stylesheet"
            href="https://cdn.quilljs.com/1.3.6/quill.snow.css"
          />
          <h3>{options.content[currentIndex]?.title || "Sélectionnez un chapitre"}</h3>
          <input
            type="text"
            id="title"
            defaultValue={options.content[currentIndex].title}
          />
          <button onClick={handleTitleChange}>Modifier</button>
          <QuillEditor
            initialContent={options.content[currentIndex]?.data || ""}
            index={currentIndex}
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
