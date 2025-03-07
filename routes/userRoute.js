const express = require('express');
const user_route = express.Router();
const bodyParser = require('body-parser');
const userController = require('../controller/userController')
const path = require('path');

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));






user_route.get('/', userController.renderLandingPage);

module.exports = user_route; 
