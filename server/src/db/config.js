// add your database connection here
const { Sequelize, DataTypes, Model } = require('sequelize');

const db = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'db.sqlite'),
  logging: true
});

module.exports = { db, DataTypes, Model };