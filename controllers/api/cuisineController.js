const router = require('express').Router();
const { Cuisine, UserCuisine } = require('../../models');

// get all cuisines route
router.get('/', async (req, res) => {
    try {
        const cuisinesData = await Cuisine.findAll();

        res.status(200).json(cuisinesData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// add user's cuisine route
router.post('/', async (req, res) => {
    try {
        // takes in an array of cuisines once user creates an account
        const userCuisineData = await UserCuisine.create(
            {
                user_id: req.session.user_id,
                cuisine_id: req.body.cuisine_id,
            }
        );

        res.status(200).json(userCuisineData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete a cuisine
router.delete('/', async (req, res) => {
    try {
        const cuisineData = await Cuisine.destroy(
            {
                where: {
                    name: req.body.name,
                },
            }
        );

        res.status(200).json(cuisineData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;