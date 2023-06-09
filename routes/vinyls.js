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


//Create ROUTE
//POST /vinyls
//Create a Record and display it on show page
router.post('/', ensureLoggedIn, vinylsController.create);

//Edit
//GET /vinyls:id/edit
router.get('/:id/edit', ensureLoggedIn, vinylsController.edit)

//Update Route
router.put('/:id', ensureLoggedIn, vinylsController.update);


//DELETE /vinyls
//Delete Vinyls
// DELETE /reviews/:id
router.delete('/:id', ensureLoggedIn, vinylsController.delete);

//GET /vinyls
//Show I want to show the profile page of the person who posted the record
//Show functionality must  be below new route
router.get('/:id', ensureLoggedIn, vinylsController.show)



module.exports = router;
