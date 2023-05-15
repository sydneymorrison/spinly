//Require the vinyl model
const Vinyl = require('../models/vinyl');

module.exports = {
    index
};

async function index(req, res) {
    const vinyls = await Vinyl.find({})
    res.render('vinyls/index', { title: 'Vinyl Feed', vinyls }); 
}
