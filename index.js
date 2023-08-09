const http = require('http');
const fs = require('fs/promises');
const { request , response } = require('express');
const { v4: uuidv4 } = require('uuid');

const obtenerArchivos = require('./controllers/obtenerArchivos');
const escribirArchivo = require('./controllers/escribirArchivo');
const leerArchivos = require('./controllers/leerArchivos');

const servidor = http.createServer( async(req = request,res = response) => {

    const { searchParams , pathname } = new URL(req.url,`http://${req.headers.host}`);
    const params = new URLSearchParams(searchParams);
    
    res.statusCode = 200;
    res.write("Respuesta ok desde servidor");
    res.end();

    switch (pathname) {
        case '/comics':
            switch (req.method) {
                case 'GET':
                    try {
                        await obtenerArchivos(req, res);
                    } catch (error) {                        
                        console.log(error);
                    }
                    break;
                case 'POST':
                    try {
                        const comics = await obtenerArchivos(req, res);
                        const id = uuidv4();
                        let datosComics;

                        req.on('data', (data) => {
                            datosComics = JSON.parse(data);
                        });

                        req.on('end', async () => {
                            comics[id] = datosComics;
                            await escribirArchivo(comics, res);
                        });
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                case 'PUT':
                    try {
                        const id = params.get('id');
                        const comics = await leerArchivos();
                        let datosParaModificar;

                        req.on('data', (datos) => {
                            datosParaModificar = JSON.parse(datos);
                        });

                        req.on('end', async () => {
                            const comicOriginal = comics[id];
                            const comicActualizado = { ...comicOriginal, ...datosParaModificar };
                            comics[id] = comicActualizado;

                            escribirArchivo(comics,res);
                        });
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                case 'DELETE':
                    try {
                        const comics = await leerArchivos();
                        const id = params.get('id');
                        delete comics[id];
                        await escribirArchivo(comics, res);
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                default:
                    res.writeHead(405, { 'Content-Type': 'text/plain' });
                    res.end('Method Not Allowed');
            }
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
    }    
});

servidor.listen(3000, () => {
    console.log('Conectado correctamente al puerto 3000');
});

module.exports = { servidor };