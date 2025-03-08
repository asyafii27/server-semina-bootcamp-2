const express = require('express');
const router = express();
const { signin } = require('./controller');

router.post('/signin', signin);

module.exports = router;