const { db, Model, DataTypes } = require('../db')

class Deck extends Model {}

Deck.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    xp: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize: db,
    modelName: 'Deck'
});

module.exports = Deck;