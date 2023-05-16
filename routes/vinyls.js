var express = require('express');
var router = express.Router();

//Controller for Vinyls
const vinylsController = require('../controllers/vinyls');


//GET /vinyls
//Method to retrieve all vinyls (Read operation)
//I want to get a list of all vinyls from all users on the /vinyls page
router.get('/', vinylsController.index)


module.exports = router;
