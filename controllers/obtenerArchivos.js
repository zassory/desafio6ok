const leerArchivos = require('../controllers/leerArchivos');

const obtenerArchivos = async(req,res)=> {
    const comics = await leerArchivos();
    res.statusCode = 200;
    res.write(JSON.stringify(comics,null,2));
    res.end();
    return comics;
}

module.exports = obtenerArchivos;