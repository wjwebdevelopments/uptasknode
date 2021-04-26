const Proyecto = require('../models/proyecto');

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

exports.proyectoPorUrl = async (req, res, next) => {
    const proyectos = await Proyecto.findAll();   
    const proyecto = await Proyecto.findOne({ where: { url: req.params.url } });

    if ( !proyecto ) return next();  

    res.render('tareas', {
        nombrePagina: 'tareas del proyecto',
        proyecto,
        proyectos
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