const fs = require('fs/promises');

const leerArchivos = async() => {
    const archivoOriginal = await fs.readFile('./datos/anime.json','utf8');
    const datosOriginales = await JSON.parse(archivoOriginal);
    
    return datosOriginales;
}

module.exports = leerArchivos;