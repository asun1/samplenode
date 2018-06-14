const express = require('express');
const jwt = require('jsonwebtoken');
var hbs = require('express-handlebars');
var path = require('path');

const app = express();

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// hbs.registerPartials(__dirname + '/views/partials');

// app.use((req, res, next) => {
// 	res.status(200).json({
// 		message: 'It works!'
// 	})
// });

var people = [
	{
		firstName: 'Peter',
		lastName: 'Johnson'
	},
	{
		firstName: 'John',
		lastName: 'Doe'
	}

];

app.get('/docs', function(req, res) {
	// res.send('this is the homepage');
	res.status(200).json({
		message: 'It works!'
	})
});

app.get('/contact', jsonTest, function (req, res) {
	res.render('home', {
		content: 'This is some content',
		published: false,
		people: res.jsonTest.people
	});

});

app.get('/api', function(req,res) {
	res.json({
		message: 'Welcome to the API'
	});
});

app.post('/api/posts', verifyToken, function(req, res) {
	jwt.verify(req.token, 'secretkey', function(err, authData) {
		if(err) {
			res.sendStatus(403);
		} else {
			res.json({
				message: 'Post created...',
				authData

			});

		}
	});

});

app.post('/api/login', function(req, res) {
	//Mock user
	const user = {
		id: 1,
		username: 'andy',
		email: 'andy@gmail.com'
	}

	jwt.sign({user: user}, 'secretkey', function(err, token){
		res.json({
			token
		});
	});
});

app.get('/profile/:name', function(req,res) {
	var data = {age: 29, job: 'dev', hobbies: ['eating', 'basketball', 'talking']};
	res.render('profile', {person: req.params.name, data: data});

});

app.get('/test', function(req, res) {
	res.json({
		message: 'Welcome to the API'
	});
});

function jsonTest(req, res, next) {
	res.jsonTest = 	{
		people: [
	{
		firstName: 'Peter',
		lastName: 'Johnson'
	},
	{
		firstName: 'John',
		lastName: 'Doe'
	}

]
	};
	next();
}

app.get('/test2', jsonTest, function(req, res) {
	return res.json(res.jsonTest);
});

app.get('/test3', function(req, res) {
	app.get('/test', function(req, res) {
	res.json({
		message: 'Welcome to the API'
	});
});
});

app.get('/test.html', function(req, res) {
	res.json({
		message: 'Welcome to the API2'
	});
});

//FORMAT OF TOKEN
//Authorization: Bearer <access_token>

//Verify Token
function verifyToken(req, res, next) {
	//Get auth header value
	const bearerHeader = req.headers['authorization'];
	//Check if bearer is undefined
	if(typeof bearerHeader !== 'undefined') {
		//Split at the space 

	const bearer = bearerHeader.split(' ');
	//Get token from array
	const bearerToken = bearer[1];
	//Set the token
	req.token = bearerToken;
	//Next middleware
	next();

	} else {
		//Forbidden
		res.sendStatus(403);
	}


}
module.exports = app;