import mongoose from "mongoose";

const listSchema = new mongoose.Schema({

    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true },

    name: { 
        type: String, 
        required: true,
        minlength: 1,
        maxlength: 50
    },

    description: {
        type: String,
        maxlength: 200
    },

    albums: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    }]
    
}, { timestamps: true })

export const List = mongoose.Schema('List', listSchema)