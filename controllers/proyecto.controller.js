const Proyecto = require('../models/proyecto');
const Tarea = require('../models/tarea');
const { response, request } = require('express');

exports.proyectosHome = async (req, res) => {

    const proyectos = await Proyecto.findAll();

    res.render('index', {
        nombrePagina: 'proyectos',
        proyectos
    });

}

exports.formularioProyecto = async (req, res) => {

    const proyectos = await Proyecto.findAll();

    res.render('nuevoProyecto', {
        nombrePagina: 'nuevo proyecto',
        proyectos
    });
}

exports.formularioEditar = async (req, res) => {

    const [proyecto, proyectos] = await Promise.all([
        Proyecto.findOne({ where: { id: req.params.id } }),
        Proyecto.findAll()
    ]);

    res.render('nuevoProyecto', {
        nombrePagina: 'editar proyecto',
        proyecto,
        proyectos
    });
}

exports.nuevoProyecto = async (req, res) => {

    const proyectos = await Proyecto.findAll();

    const { nombre } = req.body;
    let errores = [];

    if ( !nombre ) {
        errores = [
            ...errores,
            {texto: 'es requerido un nombre para el proyecto', tipo: 'campo vacio'}
        ];
    }

    if ( errores.length > 0 ) {
        res.render('nuevoProyecto', {
            nombrePagina: 'nuevo proyecto',
            errores,
            proyectos
        });
    }else {

        // TODO: No hay errores, insertar en la base de datos
        await Proyecto.create({ nombre });
        res.redirect('/');

    }

}

/**
 * @path: /proyectos/:url
 * @method: GET
 * @params: { url }
 */
exports.proyectoPorUrl = async (req, res, next) => {

    const proyectosDB = Proyecto.findAll(); // Mostrar proyectos en el sidebar
    const proyectoDB = Proyecto.findOne({ where: { url: req.params.url } }); // Mostrar proyecto en la vista

    const [ proyectos, proyecto ] = await Promise.all([ proyectosDB, proyectoDB ]);

    if ( !proyecto ) return next(); // Error handler si no hay proyecto

    // consultar tareas del proyecto actual en la vista
    const tareas = await Tarea.findAll({
      where: {
        ProyectoId: proyecto.id
      }
    });

    res.render('tareas', {
        nombrePagina: 'tareas del proyecto',
        proyecto,
        proyectos,
        tareas
    })
}

exports.actualizarProyecto = async (req, res) => {

    const proyectos = await Proyecto.findAll();

    const { nombre } = req.body;
    let errores = [];

    if ( !nombre ) {
        errores = [
            ...errores,
            {texto: 'es requerido un nombre para el proyecto', tipo: 'campo vacio'}
        ];
    }

    if ( errores.length > 0 ) {
        res.render('nuevoProyecto', {
            nombrePagina: 'nuevo proyecto',
            errores,
            proyectos
        });
    }else {

        // TODO: No hay errores, insertar en la base de datos
        await Proyecto.update({ nombre }, { where: { id: req.params.id } } );
        res.redirect('/');

    }

}

exports.eliminarProyecto = async (req = request, res = response, next) => {

    const url = req.query.url;

    Proyecto.destroy({ where: { url } })
        .then(proyecto => {

            if (!proyecto) return next();

            res.json({ message: 'Proyecto eliminado!' });
        })
        .catch(err => {
            res.status(500).json(err);
        });

}
