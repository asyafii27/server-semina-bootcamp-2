const express = require('express');
const router = express();
const { createCMSOrganizer, createCMSUser } = require('./controller');

router.post('/organizers', createCMSOrganizer);
router.post('/organizers/users', createCMSUser);

module.exports = router;