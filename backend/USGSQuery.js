const https = require('https')
const redis = require("redis");

/*
TODO: get data from USGS
https://waterdata.usgs.gov/nwis/uv?site_no=12340000  //bf
https://waterservices.usgs.gov/nwis/iv/?format=json&sites=12340000&parameterCd=00060,00065,00010&siteStatus=all
query url for XML
00065 = gage height (ft.)
00060 = streamflow (cu ft/sec)
00010 = water temperature in degrees Celsius
https://waterservices.usgs.gov/rest/IV-Service.html
*/

class USGSQuery {
    constructor(params) {
        this.base_url = "https://waterservices.usgs.gov/nwis/iv/?";
        this.format = "json";
        this.parameters = "00060,00065";
        this.sitesStatus = "all";

        this.redis_client = redis.createClient({port: process.env.REDIS_PORT, host: process.env.REDIS_HOST});

        this.redis_client.on('error', function(err) {
            console.log('Error in redis client:');
            console.log(err);
        });
    }
    
    build_query_url() {
        this.url = this.base_url
            + "format=" + this.format
            + "&sites=" + this.site
            + "&parameterCd=" + this.parameters
            + "&siteStatus=" + this.sitesStatus;
    }

    // TODO: refine redis to indavidual keys to improve performance?
    query_redis(callback) {
        try {
            let hash = 'river-status/' + this.site;
            this.redis_client.get(hash, function(err, reply) {
                var data = null;
                if (reply !== null) {
                    data = JSON.parse(reply);
                }
                callback(data);
            });
        } catch (err) {
            console.log("Error querying redis:")
            console.log(err)
        }
    }

    set_redis(data) {
        try {
            let hash = 'river-status/' + this.site;
            this.redis_client.set(hash, JSON.stringify(data), 'EX', process.env.REDIS_KEEP_RIVER_TIME);
        } catch (err) {
            console.log("Error setting redis cache " + hash + ": " + value + ":");
            console.log(err);
        }
    }

    query_USGS_api(callback) {
        https.get(this.url, (res) => {
            var body = '';

            res.on('data', (chunk) => {
                body += chunk;
            })
            
            res.on('end', () => {
                var newDate = new Date();
                var data = null;
                try {
                    data = JSON.parse(body);// data empty?
                    // TODO: write a more sophisticated parser!
                    // this.temp = data['value']['timeSeries'][0]['values'][0]['value'][0]['value'];
                    this.flow = data['value']['timeSeries'][0]['values'][0]['value'][0]['value'];
                    this.height = data['value']['timeSeries'][1]['values'][0]['value'][0]['value'];

                    // this.temp_unit = data['value']['timeSeries'][0]['variable']['unit']['unitCode'];
                    this.flow_unit = data['value']['timeSeries'][0]['variable']['unit']['unitCode'];
                    this.height_unit = data['value']['timeSeries'][1]['variable']['unit']['unitCode'];
                    var data = {
                        temp: {value: this.temp, unit: this.temp_unit},
                        flow: {value: this.flow, unit: this.flow_unit},
                        height: {value: this.height, unit: this.flow_unit},
                        query_datetime: newDate.toLocaleString()
                    };
                    callback(data);
                } catch (err) {
                    console.log("Error querying USGS API:");
                    console.log(err);
                }
            })
        });
    }

    get(site, callback) {
        this.site = site;
        this.build_query_url();

        this.query_redis((data) => {
            if (data == null) {
                this.query_USGS_api((data) => {
                    this.set_redis(data);
                    callback(data);
                });
            } else {
                callback(data);
            }
        });
    }
}

module.exports = USGSQuery;
