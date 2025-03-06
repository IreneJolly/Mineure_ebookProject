import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const QuillEditor = ({ initialContent, index, onChange }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!quillRef.current) {
        quillRef.current = new Quill(editorRef.current, {
          theme: "snow",
          modules: {
            toolbar: {
              container: [
                [{ header: [1, 2, false] }],
                [{ color: [] }],
                ["bold", "italic", "underline", "strike"],
                ["link"],
                [{ list: "ordered" }],
              ],
            },
          },
          customLinkButton: {
            addLink: () => new CustomLinkButton(quillRef.current, {}),
          },
        });

        quillRef.current.on("text-change", () => {
          onChange(quillRef.current.root.innerHTML);
        });
      }
      quillRef.current.clipboard.dangerouslyPasteHTML(initialContent);
    }
  }, [initialContent, index, onChange]);

  /*
  // Fonction pour ajouter un lien personnalisé  
  const addCustomLink = () => {
    const chapterName = prompt("Entrez le nom du chapitre");

    if (index && chapterName) {
      // Transformer le nom du chapitre en format correct  
      const formattedName = chapterName  
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Supprimer les caractères spéciaux  
        .replace(/\s+/g, '-') // Remplacer les espaces par des -
        .trim();

      const link = `${index}_${formattedName}.xhtml`;

      const range = quillRef.current.getSelection();
      if (range) {
        quillRef.current.insertText(range.index, chapterName, { link: link });
      }
    }
  };*/

  // Utiliser un autre useEffect pour ajouter le bouton après l'initialisation de Quill
  /*useEffect(() => {
    const toolbar = editorRef.current.querySelector('.ql-toolbar');
    if (toolbar) {
      const customLinkButton = document.createElement('button');
      customLinkButton.innerHTML = 'Ajouter Lien Chapitre';
      customLinkButton.classList.add('ql-custom-link');
      customLinkButton.addEventListener('click', addCustomLink);
      toolbar.appendChild(customLinkButton);
    }
  }, []); // Exécuter ce useEffect une seule fois après le premier rendu*/

  return (
    <div id="editor-container">
      <div ref={editorRef} style={{ border: "1px solid #ccc" , height: "60vh"}}></div>
    </div>
  );
};

export default QuillEditor;
