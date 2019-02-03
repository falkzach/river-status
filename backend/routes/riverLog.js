const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
var entry = require('../models/Entry')
var entryModel = new entry();

router.get('/', (req, res) => {
    res.send({
        _links: {
            self: { href: "/api/log" },
        },
        headline: "Maintaining a River Log is important for demonstrating competance on big water both as a client and a guide! This tool makes it easy to keep track of your days on the water."
    });
});

router.get('/entries', (req, res) => {
     entryModel.all(function (err, result) {
         if (err) console.log("Database error!");
         else {
            res.send({
                _links: {
                    self: { href: "/api/log/entries" },
                },
                entries: result
            });
         }
     });



});

router.route('/entries/add').post((req, res) => {
    let data = req.body;
    entryModel.add(data);
    res.send({
        _links: {
            self: { href: "/api/log/entry/add" },
        },
    });
});

module.exports = router;
