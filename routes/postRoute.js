const express = require('express');
const { createPost, incrementLike, getAllPost, getPostById } = require('../controllers/postController');
const { getNotifications } = require('../controllers/notifController');
const { createComment } = require('../controllers/commentController');
const router = express.Router();

router.post('/create', createPost);
router.get('/list', getAllPost);
router.get('/:id', getPostById);
router.patch('/like/:postId', incrementLike);

router.post('/comment/create', createComment);
// router.get('/notifications/:username', getNotifications);

module.exports = router;