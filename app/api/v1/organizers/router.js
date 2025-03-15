const express = require('express');
const router = express();
const { createCMSOrganizer, createCMSUser, getCMSUsers } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth')

router.post('/organizers', createCMSOrganizer);
router.post('/organizers/users', createCMSUser);
router.get('/users', authenticateUser, getCMSUsers)

module.exports = router;