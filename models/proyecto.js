const { DataTypes } = require('sequelize');
const database = require('../config/databases');
const { proyectoHooks } = require('./hooks');

const Proyecto = database.define('Proyecto', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100)
    },
    url: {
        type: DataTypes.STRING(100)
    }
},
{ 
    hooks: proyectoHooks
});

module.exports = Proyecto;