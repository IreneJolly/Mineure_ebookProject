// app/page.js
"use client";

import { useState } from "react";
import { Editor } from '@tinymce/tinymce-react';

let options = require("../public/livre.json");
const fs = require("fs");
const path = require("path");
//const screen = window.innerHeight;

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
    <div className="h-full">
      <button onClick={handleRunTests}>Exécuter les Tests</button>
      {message && <p>{message}</p>}
      <div className="h-full">
        <Editor
          apiKey="mqrn10qzo5ozw8d2g0v942iz34s46nd6zq4c71dbyywjkuvp"
          init={{
            height: 500,
            menubar: false,
            toolbar:
              "undo redo | styles | bold italic | alignleft aligncenter alignright | bullist numlist outdent | link image",
          }}
          onEditorChange={(content) => (options.content[0].data = content)}
        />
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