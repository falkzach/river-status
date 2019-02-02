const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

const USGSQuery = require('./USGSQuery.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
    res.send({ headline: 'Welcome to the unofficial western Montana Whitewater River Status Page' });
});

app.get('/api/rivers', (req, res) => {
    res.send({
        _links: {
            self: { href: "/api/rivers" },
            blackfoot: { href: "/api/rivers/blackfoot" },
            bitterroot: { href: "/api/rivers/bitterroot" },
            clarkfork: { href: "/api/rivers/clarkfork" },
        }
    });
});

app.get('/api/rivers/blackfoot', (req, res, next) => {
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

app.get('/api/rivers/bitterroot', (req, res) => {
    const site = '12352500';
    const name = 'Bitterroot';
    var query = new USGSQuery({site: site});
    query.get(function(data) {
        res.send({
            _links: {
                self: { href: "/api/rivers/bitterroot" },
            },
            name: name,
            usgs_site_no: site,
            temp: data.temp.value + data.temp.unit,
            flow: data.flow.value + data.flow.unit,
            height: data.height.value + data.height.unit,
        });
    });
});

app.get('/api/rivers/clarkfork', (req, res) => {
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

app.get('/api/log', (req, res) => {
    res.send({
        _links: {
            self: { href: "/api/log" },
        },
        headline: "Maintaining a River Log is important for demonstrating competance on big water both as a client and a guide! This tool makes it easy to keep track of your days on the water."
    });
});

app.get('/api/log/entries', (req, res) => {
    res.send({
        _links: {
            self: { href: "/api/log/entries" },
        },
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
