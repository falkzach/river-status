var express = require('express');
var router = express.Router();

const USGSQuery = require('../USGSQuery.js');

router.get('/', (req, res) => {
    res.send({
        _links: {
            self: { href: "/api/rivers" },
            blackfoot: { href: "/api/rivers/blackfoot" },
            bitterroot: { href: "/api/rivers/bitterroot" },
            clarkfork: { href: "/api/rivers/clarkfork" },
        }
    });
});

router.get('/blackfoot', (req, res, next) => {
    const site = '12340000';
    const name = 'Blackfoot';
    var query = new USGSQuery({site: site});
    query.get(function(data) {
        res.send({
            _links: {
                self: { href: "/api/rivers/blackfoot" },
            },
            name: name,
            usgs_site_no: site,
            temp: data.temp.value + data.temp.unit,
            flow: data.flow.value + data.flow.unit,
            height: data.height.value + data.height.unit,
        });
    });
});

router.get('/bitterroot', (req, res) => {
    const site = '12352500';
    const name = 'Bitterroot';
    var query = new USGSQuery({site: site});
    query.get(function(data) {
        res.send({
            _links: {
                self: { href: "/bitterroot" },
            },
            name: name,
            usgs_site_no: site,
            temp: data.temp.value + data.temp.unit,
            flow: data.flow.value + data.flow.unit,
            height: data.height.value + data.height.unit,
        });
    });
});

router.get('/clarkfork', (req, res) => {
    const site = '12353000'
    const name = 'Clarkfork'
    var query = new USGSQuery({site: site});
    query.get(function(data) {
        res.send({
            _links: {
                self: { href: "/api/rivers/clarkfork" },
            },
            name: name,
            usgs_site_no: site,
            temp: data.temp.value + data.temp.unit,
            flow: data.flow.value + data.flow.unit,
            height: data.height.value + data.height.unit,
        });
    });
    
});

module.exports = router;
