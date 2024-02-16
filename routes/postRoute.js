const express = require('express');
const { createPost, incrementLike, createComment, getAllPost, getPostById } = require('../controllers/postController');
const router = express.Router();

router.post('/create', createPost);
router.get('/list', getAllPost);
router.get('/:id', getPostById);
router.patch('/like/:postId', incrementLike);
router.patch('/comment/:postId', createComment);

module.exports = router;