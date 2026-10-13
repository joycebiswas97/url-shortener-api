const express = require('express');
const router = express.Router();
const {getUrlStats,shortenUrl} = require('../controllers/urlController');

router.post('/urls', shortenUrl);
router.get('/:shortCode/stats', getUrlStats);

module.exports = router;