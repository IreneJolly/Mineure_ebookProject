const path = require("path");
const os = require("os");
const Epub = require("epub-gen");
const { createClient } = require("@supabase/supabase-js");

// Récupérer les arguments de la ligne de commande  
const args = process.argv.slice(2);
let title = "";
let author = "";

// Parcourir les arguments pour trouver les valeurs des paramètres  
args.forEach(arg => {
  if (arg.startsWith("--title=")) {
    title = arg.split("=")[1];
  } else if (arg.startsWith("--author=")) {
    author = arg.split("=")[1];
  }
});

// Afficher les valeurs récupérées  
console.log("Titre:", title);
console.log("Auteur:", author);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Utilisez process.env pour accéder aux variables d'environnement
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Utilisez process.env pour accéder aux variables d'environnement

// Créer le client Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function generateEbook() {
  try {
    const accentMap = {
      à: "a",
      â: "a",
      ä: "a",
      á: "a",
      ã: "a",
      å: "a",
      ç: "c",
      è: "e",
      ê: "e",
      ë: "e",
      é: "e",
      î: "i",
      ï: "i",
      í: "i",
      ô: "o",
      ö: "o",
      ó: "o",
      õ: "o",
      ø: "o",
      ù: "u",
      û: "u",
      ü: "u",
      ú: "u",
      ý: "y",
      ÿ: "y",
      À: "a",
      Â: "a",
      Ä: "a",
      Á: "a",
      Ã: "a",
      Å: "a",
      Ç: "c",
      È: "e",
      Ê: "e",
      Ë: "e",
      É: "e",
      Î: "i",
      Ï: "i",
      Í: "i",
      Ô: "o",
      Ö: "o",
      Ó: "o",
      Õ: "o",
      Ø: "o",
      Ù: "u",
      Û: "u",
      Ü: "u",
      Ú: "u",
      Ý: "y",
      Ÿ: "y",
    };

    let filePath = "/" + title + "_" + author + ".json"; // Remplacez par le chemin désiré dans votre Bucket
    let fileDownload = "/" + title + "_" + author + ".epub";

    fileDownload = fileDownload
      .split("")
      .map((char) => accentMap[char] || char)
      .join("");

    fileDownload = fileDownload.replace(/\s+/g, "_").replace(/[<>:"\/\\|?*]/g, "");

    // Remplacer les accents
    filePath = filePath
      .split("")
      .map((char) => accentMap[char] || char)
      .join("");

    filePath = filePath.replace(/\s+/g, "_").replace(/[<>:"\/\\|?*]/g, "");

    // Récupérer le fichier
    const { data, error } = await supabase.storage
      .from("livre") 
      .download(filePath);

    if (error) {
      console.error("Erreur lors de la récupération du fichier:", error);
      return;
    }

    // Lire le contenu du fichier JSON sous forme de texte
    const text = await data.text();
    const options = JSON.parse(text); // Convertir le texte en objet JSON

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
    fileDownload = path.join(downloadDir, fileDownload);

    // Modifier les options pour spécifier le chemin de destination
    options.output = fileDownload;

    // Générer l'ebook
    await new Epub(options).promise; // Assurez-vous d'attendre la promesse

    console.log("Ebook téléchargé dans :", fileDownload);
    console.log("Téléchargement effectué !");
  } catch (err) {
    console.error("Erreur lors de la génération de l'ebook :", err);
  }
}

// Appeler la fonction pour générer l'ebook
generateEbook();
