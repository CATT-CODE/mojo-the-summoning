const { db, Model, DataTypes } = require('../db')

class Attack extends Model {}

Attack.init({
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
    },
    mojoCost: {
        type: DataTypes.INTEGER
    },
    staminaCost: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize: db,
    modelName: 'Attack'
});

module.exports = Attack;

