'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var RateLimit = require('express-rate-limit');

var createAccountLimiter = exports.createAccountLimiter = new RateLimit({
  windowMs: 1 * 60 * 1000, // 5 minute window
  delayAfter: 5, // begin slowing down responses after the first request
  delayMs: 3 * 1000, // slow down subsequent responses by 3 seconds per request
  max: 10, // start blocking after 5 requests
  message: "Too many attempts from this IP, please try again in three minutes",
  handler: function handler(req, res) {
    res.json({ error: 'Too many attempts from this IP, please try again in three minutes' });
  }
});