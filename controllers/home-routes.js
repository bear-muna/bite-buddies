const router = require('express').Router();
const { User, Cuisine, Message, Profile, UserCuisine } = require('../models');

// Homepage with Login option
router.get('/', async (req, res) => {
    try {
        if (req.session.LoggedIn) {
            res.redirect('/dashboard');
            return;
        }
        res.render('homepage', { loggedIn: req.session.logged_in })
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
            res.render('edit', { user, loggedIn: req.session.loggedIn });
        }
        res.render('login');
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error loading edit page", error })
    }
});

module.exports = router;