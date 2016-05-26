const express = require('express');
const placeholderApi = require('../../lib/placeholder-api');

const router = express.Router();

router.get('/', (req, res) => res.send('<h1>Gallery</h1>'));

module.exports = router;

