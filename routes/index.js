const { Router } = require('express');
const router = Router();

const { body } = require('express-validator');

const { 
    proyectosHome,
    formularioProyecto,
    nuevoProyecto,
    getNosotros 
} = require('../controllers');

module.exports = () => {

    router.get('/', proyectosHome);

    router.route('/nuevo-proyecto')
        .get(formularioProyecto)
        .post([
            body('nombre', 'El nombre es requerido').not().isEmpty().trim().escape()
        ],nuevoProyecto);

    router.get('/nosotros', getNosotros);
 
    return router;
}