const User = require('./User');
const Application = require('./Application');
const Status = require('./Status');

User.hasMany(Application, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id'
});

Application.belongsTo(User, {
    foreignKey: 'user_id'
});

Status.hasOne(Application, {
    foreignKey: 'status_id',
    onDelete: 'CASCADE'    
});

Application.belongsTo(Status, {
    foreignKey: 'status_id'
});

module.exports = { User, Application, Status }