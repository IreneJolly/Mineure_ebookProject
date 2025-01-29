// app/api/run-test/route.js  
import { exec } from 'child_process';

export async function POST(req) {
  return new Promise((resolve, reject) => {
    exec('npm run test', (error, stdout, stderr) => {
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