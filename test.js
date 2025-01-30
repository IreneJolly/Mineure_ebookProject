const Epub = require("epub-gen");

let options = require("./public/livre.json")

new Epub(options).promise.then(() => console.log('Done'));
