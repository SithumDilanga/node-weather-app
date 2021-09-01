const request = require('postman-request');

function geoCode(address, callback) {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2l0aHVtZGlsYW5nYSIsImEiOiJja3NxOWp6bWswYWVzMnVtcnprYWhvMDM1In0.IFUkX2yRnNAWAZpU7aMTUA&limit=1';

	request({ url, json:true }, (error, {body}) => {
		if(error) {
			callback('Unable to connect to geo service!', undefined);
		} else if(body.features.length === 0) {
			callback('Unable to find the geo location!', undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[0],
				longitude: body.features[0].center[1],
				location: body.features[0].place_name,
			});
		}
	});
}

module.exports = geoCode;