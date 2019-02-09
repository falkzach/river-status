const express = require('express');
var router = express.Router();

const USGSQuery = require('../usgs/USGSQuery.js');
var river = require('../models/River')
var riverModel = new river();

var query = new USGSQuery();
// some sites: 1234000, 12352500, 12353000
//             12340000,12352500, 12353000

router.get('/', (req, res) => {
    riverModel.all((err, response) => {
        if (err) console.log("Database error!");
        else {
            res.send({
                _links: {
                    self: { href: "/api/rivers" },
                },
                rivers: response
            });
        }
    });
});

router.route('/add').post((req, res) => {
    let data = req.body;
    riverModel.add(data);
    console.log(data);
    res.send({
        _links: {
            self: { href: "/api/rivers/add" },
        },  
    });
});

router.route('/:id').get((req, res) => {    
    riverModel.get({id: req.params.id}, (err, response) => {
        //TODO: handle empty response
        let site = response[0].site_no;
        let name = response[0].name;
        let state = response[0].state;

        query.get(site, (data) => {
            res.send({
                _links: {
                    self: { href: "/api/rivers/:id" + site },
                },
                name: name,
                state: state,
                usgs_site_no: site,
                temp: data.temp.value + ' ' + data.temp.unit,
                flow: data.flow.value + ' ' + data.flow.unit,
                height: data.height.value + ' ' + data.height.unit,
                query_datetime: data.query_datetime,
            });
        });
    })
});

module.exports = router;
