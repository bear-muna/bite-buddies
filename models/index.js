const User = require('./User');
const Cuisine = require('./Cuisine');
const Message = require('./Message');
const Profile = require('./Profile');
const UserCuisine = require('./UserCuisine');

User.hasOne(Profile, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id'
});

Profile.belongsTo(User, {
    foreignKey: 'user_id'
});

User.belongsToMany(Cuisine, {
    through: UserCuisine,
    foreignKey: 'user_id'
});

Cuisine.belongsToMany(User, {
    through: UserCuisine,
    foreignKey: 'cuisine_id'
});

User.hasMany(Message, {
    foreignKey: 'sender_id'
});

Message.belongsTo(User, {
    foreignKey: 'sender_id'
});

User.hasMany(Message, {
    foreignKey: 'recipient_id'
});

Message.belongsTo(User, {
    foreignKey: 'recipient_id'
});

module.exports = { User, Cuisine, Message, Profile, UserCuisine };