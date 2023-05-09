const router = require('express').Router();
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
        res.render('signup');
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error loading signup page", error });
    }
});

// Edit user profile
router.get('/users/edit', async (req, res) => {
    try {
        if (req.session.logged_in) {
            const dbUserData = await User.findByPk(req.session.user_id, {
                include: [Profile, Cuisine]
            });
            const user = dbUserData.map((u) => u.get({ plain: true }));
            res.render('edit', { user, logged_in: req.session.logged_in });
        }
        res.render('login');
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error loading edit page", error })
    }
});

// GET profile by ID
router.get('/profiles/:id', async (req, res) => {
    try {
        const dbUserData = await User.findByPk(req.params.id, {
            include: [Profile, Cuisine],
        });
        res.json(dbUserData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error loading profile", error });
    }
});

// GET messages between 2 Users
router.get('/messages/:sendID/:recID', async (req, res) => {
    try {
        const dbSenderData = await Message.findAll({
            where: {
                sender_id: req.params.sendID,
                recipient_id: req.params.recID,
            },
            include: [User],
        });

        const dbRecipientData = await Message.findAll();

        res.json({dbSenderData, dbRecipientData});

        // const sendMessage = dbSenderData.map((mes) => mes.get({ plain: true }));
        // const recMessage = dbRecipientData.map((mes) => mes.get({ plain: true }));

        // res.render('/message', { sendMessage, recMessage, logged_in: req.session.logged_in });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error loading profile", error });
    }
})

module.exports = router;