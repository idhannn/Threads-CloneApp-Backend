const express = require('express');
const { userById } = require('../controllers/userController');

const router = express.Router();

router.get('/:id', userById);

module.exports = router;