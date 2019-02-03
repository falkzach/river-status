const express = require('express');
var router = express.Router();

router.get('/hello', (req, res) => {
    res.send({ headline: 'Welcome to the unofficial western Montana Whitewater River Status Page' });
});

module.exports = router;
