const router = require('express').Router();
const { User } = require('../../models');

//signup route
router.post('/', async (req, res) => {
    try {
        const userTestData = await User.findOne({ where: { username: req.body.username } });

        // this user already exists
        if (userTestData) {
            res
            .status(400)
            .json({ message: 'Username is already in use' });
            return;
        }

        // add user to User table and log them in
        const userData = await User.create(req.body);
  
        req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
    
        res.status(200).json(userData);
      });
    } catch (err) {
        res.status(400).json(err);
    }
});

// login route
router.post('/login', async (req, res) => {
    try{
        const userData = await User.findOne({ where: { username: req.body.username } });

        // this user doesn't exist
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);
  
        // password isn't valid
        if (!validPassword) {
          res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
          return;
        }

        // save user data in current session
        req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
    } catch (err) {
        res.status(500).json(err);
    }
});

// logout route
router.post('/logout', (req, res) => {
    // destroy current session
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
});

module.exports = router;