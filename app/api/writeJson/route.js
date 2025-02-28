// /api/writeJson/route.js  
import fs from 'fs/promises'; // Importer les promesses de fs  
import path from 'path';

export async function POST(req) {
  try {
    const options = await req.json(); // Obtenir les données JSON du corps de la requête

    // Définir le chemin vers le fichier JSON  
    const jsonFilePath = path.join(process.cwd(), 'public/livre.json');

    // Écrire l'objet mis à jour dans le fichier JSON  
    await fs.writeFile(jsonFilePath, JSON.stringify(options, null, 2)); // Utiliser la version promesse

    console.log('Fichier JSON mis à jour avec succès.');
    return new Response(JSON.stringify({ message: 'Fichier JSON mis à jour avec succès.' }), { status: 200 });
  } catch (error) {
    console.error('Erreur lors du traitement de la requête :', error);
    return new Response(JSON.stringify({ error: 'Erreur lors du traitement de la requête.' }), { status: 500 });
  }
}