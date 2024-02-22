const Post = require("../models/postModel");
const Notifications = require("../models/notifModel");
const { errorHandler, Success } = require("../utils/responseHandler");

const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find();
        return Success(res, 200, 'Semua Postingan', posts);
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
}

const getPostById = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);

        if (!id) return errorHandler(res, 404, 'Postingan Tidak Ditemukan!');

        return Success(res, 200, 'Postingan Ditemukan', { ...post._doc });
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
}

const createPost = async (req, res) => {
    try {
        const { caption, image } = req.body;
        const username = req.user.username;
        if (!username || !caption) {
            return errorHandler(res, 400, 'Isi Semua Input!');
        }

        const newPost = await Post.create({ username, caption, image });

        return Success(res, 201, 'Postingan Berhasil Terbuat', { ...newPost._doc });
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
}

const incrementLike = async (req, res) => {
    try {
        const postId = req.params.postId;

        const userWhoPosted = req.query.username;
        const sourceUsername = req.user.username;

        if (!postId || !sourceUsername || !userWhoPosted) {
            return errorHandler(res, 404, 'Postingan Tidak Ditemukan!');
        }

        if (userWhoPosted !== sourceUsername) {
            const createNotif = await Notifications.create({
                postId,
                username: sourceUsername,
                notifType: 'like',
                message: `${sourceUsername} Menyukai Postinganmu!`,
            })
        }

        const increaseLike = await Post.findByIdAndUpdate(postId, {
            $inc: { likes: 1 },
        });

        const like = increaseLike.likes;

        return Success(res, 200, 'Like Bertambah', { like });
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
}

module.exports = {
    createPost,
    incrementLike,
    getAllPost,
    getPostById
}