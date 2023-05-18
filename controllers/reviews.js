//Require the vinyl model
const Vinyl = require('../models/vinyl');
const User = require('../models/user');


module.exports = {
    create,
    // Add this export
    delete: deleteReview
  };



//   async function create(req, res){
//     const vinylId = req.params.id;
//     const userId = req.user._id;
//     try {
//         //Find the vinyl post by its vinylId and user Id
//         const vinyl = await Vinyl.findOne({ _id: vinylId, user: userId });
//         //if the user doesn't exist
//         if (!vinyl) { 
//             return res.redirect(`/vinyls/${vinylId}`);
//     }
//         //Add the user-centric info to the req.body for the new review
//         req.body.user = req.user._id;
//         req.body.userName = req.user.name;
//         req.body.userAvatar = req.user.avatar;

//         //Push or unshift subdocs into Mongoose arrays
//         vinyl.reviews.push(req.body);

//         //Save the updated vinyl doc
//         await vinyl.save();

//     } catch (err) {
//         console.log(err);
//         res.redirect(`/vinyls/${vinylId}`);
//     }

// }


//   async function deleteReview(req, res){
//     const vinylId = req.params.id;
//     const userId = req.user._id;
//     try {
//         //Find the vinyl post by its vinylId and user Id
//         const vinyl = await Vinyl.findOne({ _id: vinylId, user: userId });
//         //if the user doesn't exist
//         if (!vinyl) { 
//             return res.redirect(`/vinyls/${vinylId}`);
//     }
//         //Remove the review using the remove method available on the Moongoose arrays
//         vinyl.reviews.remove(vinylId);

//         //Save the updated movie doc
//         await vinyl.save();

//         //Redirect back to the movie's show view
//         res.redirect(`/vinyls/${vinylId}`);

//     } catch (err) {
//         console.log(err);
//         res.redirect(`/vinyls/${vinylId}`);
//     }
//   }


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
  // Note the cool "dot" syntax to query on the property of a subdoc
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


