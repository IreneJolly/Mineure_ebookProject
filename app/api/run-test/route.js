// /api/run-test/route.js  
import { exec } from 'child_process';

export async function POST(req) {
  // Récupérer les données JSON de la requête  
  const { title, author } = await req.json();

  return new Promise((resolve, reject) => {
    // Construire la commande avec le titre et l'auteur  
    const command = `npm run test -- --title="${title}" --author="${author}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erreur: ${stderr}`);
        return reject(new Response(JSON.stringify({ error: 'Erreur lors de l\'exécution du test.' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }));
      }
      console.log(`Résultat: ${stdout}`);
      resolve(new Response(JSON.stringify({ message: 'Tests exécutés avec succès!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }));
    });
  });
}