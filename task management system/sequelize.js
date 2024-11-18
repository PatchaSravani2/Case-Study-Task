const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('Wellness360', 'root', 'Password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

const TaskManagement = require('./model')(sequelize, DataTypes);

sequelize.sync();

module.exports = {
    sequelize,
    TaskManagement
};
