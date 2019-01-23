const https = require('https')

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

        this.site = params.site;

        this.url = this.base_url
            + "format=" + this.format
            + "&sites=" + this.site
            + "&parameterCd=" + this.parameters
            + "&siteStatus=" + this.sitesStatus;

        this.temp = '';
        this.flow = '';
        this.height = '';

        this.temp_unit = '';
        this.flow_unit = '';
        this.height_unit = '';
    }

    get(callback) {
        https.get(this.url, function(res) {
            var body = '';

            res.on('data', function(chunk) {
                body += chunk;
            })

            res.on('end', function() {
                var data = null;
                try {
                    data = JSON.parse(body);// data empty?
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
                    };
                    callback(data);
                } catch (e) {
                    process.stdout.write("Error parsing JSON from " + this.url + "\n");
                    process.stdout.write(e);
                }
            })
        });
    }
}

module.exports = USGSQuery;
