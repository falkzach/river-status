const express = require('express');
var router = express.Router();

router.get('/test', (req, res) => {
    console.log('req.session', req.session);
    res.send({ headline: 'test' });
});

module.exports = router;
