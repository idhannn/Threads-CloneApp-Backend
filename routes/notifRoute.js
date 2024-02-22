const express = require('express');
const { getNotifications } = require('../controllers/notifController');

const router = express.Router();

router.get('/notifications', getNotifications);

module.exports = router;