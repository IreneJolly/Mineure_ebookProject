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
        });
        /*const myButton = new QuillToolbarButton({
            icon: `<svg viewBox="0 0 18 18"> <path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"></path></svg>`,
          });
  
          myButton.onClick = function (quill) {
            const { index, length } = quill.selection.savedRange;
            const selectedText = quill.getText(index, length);
            const newText = selectedText.toUpperCase();
            quill.deleteText(index, length);
            quill.insertText(index, newText);
            quill.setSelection(index, newText.length);
          };
          myButton.attach(quill);
        
         const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
    // Créer l'URL  
    const url = `${index}_${formattedTitle}.xhtml`;
    
    // Insérer le lien dans l'éditeur  
    const range = quill.getSelection();
    quill.insertText(range.index, title, 'link', url); */

        quillRef.current.on("text-change", () => {
          onChange(quillRef.current.root.innerHTML);
        });
      }
      quillRef.current.clipboard.dangerouslyPasteHTML(initialContent);
    }
  }, [initialContent, index, onChange]);

  return (
    <div id="editor-container">
      <div
        ref={editorRef}
        style={{ border: "1px solid #ccc", height: "60vh" }}
      ></div>
    </div>
  );
};

export default QuillEditor;
