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
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    }
},
{ 
    hooks: proyectoHooks
});

module.exports = Proyecto;