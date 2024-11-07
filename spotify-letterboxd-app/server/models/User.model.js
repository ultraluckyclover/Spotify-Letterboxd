import mongoose from "mongoose"



// Schema for each user
// Favorite albums display on user's profile

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    favoriteAlbums: {
        type: [String],
        validate: [favoritesLimit, '{PATH} exceeds the limit of 4' ]
    },
    createdAt: { type: Date },
    location: {type: String}

});

// Limit to 4 favorite albums

function favoritesLimit(val) {
    return val.length <= 4;
};

const User = mongoose.model("User", userSchema);
export { User};



