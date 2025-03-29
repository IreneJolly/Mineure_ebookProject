"use client";

import { useEffect, useState } from "react";
import "../styles/global.css"; // Import du fichier CSS global
import { createClient } from "@supabase/supabase-js";
import getFilePath from "./getFilePath";
import checkAndRemoveFile from "./checkAndRemove";

export default function Header() {
  // Récupérer les variables d'environnement
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // URL de Supabase
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Clé anonyme de Supabase

  // Créer le client Supabase
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const [options, setOptions] = useState(); // Initialiser options avec null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("livres")
          .select("*")
          .eq("id", 1) // ou une autre condition pour identifier l'enregistrement
          .single(); // Récupérer un seul enregistrement

        if (error) throw error;

        // Mettre à jour options avec le contenu récupéré
        setOptions(data.content);
      } catch (error) {
        console.error("Erreur de chargement des données :", error);
      }
    };

    fetchData();
  }, []);

  const handleRunTests = async () => {
    try {
      // Obtenez les données à chaque fois que vous cliquez sur le bouton
      const { data, error } = await supabase
        .from("livres")
        .select("*")
        .eq("id", 1) // ou une autre condition pour identifier l'enregistrement
        .single(); // Récupérer un seul enregistrement

      if (error) throw error;

      await new Promise((resolve) => setTimeout(resolve, 4000));

      // Utilisez data.content directement au lieu de setOptions ici
      const filePath = getFilePath(data.content);

      const bucketName = "livre";

      // Vérifiez l'existence et supprimez le fichier si nécessaire
      await checkAndRemoveFile(bucketName, filePath);

      // Convertir l'objet options en chaîne JSON
      const jsonOptions = JSON.stringify(data.content, null, 2); // Utilisez data.content ici

      // Télécharger le fichier JSON dans Supabase
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(
          filePath,
          new Blob([jsonOptions], { type: "application/json" }),
          {
            contentType: "application/json",
          }
        );

      if (uploadError) {
        throw new Error(
          "Erreur lors de l'enregistrement du fichier JSON: " +
            uploadError.message
        );
      }

      console.log(
        "Fichier JSON enregistré avec succès dans le stockage Supabase :",
        uploadData.Key
      );

      // Envoyer les données à votre API
      const response1 = await fetch("../api/run-test", {
        method: "POST",
        body: JSON.stringify({
          title: data.content.title, // Inclure le titre
          author: data.content.author, // Inclure l'auteur
        }),
      });

      alert("Fichier télécharger !");
    } catch (error) {
      console.error("Erreur lors de l'exécution des tests :", error);
      alert("Erreur lors de l'exécution des tests.");
    }
  };

  const clear = async () => {
    try {
      const options = {
        title: "Titre",
        author: "Author",
        output: "",
        content: [
          {
            data: '',
            title: "Chapitre I : ",
          },
        ],
      };

      // Mettre à jour le contenu dans Supabase
      const { data, error } = await supabase
        .from("livres")
        .update({
          content: options,
        })
        .eq("id", 1); // Utilisez l'ID de l'enregistrement

      if (error) throw error;

      window.location.reload(); // Recharger la page

    } catch (error) {
      console.error("Erreur lors de l'exécution des tests :", error);
    }
  };

  return (
    <header>
      <button onClick={handleRunTests}>Télécharger le Ebook</button>
      <h1>Créateur de ebook</h1>
      <button onClick={clear}>Créer un nouveau eBook</button>
    </header>
  );
}
