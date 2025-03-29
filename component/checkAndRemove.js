import { createClient } from "@supabase/supabase-js";

// Récupérer les variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // URL de Supabase
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Clé anonyme de Supabase

// Créer le client Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function fileExists(bucketName, filePath) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return error;
}

async function checkAndRemoveFile(bucketName, filePath) {
  console.log("Vérification de l'existence du fichier:", filePath);
  const { data, error } = await supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);
  console.log("Test : ", data);

  const exist = await fileExists(bucketName, filePath);

  if (!exist) {
    // Supprimer le fichier existant s'il existe
    const { error: deleteError } = await supabase.storage
      .from(bucketName) // Remplacez par le nom de votre Bucket
      .remove([filePath]);

    new Promise((resolve) => setTimeout(resolve, 40 * 1000));
    const { data, error } = await supabase.storage.from(bucketName).list();
    console.log("Test SUPPRESSION : ", data);

    if (await fileExists(bucketName, filePath)) {
      console.error("Erreur lors de la suppression du fichier:", deleteError);
    } else {
      console.log("Fichier supprimé avec succès.");
    }
  } else {
    console.log("Le fichier n'existe pas, aucune action nécessaire.");
  }
}

export default checkAndRemoveFile;
