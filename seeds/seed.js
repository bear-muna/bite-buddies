const sequelize = require('../config/connection');
const {User, Application, Status} = require('../models');

const userData = require('./userData.json');
const applicationData = require('./applicationData.json');
const statusData = require('./statusData.json');

const seedDatabase = async () => {
    await sequelize.sync({force: true});

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const status = await Status.bulkCreate(statusData);

    for(const application of applicationData) {
        await Application.create({
            ...application,
            user_id: users[Math.floor(Math.random() * users.length)].id,
            status_id: status[Math.floor(Math.random() * status.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();