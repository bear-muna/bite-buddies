const sequelize = require('../config/connection');
const {User, Cuisine, Message, Profile, UserCuisine} = require('../models');

const userData = require('./userData.json');
const cuisineData = require('./cuisineData.json');
const messageData = require('./messageData.json');
const profileData = require('./profileData.json');
const userCuisineData = require('./userCuisineData.json');


const seedDatabase = async () => {
    await sequelize.sync({force: true});

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const cuisines = await Cuisine.bulkCreate(cuisineData);
    const messages = await Message.bulkCreate(messageData);
    const profile = await Profile.bulkCreate(profileData);
    const userCusines = await UserCuisine.bulkCreate(userCuisineData);

    process.exit(0);
};

seedDatabase();