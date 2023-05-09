const router = require('express').Router();
const { Profile } = require('../../models');

// create profile route
router.post('/', async (req, res) => {
    try {
        const profileData = await Profile.create(req.body);

        
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
                availabiity: req.body.availabiity,
                allergies: req.body.allergies,
            },
            {
                where: {
                    user_id: req.body.user_id,
                },
            }
        );

        res.status(500).json(profileData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;