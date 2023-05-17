//Require the vinyl model
const Vinyl = require('../models/vinyl');
const User = require('../models/user');


module.exports = {
    index,
    new: newVinyl,
    create,
    delete: deleteVinyl,
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


async function deleteVinyl(req, res) {
    const vinylId = req.params.id;
    const userId = req.user._id;
    try{
    //Find the vinylID and the User Ide
    const vinyl = await Vinyl.findOne({ _id: vinylId, user: userId });
    
    //if the user doesn't exist
    if (!vinyl) { 
        return res.redirect(`/vinyls/${vinylId}`);
    }

    //Remove the vinyl record from the database
    await Vinyl.deleteOne({ _id: vinylId });

    res.redirect('/vinyls');
} catch (error) {
    console.log(error);
    res.redirect(`/vinyls/${vinylId}`);
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

