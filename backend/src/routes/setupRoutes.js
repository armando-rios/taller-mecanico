// backend/src/routes/setupRoutes.js
const express = require('express');
const router = express.Router();
const { createInitialAdmin } = require('../controllers/setupController');

router.post('/initial-admin', createInitialAdmin);

module.exports = router;
