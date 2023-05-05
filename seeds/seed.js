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

    const applications = await Application.bulkCreate(applicationData);

    const status = await Status.bulkCreate(statusData);

    process.exit(0);
};

seedDatabase();