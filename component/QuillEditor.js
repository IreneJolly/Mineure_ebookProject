import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";

let options = require("../public/livre.json");

const QuillEditor = ({ initialContent, index }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!quillRef.current) {
        quillRef.current = new Quill(editorRef.current, {
          theme: "snow",
          modules: {
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              ["image", "code-block"],
              [{ list: "ordered" }, { list: "bullet" }],
            ],
          },
        });

        quillRef.current.on("text-change", () => {
          console.log(options.content[index].data);
          options.content[index].data = quillRef.current.root.innerHTML;
          handleRunTests();
        });
      }

      quillRef.current.clipboard.dangerouslyPasteHTML(initialContent);
    }
  }, [initialContent, index]);

  return (
    <div>
      <div
        ref={editorRef}
        style={{ height: "400px", border: "1px solid #ccc" }}
      ></div>
    </div>
  );
};

export default QuillEditor;
