//Require the vinyl model
const Vinyl = require('../models/vinyl');
const User = require('../models/user');


module.exports = {
    create,
    // Add this export
    delete: deleteReview
  };



async function create(req, res) {
    const vinyl = await Vinyl.findById(req.params.id);
  
    // Add the user-centric info to req.body (the new review)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
  
    // We can push (or unshift) subdocs into Mongoose arrays
    vinyl.reviews.push(req.body);
    try {
      // Save any changes made to the movie doc
      await vinyl.save();
    } catch (err) {
      console.log(err);
    }
    res.redirect(`/vinyls/${vinyl._id}`);
  }


async function deleteReview(req, res) {
  // Query properties on a subdoc
  const vinyl = await Vinyl.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id });
  // Rogue user!
  if (!vinyl) return res.redirect('/vinyls');
  // Remove the review using the remove method available on Mongoose arrays
  vinyl.reviews.remove(req.params.id);
  // Save the updated vinyl doc
  await vinyl.save();
  // Redirect back to the vinyls's show view
  res.redirect(`/vinyls/${vinyl._id}`);
}


