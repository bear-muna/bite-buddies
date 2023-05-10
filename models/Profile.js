const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Profile extends Model {}

Profile.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        picture: {
            type: DataTypes.STRING,
            defaultValue: '/images/blank-profile-pic.png'
        },
        availability: {
            type: DataTypes.TEXT,
        },
        bio: {
            type: DataTypes.TEXT
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        }
    }, {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
);

module.exports = Profile;