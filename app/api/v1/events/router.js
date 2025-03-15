const express = require('express');
const router = express();
const { create, index, find, update, destroy, changeStatus } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth')

router.get('/events', authenticateUser, index);
router.get('/events/:id', authenticateUser, find);
router.put('/events/:id', authenticateUser, update);
router.delete('/events/:id', authenticateUser, destroy);
router.post('/events', authenticateUser, create);
router.put('/events/:id/status', authenticateUser, changeStatus);

module.exports = router;