import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true},
    title: {
        type: String,
        required: true
    },
    artists: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Artist',
        required: true
    },
    tracks: {
        type: Number,
        required: true
    }
})

export const Album = mongoose.Schema('Album', albumSchema);