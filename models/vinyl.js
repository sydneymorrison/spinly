const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reviewSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // vinylId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Vinyl',
    //     required: true
    // },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    userName: String,
    userAvatar: String,
}, {
    timestamps: true
});


const vinylSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        default: function() {
          return new Date().getFullYear();
        }
      },
    genre: {
        type: String,
        enum: [
            'Pop',
            'Rock',
            'Hip Hop',
            'R&B (Rhythm and Blues)',
            'Country',
            'Jazz',
            'Electronic',
            'Alternative',
            'Indie',
            'Metal',
            'Punk',
            'Reggae',
            'Classical',
            'Blues',
            'Funk',
            'Soul',
            'Folk',
            'Dance',
            'Gospel',
            'World'
          ]
    },
    condition: {
        type: String,
        enum: ['Poor', 'Fair', 'Good', 'Very Good', 'Mint']
    },
    exchangeType: {
        type: String,
        enum: ['Trade', 'Sell', 'Buy']
    },
    price: {
        type: Number,
        min: 0,
        default: 0
    },

    //Track the UserId from the User Model (Google)
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: String,
    userAvatar: String,
    userSeller: String,
    reviews: [reviewSchema],
    metadataImage: {
        type: String
      }
}, {
    timestamps: true
});


// Compile the schema into a model and export it
module.exports = mongoose.model('Vinyl', vinylSchema);