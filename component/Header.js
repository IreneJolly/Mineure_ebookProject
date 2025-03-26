"use client";

import { useEffect, useState } from "react";
import "../styles/global.css"; // Import du fichier CSS global
import { createClient } from '@supabase/supabase-js';
import "../styles/global.css";

export default function Home() {
  // Récupérer les variables d'environnement
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // URL de Supabase
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Clé anonyme de Supabase

  // Créer le client Supabase
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const [options, setOptions] = useState(); // Initialiser options avec null

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Remplacez 'YourTitle' par le titre que vous souhaitez récupérer
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
      <button onClick={handleRunTests}>Télécharger le Ebook</button>
      <h1>Créateur de ebook</h1>
      <div></div>
    </header>
  );
}
