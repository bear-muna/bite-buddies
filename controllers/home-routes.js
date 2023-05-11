const router = require('express').Router();
const withAuth = require('../utils/auth');
const {Op} = require('sequelize');
const { User, Cuisine, Message, Profile, UserCuisine } = require('../models');

// Homepage with Login option
router.get('/', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/dashboard');
            return;
        }
        res.render('homepage', { logged_in: req.session.logged_in })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error loading homepage", error });
    }
});

// Dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const dbUserData = await User.findByPk(req.session.user_id, {
            include: [Profile, Cuisine]
        });

        const user = dbUserData.get({ plain: true });
        
        res.render('dashboard', { user, logged_in: req.session.logged_in });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error loading dashboard", error })
    }
})

// Login route
router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
})

// Signup
router.get('/signup', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/dashboard');
            return;
        }

        const cuisineData = await Cuisine.findAll();

        const cuisine = cuisineData.map((u) => u.get({ plain: true }));
        res.render('signup', {cuisine});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error loading signup page", error });
    }
});

// Edit user profile
router.get('/users/edit', withAuth, async (req, res) => {
    try {
        const dbUserData = await User.findByPk(req.session.user_id, {
            include: [Profile, Cuisine]
        });

        // get all cuisines to display in edit page dropdown
        const dbCuisineData = await Cuisine.findAll();

        const cuisine = dbCuisineData.map((u) => u.get({ plain: true }));
        const user = dbUserData.get({ plain: true });
        res.render('edit', { user, cuisine, logged_in: req.session.logged_in });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error loading edit page", error })
    }
});

// GET profile by ID
router.get('/profiles/:id', async (req, res) => {
    try {

        if (req.session.user_id == req.params.id) {
            res.redirect('/dashboard');
        }

        const dbUserData = await User.findByPk(req.params.id, {
            include: [Profile, Cuisine],
        });
        const user = dbUserData.get({ plain: true });

        // pass this in to profile handlebar so we can link to messages page
        const senderId = req.session.user_id;

        res.render('profile', { user, senderId, logged_in: req.session.logged_in });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error loading profile", error });
    }
});

// GET messages between 2 Users
router.get('/messages/:sendID/:recID', withAuth, async (req, res) => {
    try {
        // gets all messages between the same two users, regardless if one was the sender or recpient
        const dbMessages = await Message.findAll({
            where: {
                [Op.or]: [
                    {
                        sender_id: parseInt(req.params.sendID),
                        recipient_id: parseInt(req.params.recID),
                    },
                    {
                        sender_id: parseInt(req.params.recID),
                        recipient_id: parseInt(req.params.sendID),
                    }
                ],
            },
            order: [['created_at', 'ASC']] // get messages in order of creation date
        });

        // const dbSenderData = await Message.findAll({
        //     where: {
        //         sender_id: req.params.sendID,
        //         recipient_id: req.params.recID,
        //     },
        //     include: [User],
        // });

        // const dbRecipientData = await Message.findAll({
        //     where: {
        //         sender_id: req.params.recID,
        //         recipient_id: req.params.sendID,
        //     },
        //     include: [User],
        // });

        const messages = dbMessages.map((mes) => mes.get({ plain: true }));

        // const sendMessage = dbSenderData.map((mes) => mes.get({ plain: true }));
        // const recMessage = dbRecipientData.map((mes) => mes.get({ plain: true }));

        res.render('message', { messages, logged_in: req.session.logged_in });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error loading profile", error });
    }
});

// Get Profiles based on cuisine
router.get('/search/cuisine/:id', withAuth, async (req, res) => {
    try {
        const dbUsersData = await User.findAll({
            include: [
                {
                    model: Cuisine,
                    where: {
                        id: req.params.id,
                    },
                    through: {
                        attributes: [],
                    }
                },
                {
                    model: Profile,
                }
            ]
        });

        const user = dbUsersData.map((u) => u.get({ plain: true }));
        console.log(user);
        res.render('search', { user, logged_in: req.session.logged_in });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error loading profiles", error });
    };
});

module.exports = router;