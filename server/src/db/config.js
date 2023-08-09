const path = require('path');
const { Sequelize, Model, DataTypes } = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'db.sqlite'),
    logging: true
})

module.exports = {
    db,
    DataTypes,
    Model
};