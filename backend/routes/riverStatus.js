const express = require('express');
var router = express.Router();

const USGSQuery = require('../USGSQuery.js');
var river = require('../models/River')
var riverModel = new river();

var query = new USGSQuery();

router.get('/', (req, res) => {
    riverModel.all((err, result) => {
        if (err) console.log("Database error!");
        else {
            res.send({
                _links: {
                    self: { href: "/api/rivers" },
                    blackfoot: { href: "/api/rivers/blackfoot" },
                    bitterroot: { href: "/api/rivers/bitterroot" },
                    clarkfork: { href: "/api/rivers/clarkfork" },
                },
                rivers: result
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

router.route('/usgs/:site_no').get((req, res) => {
    let site = req.params.site_no;
    query.get(site, (data) => {
        res.send({
            _links: {
                self: { href: "/api/rivers/" + site },
            },
            name: name,
            usgs_site_no: site,
            temp: data.temp.value + ' ' + data.temp.unit,
            flow: data.flow.value + ' ' + data.flow.unit,
            height: data.height.value + ' ' + data.height.unit,
            query_datetime: data.query_datetime,
        });
    });
});

router.get('/blackfoot', (req, res, next) => {
    const site = '12340000';
    const name = 'Blackfoot';
    var query = new USGSQuery();
    query.get(site, (data) => {
        res.send({
            _links: {
                self: { href: "/api/rivers/blackfoot" },
            },
            name: name,
            usgs_site_no: site,
            temp: data.temp.value + ' ' + data.temp.unit,
            flow: data.flow.value + ' ' + data.flow.unit,
            height: data.height.value + ' ' + data.height.unit,
            query_datetime: data.query_datetime,
        });
    });
});

router.get('/bitterroot', (req, res) => {
    const site = '12352500';
    const name = 'Bitterroot';
    var query = new USGSQuery();
    query.get(site, (data) => {
        res.send({
            _links: {
                self: { href: "/bitterroot" },
            },
            name: name,
            usgs_site_no: site,
            temp: data.temp.value + ' ' + data.temp.unit,
            flow: data.flow.value + ' ' + data.flow.unit,
            height: data.height.value + ' ' + data.height.unit,
            query_datetime: data.query_datetime,
        });
    });
});

router.get('/clarkfork', (req, res) => {
    const site = '12353000'
    const name = 'Clarkfork'
    var query = new USGSQuery();
    query.get(site, (data) => {
        res.send({
            _links: {
                self: { href: "/api/rivers/clarkfork" },
            },
            name: name,
            usgs_site_no: site,
            temp: data.temp.value + ' ' + data.temp.unit,
            flow: data.flow.value + ' ' + data.flow.unit,
            height: data.height.value + ' ' + data.height.unit,
            query_datetime: data.query_datetime,
        });
    });
    
});

module.exports = router;
