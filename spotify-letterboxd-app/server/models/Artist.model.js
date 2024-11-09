import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    genres: { type: [String] },
    imageUri: { type: String, required: true },
    albums: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Album',
        required: true
    }

})

export const Artist = mongoose.model('Artist', artistSchema)