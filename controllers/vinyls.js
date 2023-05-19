//Require the vinyl model
const Vinyl = require('../models/vinyl');
const User = require('../models/user');


module.exports = {
    index,
    new: newVinyl,
    create,
    edit,
    update,
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


async function edit(req, res) {
    const vinylId = req.params.id;
    const userId = req.user._id;
    try {
        //Find the vinyl post by its vinylId and user Id
        const vinyl = await Vinyl.findOne({ _id: vinylId, user: userId });
        //if the user doesn't exist
        if (!vinyl) { 
            return res.redirect(`/vinyls/${vinylId}`);
        }
        res.render('vinyls/edit', {title: 'Edit Vinyl', vinyl})
    } catch (error) {
        console.log(error);
        res.redirect(`/vinyls/${vinylId}`);
    }
}


async function update(req, res) {
    const vinylId = req.params.id;
    const userId = req.user._id;
    try {
        //Find the vinyl post by its vinylId and user Id
        const vinyl = await Vinyl.findOne({ _id: vinylId, user: userId });
        //if the user doesn't exist
        if (!vinyl) { 
            return res.redirect(`/vinyls/${vinylId}`);
    }

    //Update the vinyl post with the new data
    vinyl.title = req.body.title;
    vinyl.artist = req.body.artist;
    vinyl.releaseYear = req.body.releaseYear;
    vinyl.genre = req.body.genre;
    vinyl.condition = req.body.condition;
    vinyl.exchangeType = req.body.exchangeType;
    vinyl.price = req.body.price;

    //Save the updated vinyl post
    await vinyl.save();

    //Redirect
    res.redirect(`/vinyls/${vinylId}`);
    } catch (error) {
        console.log(error);
        res.redirect(`/vinyls/${vinylId}`);
    }
}


async function deleteVinyl(req, res) {
    const vinylId = req.params.id;
    const userId = req.user._id;
    try{
    //Find the vinylID and the User Id
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
     const vinylId = req.params.id;
     const user = req.user;
    try{
    // const vinyl = await Vinyl.findById(req.params.id).populate('user').populate('reviews.user');
    // const vinyl = await Vinyl.findById(req.params.id).populate('reviews.user');
    const vinyl = await Vinyl.findById(vinylId).populate('user').populate('reviews.user').populate({ path: 'reviews.user', model: 'User' });

    if (!vinyl) { 
        return res.redirect(`/vinyls/${vinylId}`);
    }

    res.render('vinyls/show', { title: 'Vinyl Details', vinyl, user });
 } catch (err) {
     console.log(err);
    //  res.render('err', { errorMsg: 'Failed to retrieve vinyl details.' });
 }
 }

