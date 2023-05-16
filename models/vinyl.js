const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reviewSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vinylId: {
        type: Schema.Types.ObjectId,
        ref: 'Vinyl',
        required: true
    },
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
    }
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
        required: true
    },
    condition: {
        type: String,
        enum: ['Poor', 'Fair', 'Good', 'Very Good', 'Mint']
    },
    exchangeType: {
        type: String,
        enum: ['Trade', 'Sell', 'Buy']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: String,
    userAvatar: String,
    reviews: [reviewSchema]
}, {
    timestamps: true
});


// Compile the schema into a model and export it
module.exports = mongoose.model('Vinyl', vinylSchema);