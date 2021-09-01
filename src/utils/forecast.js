const request = require('postman-request');

function forecast(lat, lon, callback) {
	const url = `http://api.weatherstack.com/current?access_key=6b526025fd316863ba2cb8546590b1ad&query=${lon},${lat}&units=f`;

	request({ url:url, json: true }, (error, {body}) => {
		if(error) {
			callback('Unable to connect to weather service!', undefined);
		} else if(body.error) {
			callback('Unable to find the location', undefined);
		} else {
			callback(undefined, `${body.current.weather_descriptions[0]}. It is ${body.current['temperature']}, but it feels like ${body.current['feelslike']}. Humidity is ${body.current['humidity']}`);
		}
	});

}

module.exports = forecast;