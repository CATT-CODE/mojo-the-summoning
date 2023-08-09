const { db, Model, DataTypes } = require('../db')

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
    }
}, {
    sequelize: db,
    modelName: 'User'
});