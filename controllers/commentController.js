const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const Notifications = require('../models/notifModel');
const { errorHandler, Success } = require('../utils/responseHandler');

const getComment = async (req, res) => {
    try {
        const postId = req.params.postId;

        if (!postId) {
            return errorHandler(res, 404, 'Postingan Tidak Ditemukan!');
        }

        const comments = await Comment.find({ postId: postId }).sort({ createdAt: -1 });

        return Success(res, 200, 'Semua Komentar', comments);
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
}

const createComment = async (req, res) => {
    try {
        const { postId, comment } = req.body;
        const { username, image } = req.user;
        const userWhoPosted = req.query.username;

        if (!postId || !username || !comment || !image) {
            return errorHandler(res, 400, 'Isi Semua Input!');
        }

        const addReplies = await Post.findByIdAndUpdate(postId, {
            $push: {
                replies: {
                    username: username,
                    image: image
                }
            },
        });

        if (userWhoPosted !== username) {
            const createNotif = await Notifications.create({
                postId,
                username,
                notifType: 'comment',
                message: `${username} Membalas Postinganmu!`,
            })
        }
        if (!addReplies) {
            return errorHandler(res, 404, 'Postingan Tidak Ditemukan!');
        }

        const newComment = await Comment.create({
            postId,
            username,
            comment,
            image
        });

        return Success(res, 201, 'Komentar Berhasil Dibuat', newComment);
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
}

module.exports = {
    getComment,
    createComment
}