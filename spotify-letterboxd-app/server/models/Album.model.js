import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    
    id: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    artists: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Artist',
        required: true
    },

    imageUrl : { 
        type: String, 
        required: true
    },

    releaseYear: {
        type: String, 
        required: true
    },
    
    tracks: {
        type: Number,
        required: true
    }

}, {timestamps: true})

export const Album = mongoose.Schema('Album', albumSchema);