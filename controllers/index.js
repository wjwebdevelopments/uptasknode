const Proyecto = require('../models/proyecto');

exports.proyectosHome = (req, res) => {

    res.render('index', {
        nombrePagina: 'proyectos'
    });
    
}

exports.formularioProyecto = (req, res) => {
    res.render('nuevoProyecto', {
        nombrePagina: 'nuevo proyecto'
    });
}

exports.nuevoProyecto = async (req, res) => {

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
            errores
        });
    }else {

        // TODO: No hay errores, insertar en la base de datos
        await Proyecto.create({ nombre });
        res.redirect('/');

    }
    
}

exports.getNosotros = (req, res) => {

    res.render('nosotros');
    
}