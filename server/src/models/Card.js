const { db, Model, DataTypes } = require('../db/config')

class Card extends Model {}

Card.init({
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    mojo: {
        type: DataTypes.INTEGER
    },
    stamina: {
        type: DataTypes.INTEGER
    },
    imgUrl: {
        type: DataTypes.STRING
    }
}, {
    sequelize: db,
    modelName: 'Card'
});

module.exports = Card;

