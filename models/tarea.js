const { DataTypes } = require('sequelize');
const database = require('../config/databases');
const Proyecto = require('../models/proyecto');

const Tarea = database.define('Tarea', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tarea: DataTypes.STRING(100),
    estado: DataTypes.STRING(1)

});

// TODO: Llave foranea una tarea pertenece a un proyecto
Tarea.belongsTo(Proyecto); // ProyectoId: INTEGER 

module.exports = Tarea;