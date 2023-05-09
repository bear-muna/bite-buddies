const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// Session testing
router.get('/sessiondata', (req, res) => {
    try {
        res.json(req.session);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;