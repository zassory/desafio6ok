const { response } = require('express');
const fs = require('fs/promises');

const escribirArchivo = async(comics, res = response) => {
    console.log(comics);    
    //await fs.writeFile('./datos/anime.json')
    await fs.writeFile('./datos/anime.json', JSON.stringify(comics,null,2), 'utf8', (error) => {
         if (error) {
             console.error('Error al ingresar el comics', error);
             return;
         }
         console.log('Datos escritos satisfactoriamente.');
    });
    res.statusCode = 200;
    res.write('Datos escritos satisfactoriamente.');
    res.end();
}

module.exports = escribirArchivo;