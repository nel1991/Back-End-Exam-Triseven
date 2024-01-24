const express = require('express');
const path = require('path');
const app = express();
var router = express.Router();


router.get('/home', function(request, response, next) {
	res.render('home');
});

