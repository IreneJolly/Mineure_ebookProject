// app/api/writeJson/route.js  
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const options = await req.json(); // Get the JSON data from the request body

    // Define the path to your JSON file  
    const jsonFilePath = path.join(process.cwd(), 'public/livre.json');

    // Write the updated object back to the JSON file  
    fs.writeFile(jsonFilePath, JSON.stringify(options, null, 2), (err) => {
      if (err) {
        console.error('Error writing the file:', err);
        return new Response(JSON.stringify({ error: 'Error writing the file' }), { status: 500 });
      }
      console.log('JSON file updated successfully.');
      return new Response(JSON.stringify({ message: 'JSON file updated successfully.' }), { status: 200 });
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: 'Error processing request.' }), { status: 500 });
  }
}