const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,

    },
    caption: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,

    },
    whoLikesIt: {
        type: Array,
        default: [],
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Array,
        default: [],
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
