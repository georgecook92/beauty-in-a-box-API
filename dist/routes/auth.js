'use strict';

var _authModel = require('../model/authModel.js');

var _authModel2 = _interopRequireDefault(_authModel);

var _rateLimit = require('../general/rateLimit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();


router.get('/getUserFromToken', function (req, res, next) {
  var emailCheckSQL = 'select * from `_users` where `user_id` = ?';
  var token = req.get('Authorization') || "";
  var Model = new _authModel2.default(token, req.body, res, next, emailCheckSQL);
  Model.getUserFromToken();
});

router.post('/login', _rateLimit.createAccountLimiter, function (req, res, next) {
  var emailCheckSQL = 'select * from `_users` where `email` = ?';
  // empty token
  var Model = new _authModel2.default('', req.body, res, next, emailCheckSQL);
  Model.login();
});

router.post('/register', function (req, res, next) {
  var emailCheckSQL = 'select * from `_users` where `email` = ?';
  var insertSQL = 'INSERT INTO _users SET ?';

  var Model = new _authModel2.default('', req.body, res, next, emailCheckSQL, insertSQL);
  Model.register();
});

router.put('/confirmUser', function (req, res, next) {
  var updateConfirmUserSQL = 'update _users set `verified` = 1, `token` = NULL where `token` = ?';
  var Model = new _authModel2.default('', req.body, res, next, updateConfirmUserSQL);
  Model.confirmUser();
});

router.put('/changePassword', function (req, res, next) {
  if (req.body.user_id) {
    var changePasswordSQL = 'update _users set `password` = ? where `user_id` = ?';
    var Model = new _authModel2.default('', req.body, res, next, changePasswordSQL);
    Model.changePassword(req.body.user_id);
  } else if (req.body.token) {
    var forgotPasswordSQL = 'update _users set `password` = ? where `token` = ?';
    var removeTokenSQL = 'update _users set `token` = NULL where `token` = ?';
    var ForgotModel = new _authModel2.default('', req.body, res, next, forgotPasswordSQL, removeTokenSQL);
    ForgotModel.changePassword(req.body.token);
  }
});

router.put('/forgotPassword', function (req, res, next) {
  var forgottenPasswordSQL = 'update _users set `token` = ? where `email` = ?';
  var Model = new _authModel2.default('', req.body, res, next, forgottenPasswordSQL);
  Model.forgotPasswordSetup();
});

module.exports = router;