require('dotenv').config();
const express = require('express');
const path = require('path');
const errorhandler = require('errorhandler');
const morgan = require('morgan');

const helpers = require('./helpers');

module.exports = (app) => {

    // Mode
    if ( process.env.NODE_ENV === 'development' ) {
        app.use(errorhandler());
        app.use(morgan('tiny'));
    }

    // Crear la conexion a la base de datos
    const db = require('../config/databases');

    // Importar modelos
    require('../models/proyecto');
    require('../models/tarea');

    db.sync()
        .then(() => console.log('Connection has been established successfully.'))
        .catch(error => console.log('Unable to connect to the database:', error))

    // Routes.
    const routes = require('../routes');

    // Pasar helpers a la aplicacion
    app.use((req, res = express.response, next) => {
        res.locals.vardump = helpers.vardump;
        next();
    });

    // Body parser
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    // Habilitar PUG y añadir la carpeta de las vistas.
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, '../views'));

    // Static files.
    app.use(express.static(path.join(__dirname, '../public')));


    app.use(routes());
    return app;
}