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
  const [editorContent, setEditorContent] = useState(
    options.content[currentIndex]?.data
  );

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
    options.content.splice(currentIndex, 1);
    handleRunTests();
  };

  const handleTitleChange = () => {
    const newTitle = document.getElementById("title").value; // Obtenir le titre depuis l'input
    options.content[currentIndex].title = newTitle;
    handleRunTests();
  };

  const handleContentChange = () => {
    options.content[currentIndex].data = editorContent;
    handleRunTests();
  };

  const handlePromptForTitleChange = () => {
    const newTitle = prompt("Entrez le nouveau titre du Livre:", options.title);
    if (newTitle !== null && newTitle.trim() !== "") {
      options.title = newTitle;
      handleRunTests();
    }
  };

  const handlePromptForAuthorChange = () => {
    const newTitle = prompt("Entrez le nouveau titre du Livre:", options.author);
    if (newTitle !== null && newTitle.trim() !== "") {
      options.author = newTitle;
      handleRunTests();
    }
  };

  return (
    <div className="h-full">
      <div className="container">
        <div className="sidebar">
          <h2>
            {options.title} de {options.author}
          </h2>
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
            className="button-spacing"
            style={{ fontSize: "24px", cursor: "pointer" }}
          >
            +
          </button>
          <button
            onClick={handleDeleteChapter}
            className="button-spacing"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <img
              src="delete.png"
              alt="Supprimer"
              style={{ width: "24px", height: "24px" }}
            />
          </button>
          <button
            onClick={handlePromptForTitleChange}
            className="button-spacing"
          >
            Changer le titre du Livre
          </button>
          <button
            onClick={handlePromptForAuthorChange}
            className="button-spacing"
          >
            Changer l'auteur du Livre
          </button>{" "}
          {/* Nouveau bouton */}
        </div>
        <div className="editor-container">
          <link
            rel="stylesheet"
            href="https://cdn.quilljs.com/1.3.6/quill.snow.css"
          />
          <h3>
            {options.content[currentIndex]?.title || "Sélectionnez un chapitre"}
          </h3>
          <input
            type="text"
            id="title"
            defaultValue={
              options.content[currentIndex]?.title || "Sélectionnez un chapitre"
            }
          />
          <button onClick={handleTitleChange} className="button-spacing">
            Modifier le titre du chapitre
          </button>
          <button onClick={handleContentChange} className="button-spacing">
            Sauvegarder ce chapitre
          </button>
          <QuillEditor
            initialContent={options.content[currentIndex]?.data || ""}
            onChange={setEditorContent}
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
