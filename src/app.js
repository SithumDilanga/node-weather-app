const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { send } = require('process');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');      
const viewsPath = path.join(__dirname, '../templates/views');
const patialsPath = path.join(__dirname, '../templates/partials');

// app.set('views', path.join(__dirname, '../views'));

// setup handlers engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(patialsPath);  

// setup static directory to serve/use path in the express          
app.use(express.static(publicDirectoryPath));     

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App!',
		name: 'SDLive'
	});    
});   

app.get('/about', (req, res) => { 
	res.render('about', {  
		title: 'About Me',
		name: 'SDLive'
	});
});

app.get('/help', (req, res) => { 
	res.render('help', {
		message: 'Hellp Help page!',
		title: 'Help',
		name:'SDLive'
	});
});

app.get('/help/*', (req, res) => {
	res.render('error404', {
		errorMessage: 'Help not found!',
		title: '404',
		name:'SDLive'
	});
});

// app.get('*', (req, res) => {
// 	res.render('error404', {
// 		errorMessage: 'Page not found!',
// 		title: '404',
// 		name:'SDLive'
// 	});
// });
    
// app.get('', (req, res) => {
//   res.send('<h1>Hello express!</h1>');         
// });

// app.get('/help', (req, res) => {
// 	res.send({   
// 		name: 'SDLive', 
// 		age: 23
// 	});
// });

// app.get('/about', (req, res) => {
// 	res.send('<h1>About page</h1>'); 
// });

app.get('/weather', (req, res) => {
	if(!req.query.address) {
		return res.send({
			error: 'You must provide address'
		});
	}

	geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {

		if(error) {
			return res.send({ error });
		}
	
		forecast(latitude, longitude, (error, forecastData) => {
	
			if(error) {
				return res.send({ error });
			}
	
			res.send({     
				forecast: forecastData,   
				location: location,
				address: req.query.address
			}); 

		});
	});	 
}); 

app.listen(3000, () => {
	console.log('Server is up on port 3000');
}); 