const express = require('express');
const router = express.Router();
const {shortenUrl} = require('../controllers/urlController');

router.post('/urls', shortenUrl);

module.exports = router;