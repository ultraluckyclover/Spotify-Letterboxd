import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    review: { type: String },
    rating: { type: Number, min: 0, max: 5 },
}, { timestamp: true })


const diarySchema = new mongoose.Schema({

    userId : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    },

    reviews: [reviewSchema],

    like: { type: Boolean },
    listenedTo: { type: Boolean }
    
}, { timestamp: true })

export const Diary = mongoose.Schema('Diary', diarySchema);