const router = require('express').Router();
const { User, Cuisine, Message, Profile, UserCuisine } = require('../models');

// Homepage with Login option
router.get('/', async (req, res) => {
    try {
        if (req.session.LoggedIn) {
            res.redirect('/dashboard');
            return;
        }
        res.render('homepage', { loggedIn: req.session.loggedIn })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error loading homepage", error });
    }
});

// Login route
router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
})

// Signup
router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error loading signup page", error });
    }
});

module.exports = router;