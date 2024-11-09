import mongoose from "mongoose"

// Schema for each user
// Favorite albums display on user's profile
// createdAt for date of profile created
// Location is optional

// Limit to 4 favorite albums

function favoritesLimit(val) {
    return val.length <= 4;
};

const userSchema = new mongoose.Schema({

    username: { 
        type: String, 
        required: true, 
        unique: true },

    displayName: { type: String },

    imageUrl: { 
        type: String, 
        required: true },

    // clerkId: { 
    //     type: String, 
    //     required: true, 
    //     unique: true },

    // createdAt: { 
    //     type: Date, 
    //     immutable: true,
    //     default: () => Date.now() },

    // favoriteAlbums: {
    //     type: [String],
    //     validate: [
    //         favoritesLimit, 
    //         '{PATH} exceeds the limit of 4' ]},

    location: { type: String }

}, { timestamps: true });


const User = mongoose.model("User", userSchema);
export { User };



