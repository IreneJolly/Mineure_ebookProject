const path = require('path');
const os = require('os');
const Epub = require("epub-gen");

let options = require("./public/livre.json");

// Déterminez le dossier de téléchargement selon le système d'exploitation  
let downloadDir;
if (os.platform() === 'win32') {
    downloadDir = path.join(process.env.USERPROFILE, 'Downloads'); // Windows  
} else if (os.platform() === 'darwin') {
    downloadDir = path.join(process.env.HOME, 'Downloads'); // macOS  
} else {
    downloadDir = path.join(process.env.HOME, 'Downloads'); // Linux et autres  
}

// Nom du fichier  
const fileName = options.title + ".epub";
const filePath = path.join(downloadDir, fileName);

// Modifier les options pour spécifier le chemin de destination  
options.output = filePath;

new Epub(options).promise  
    .then(() => {
        console.log('Ebook téléchargé dans :', filePath);
        // Afficher un message indiquant que le téléchargement est terminé  
        console.log("Téléchargement effectué !");
    })
    .catch(err => console.error('Erreur lors du téléchargement :', err));