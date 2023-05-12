const router = require('express').Router();
const { Message } = require('../../models');

// create message 
router.post('/', async (req, res) => {
    try {
        const messageData = await Message.create(
            {
                body: req.body.body,
                sender_id: req.body.sender_id,
                recipient_id: req.body.recipient_id,
            }
        );
    
        res.status(200).json(messageData);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;