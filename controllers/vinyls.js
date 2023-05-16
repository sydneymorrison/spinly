//Require the vinyl model
const Vinyl = require('../models/vinyl');

module.exports = {
    index,
    new: newVinyl
};

async function index(req, res) {
    const vinyls = await Vinyl.find({})
    res.render('vinyls/index', { title: 'Vinyl Feed', vinyls }); 
}


async function newVinyl(req,res) {
    const user = req.user;
    res.render('vinyls/new', { 
        title: 'Profile',
        username: user.name,
        avatar: user.avatar
     }); 
}
