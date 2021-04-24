const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('uptasknode', 'root', 'root', {

    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306,
    define: {
        timestamps: false
    }

});

module.exports = sequelize;