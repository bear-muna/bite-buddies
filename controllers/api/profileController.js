const router = require('express').Router();
const { Profile } = require('../../models');


// create profile route
router.post('/', async (req, res) => {
    try {
        const profileTestData = await Profile.findOne({ where: { user_id: req.session.user_id } });

        // check if user already has a profile
        if(profileTestData) {
            res
            .status(400)
            .json({ message: 'User ' + req.session.user_id + ' already has a profile' });
            return;
        }

        const profileData = await Profile.create(
            {
                location: req.body.location,
                picture: req.body.picture,
                availability: req.body.availability,
                bio: req.body.bio,
                user_id: req.session.user_id,
            }
        );

        res.status(200).json(profileData);

    } catch (err) {
        res.status(500).json(err);
    }
});

// update profile route
router.put('/', async (req, res) => {
    try {
        const profileData = await Profile.update(
            {
                location: req.body.location,
                picture: req.body.picture,
                availability: req.body.availability,
                bio: req.body.bio,
            },
            {
                where: {
                    user_id: req.session.user_id,
                },
            }
        );

        res.status(200).json(profileData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;