const Proyecto = require('../models/proyecto');
const Tarea = require('../models/tarea');
const { response } = require('express');

/**
 * @path: /proyectos/:url
 * @method: POST
 */
exports.agregarTarea = async (req, res = response, next) => {

    const proyecto = await Proyecto.findOne({ where: { url: req.params.url } });

    // Leer el valor del input
    const { tarea } = req.body;

    // El estado: 0 -> Incompleto y ID del proyecto
    const estado = 0;
    const ProyectoId = proyecto.id;

    // Insertar en la base de datos y redireccionar
    const resultado = await Tarea.create({ tarea, estado, ProyectoId });

    if ( !resultado ) return next();

    // Redireccionar
    res.redirect(`/proyectos/${req.params.url}`);
}
