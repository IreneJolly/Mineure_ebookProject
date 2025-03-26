"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic
import "../styles/global.css"; // Import du fichier CSS global
import { createClient } from '@supabase/supabase-js';

//let options = require("../public/livre.json");

const QuillEditor = dynamic(() => import("../component/QuillEditor"), {
  ssr: false, // This ensures the QuillEditor is only rendered on the client
});

export default function Home() {
  // Récupérer les variables d'environnement
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // URL de Supabase
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Clé anonyme de Supabase

  // Créer le client Supabase
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const [options, setOptions] = useState(null); // Initialiser options avec null  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Remplacez 'YourTitle' par le titre que vous souhaitez récupérer  
        const { data, error } = await supabase  
          .from('livres')
          .select('*')
          .eq('id', 1) // ou une autre condition pour identifier l'enregistrement  
          .single(); // Récupérer un seul enregistrement

        if (error) throw error;

        // Mettre à jour options avec le contenu récupéré  
        setOptions(data.content);
        setEditorContent(data.content[0]?.data); // Initialiser le contenu de l'éditeur avec le premier chapitre  
      } catch (error) {
        console.error("Erreur de chargement des données :", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectPage = (index) => {
    setCurrentIndex(index);
    setEditorContent(options.content[index]?.data); // Mettre à jour le contenu de l'éditeur  
  };

  const handleRunTests = async () => {
    try {
      if (!options) return; // Ne pas exécuter si options est null

      // Mettre à jour le contenu dans Supabase  
      const { data, error } = await supabase  
        .from('livres')
        .update({
          content: options.content,
        })
        .eq('id', 1); // Utilisez l'ID de l'enregistrement

      if (error) throw error;
      console.log('Données mises à jour avec succès:', data);
    } catch (error) {
      console.error("Erreur lors de l'exécution des tests :", error);
    }
  };

  const handleAddChapter = () => {
    if (options) {
      setOptions((prev) => ({
        ...prev,
        content: [...prev.content, { title: "Chapitre :", data: "" }],
      }));
    }
    handleRunTests();
  };

  const handleDeleteChapter = () => {
    if (options) {
      const updatedContent = options.content.filter((_, index) => index !== currentIndex);
      setOptions((prev) => ({ ...prev, content: updatedContent }));
      handleRunTests();
    }
  };

  const handleTitleChange = () => {
    const newTitle = prompt("Entrez le nouveau nom du Chapitre:", options.content[currentIndex]?.title);
    if (newTitle) {
      setOptions((prev) => {
        const updatedContent = [...prev.content];
        updatedContent[currentIndex].title = newTitle;
        return { ...prev, content: updatedContent };
      });
      handleRunTests();
    }
  };

  const handleContentChange = () => {
    if (options) {
      setOptions((prev) => {
        const updatedContent = [...prev.content];
        updatedContent[currentIndex].data = editorContent;
        return { ...prev, content: updatedContent };
      });
      
    }
    handleRunTests();
  };

  const handlePromptForTitleChange = () => {
    const newTitle = prompt("Entrez le nouveau titre du Livre:", options?.title);
    if (newTitle) {
      setOptions((prev) => ({ ...prev, title: newTitle }));
      handleRunTests();
    }
  };

  const handlePromptForAuthorChange = () => {
    const newAuthor = prompt("Entrez le nouveau nom de l'Auteur:", options?.author);
    if (newAuthor) {
      setOptions((prev) => ({ ...prev, author: newAuthor }));
      handleRunTests();
    }
  };

  if (!options) return <div>Loading...</div>;

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
