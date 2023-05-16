var express = require('express');
var router = express.Router();

//Controller for Vinyls
const vinylsController = require('../controllers/vinyls');
//Controller for Ensure Login
const ensureLoggedIn = require('../config/ensureLoggedIn');


//GET /vinyls
//Method to retrieve all vinyls (Read operation)
//I want to get a list of all vinyls from all users on the /vinyls page
router.get('/', vinylsController.index);


//GET /vinyls/new
//Return view (form) to add a new post
router.get('/new', ensureLoggedIn, vinylsController.new);

//GET /vinyls
//Show I want to show the profile page of the person who posted the record
router.get('/:id', vinylsController.show)


//POST /vinyls
//Create a Record and display it on show page
router.post('/', ensureLoggedIn, vinylsController.create);



module.exports = router;
