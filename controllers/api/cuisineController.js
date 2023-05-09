const router = require('express').Router();
const { Cuisine } = require('../../models');

// get all cuisines route
router.get('/', async (req, res) => {
    try {
        const cuisinesData = await Cuisine.findAll();

        res.status(200).json(cuisinesData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// add several cuisines route
router.post('/', async (req, res) => {
    try {
        // takes in an array of cuisines once user creates an account
        const cuisinesData = await Cuisine.bulkCreate(req.body);

        res.status(200).json(cuisinesData);
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