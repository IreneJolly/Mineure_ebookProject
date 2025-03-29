function getFilePath(options) {
  try {
    // Spécifiez le chemin où vous souhaitez enregistrer le fichier JSON dans Supabase
    let filePath = "/" + options.title + "_" + options.author + ".json"; // Remplacez par le chemin désiré dans votre Bucket

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

    // Remplacer les accents
    filePath = filePath
      .split("")
      .map((char) => accentMap[char] || char)
      .join("");

    // Remplacer les espaces par des underscores et enlever les caractères non valides
    filePath = filePath.replace(/\s+/g, "_").replace(/[<>:"\/\\|?*]/g, "");

    return filePath;
  } catch (error) {
    console.error("Erreur de création du nom :", error);
    // Vous pouvez également retourner une valeur par défaut si nécessaire
    return null;
  }
}

export default getFilePath;
