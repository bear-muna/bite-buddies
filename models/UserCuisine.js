const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserCuisine extends Model {}

UserCuisine.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        cuiside_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Cuisine',
                key: 'id'
            }
        }
    }, {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
)

module.exports = UserCuisine;