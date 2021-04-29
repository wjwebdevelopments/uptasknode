const { Router } = require('express');
const router = Router();

const { body } = require('express-validator');

const { 
    proyectosHome,
    formularioProyecto,
    formularioEditar,
    nuevoProyecto,
    proyectoPorUrl,
    actualizarProyecto,
    eliminarProyecto 
} = require('../controllers/proyecto.controller');

const { agregarTarea } = require("../controllers/tarea.controller");

module.exports = () => {

    // Proyectos para la pagina de inicio
    router.get('/', proyectosHome);
    router.route('/nuevo-proyecto')
        .get(formularioProyecto)
        .post([
            body('nombre', 'El nombre es requerido').not().isEmpty().trim().escape()
        ],nuevoProyecto);

    router.route('/nuevo-proyecto/:id')
        .post([
            body('nombre', 'El nombre es requerido').not().isEmpty().trim().escape()
        ],actualizarProyecto);
    
    
    // Listar proyectos
    router.get('/proyectos/:url', proyectoPorUrl);
    router.get('/proyecto/editar/:id', formularioEditar);

    // Eliminar proyectp
    router.delete('/proyectos/:url', eliminarProyecto);

    // Tareas
    router.post('/proyectos/:url', agregarTarea);
 
    return router;
}