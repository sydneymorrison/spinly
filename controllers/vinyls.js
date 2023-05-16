//Require the vinyl model
const Vinyl = require('../models/vinyl');
const User = require('../models/user');


module.exports = {
    index,
    new: newVinyl,
    create,
    show
};

async function index(req, res) {
    const vinyls = await Vinyl.find({})
    res.render('vinyls/index', { title: 'Vinyl Feed', vinyls }); 
}


async function newVinyl(req,res) {
    const user = req.user;
    res.render('vinyls/new', {
        title: 'New Vinyl',
        username: user.name,
        avatar: user.avatar
     }); 
}

async function create(req, res) {
    try {
      const vinylData = {
        title: req.body.title,
        artist: req.body.artist,
        releaseYear: req.body.releaseYear,
        genre: req.body.genre,
        condition: req.body.condition,
        exchangeType: req.body.exchangeType,
        price: req.body.price,
        user: req.user._id,
        userName: req.user.name,
        userAvatar: req.user.avatar,
        userSeller: req.user.name
      }
      const vinyl = await Vinyl.create(vinylData);
      console.log(vinylData)
      res.redirect('/vinyls/new');
    } catch (err) {
        console.log(err);
        res.render('vinyls/new', { errorMsg: err.message });
    }   
}


async function show(req, res) {
   try{
    const vinyl = await Vinyl.findById(req.params.id);
    const user = req.user;
    res.render('vinyls/show', { title: 'Vinyl Details', vinyl, user })
} catch (err) {
    console.log(err);
    res.render('error', { errorMsg: 'Failed to retrieve vinyl details.' });
}
}