var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send({
        _links: {
            self: { href: "/api/log" },
        },
        headline: "Maintaining a River Log is important for demonstrating competance on big water both as a client and a guide! This tool makes it easy to keep track of your days on the water."
    });
});

router.get('/entries', (req, res) => {
    res.send({
        _links: {
            self: { href: "/api/log/entries" },
        },
        entries: {}
    });
});

router.route('/entries/add').post((req, res) => {
    console.log(req);
    res.send({
        _links: {
            self: { href: "/api/log/entry/add" },
        },
    });
});

module.exports = router;
