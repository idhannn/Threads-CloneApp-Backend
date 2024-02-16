const Post = require("../models/postModel");
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
        const { username, caption, image } = req.body;

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
        const id = req.params.postId;

        if (!id) {
            return errorHandler(res, 404, 'Postingan Tidak Ditemukan!');
        }

        const increaseLike = await Post.findByIdAndUpdate(id, {
            $inc: { likes: 1 },
        })

        const like = increaseLike.likes;

        return Success(res, 200, 'Like Bertambah', { like });
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
}

const createComment = async (req, res) => {
    try {
        const id = req.params.postId;
        const data = req.body.comment;

        if (!id || !data) {
            return errorHandler(res, 400, 'Data Kurang Lengkap!');
        }

        const comment = await Post.findByIdAndUpdate(id, { $push: { comments: data } });

        return Success(res, 200, 'Komentar Ditambahkan', { comment });
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
}

module.exports = {
    createPost,
    incrementLike,
    createComment,
    getAllPost,
    getPostById
}