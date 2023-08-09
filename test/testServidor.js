const chai = require('chai');
const chaiHttp = require('chai-http');

const { servidor } = require('../index');

chai.use(chaiHttp);

describe('Probando respuesta de servidor', ()=> {
    it('Comprueba que respuesta de servidor es el string "Respuesta ok desde servidor"', ()=> {
        chai.request(servidor).get('/comics').end((error,respuesta) => {
            chai.assert.equal(respuesta.text,'Respuesta ok desde servidor',"La respuesta no ha sido la esperada");
            chai.assert.equal(respuesta.status,200, "La respuesta no ha sido la esperada");
        });
    });
})