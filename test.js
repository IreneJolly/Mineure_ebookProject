const path = require("path");
const os = require("os");
const Epub = require("epub-gen");
const { createClient } = require("@supabase/supabase-js");

// Configuration de votre Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Remplacez par votre URL Supabase
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Remplacez par votre clé anonyme

// Créer le client Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function fetchData() {
  const { data, error } = await supabase
    .from("livres")
    .select("*")
    .eq("id", 1) // ou une autre condition pour identifier l'enregistrement
    .single();

  if (error) {
    console.error("Erreur lors de la récupération des données:", error);
    return; // Quittez si une erreur se produit
  }

  options = data.content; // Modifiez ceci selon vos besoins

  // Déterminez le dossier de téléchargement selon le système d'exploitation
  let downloadDir;
  if (os.platform() === "win32") {
    downloadDir = path.join(process.env.USERPROFILE, "Downloads"); // Windows
  } else if (os.platform() === "darwin") {
    downloadDir = path.join(process.env.HOME, "Downloads"); // macOS
  } else {
    downloadDir = path.join(process.env.HOME, "Downloads"); // Linux et autres
  }

  // Nom du fichier
  const fileName = options.title + ".epub";
  const filePath = path.join(downloadDir, fileName);

  // Modifier les options pour spécifier le chemin de destination
  options.output = filePath;

  // Générer l'ebook
  new Epub(options).promise
    .then(() => {
      console.log("Ebook téléchargé dans :", filePath);
      console.log("Téléchargement effectué !");
    })
    .catch((err) => console.error("Erreur lors du téléchargement :", err));
}

// Appeler la fonction pour récupérer des données
fetchData();
