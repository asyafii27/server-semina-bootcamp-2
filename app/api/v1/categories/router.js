const express = require('express');
const router = express();
const { index, find, create, update, deestroy } = require('./controller');

router.get('/categories', index);
router.get('/categories/:id', find);
router.post('/categories', create);
router.put('/categories/:id', update);
router.delete('/categories/:id', deestroy);


module.exports = router;