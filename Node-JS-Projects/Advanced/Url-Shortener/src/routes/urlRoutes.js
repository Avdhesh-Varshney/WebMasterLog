// src/routes/urlRoutes.js
const express = require('express');
const rateLimit = require('express-rate-limit');
const urlController = require('../controllers/urlController');

const router = express.Router();

// Define rate limit rule
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});

// Apply the rate limiting middleware to relevant routes
router.post('/shorten', limiter, urlController.shortenUrl);
router.get('/:shortUrl', limiter, urlController.redirectToOriginalUrl);

module.exports = router;
