const chai = require('chai');
const chaiHttp = require('chai-http');
const { servidor } = require('../index');

chai.use(chaiHttp);

describe('Probando respuesta de servidor para metodo POST /comics', ()=> {
    it('Comprueba que respuesta metodo POST es codigo 200', (done) => {
        chai.request(servidor)
        .post('/comics')
        .send({
            "nombre":"Los Caballeros Del Zodiaco",
            "genero":"Shonen",
            "año":"1985",
            "autor":"Masami Kurumada"
        })
        .end((error,respuesta) => {
            chai.expect(respuesta).to.have.status(200);
            done();
        })
    })
})