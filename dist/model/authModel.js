'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _email = require('../email/email.js');

var _email2 = _interopRequireDefault(_email);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bcrypt = require('bcrypt');
var pool = require('../db/connect.js');
var saltRounds = 10;
var randomstring = require('randomstring');

var jwt = require('jsonwebtoken');
var secret = require('../jwtSecret.js');

var AuthModel = function () {
  function AuthModel(token, data, res, next) {
    var sql = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
    var secondSQL = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';

    _classCallCheck(this, AuthModel);

    this.token = token;
    this.sql = sql;
    this.data = data;
    this.res = res;
    this.next = next;
    this.secondSQL = secondSQL;
  }

  _createClass(AuthModel, [{
    key: 'hashPassword',
    value: function hashPassword(password) {
      return new Promise(function (resolve, reject) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
          if (err) {
            reject(err);
          }
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
              reject(err);
            }
            resolve(hash);
          });
        });
      });
    }
  }, {
    key: 'comparePassword',
    value: function comparePassword(password, dbPassword) {
      return new Promise(function (resolve, reject) {
        bcrypt.compare(password, dbPassword, function (err, comparisonValue) {
          if (err) {
            reject(err);
          }
          resolve(comparisonValue);
        });
      });
    }
  }, {
    key: 'forgotPasswordSetup',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _connection, token, result, url, emailContent, email, emailResponse;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return pool.getConnection();

              case 3:
                _connection = _context.sent;
                token = randomstring.generate({
                  length: 20,
                  charset: 'hex'
                });
                _context.next = 7;
                return _connection.query(this.sql, [token, this.data.email]);

              case 7:
                result = _context.sent;

                if (!(result.changedRows > 0)) {
                  _context.next = 19;
                  break;
                }

                _connection.connection.release();
                url = 'www.testsite.com';
                emailContent = 'You are receiving this because you have requested to reset your password. ' + 'Please click on the following link, or paste this into your browser to complete' + 'the process:\n\n' + url + '/resetForgottenPassword/' + token + '\n\n After confirming your password' + ' you will be able to login.\n';
                email = new _email2.default(this.data.email, 'forgotten-password@makeup.com', 'Forgotten Password', emailContent, this.res);
                _context.next = 15;
                return email.sendTokenEmail();

              case 15:
                emailResponse = _context.sent;

                if (emailResponse) {
                  this.res.json({ success: 'Email has been sent' });
                }
                _context.next = 21;
                break;

              case 19:
                _connection.connection.release();
                throw new Error('User Does Not Exist');

              case 21:
                _context.next = 27;
                break;

              case 23:
                _context.prev = 23;
                _context.t0 = _context['catch'](0);

                console.log(_context.t0);
                this.next(_context.t0);

              case 27:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 23]]);
      }));

      function forgotPasswordSetup() {
        return _ref.apply(this, arguments);
      }

      return forgotPasswordSetup;
    }()
  }, {
    key: 'changePassword',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(identifier) {
        var hash, _connection2, result, secondResult;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.hashPassword(this.data.password);

              case 3:
                hash = _context2.sent;
                _context2.next = 6;
                return pool.getConnection();

              case 6:
                _connection2 = _context2.sent;
                _context2.next = 9;
                return _connection2.query(this.sql, [hash, identifier]);

              case 9:
                result = _context2.sent;

                if (!(result.changedRows > 0)) {
                  _context2.next = 28;
                  break;
                }

                if (!(typeof identifier === 'string')) {
                  _context2.next = 24;
                  break;
                }

                _context2.next = 14;
                return _connection2.query(this.secondSQL, [identifier]);

              case 14:
                secondResult = _context2.sent;

                if (!(secondResult.changedRows > 0)) {
                  _context2.next = 20;
                  break;
                }

                _connection2.connection.release();
                this.res.status(200).json({
                  success: true
                });
                _context2.next = 22;
                break;

              case 20:
                _connection2.connection.release();
                throw new Error('User Does Not Exist');

              case 22:
                _context2.next = 26;
                break;

              case 24:
                // normal change password - send success
                _connection2.connection.release();
                this.res.status(200).json({
                  success: true
                });

              case 26:
                _context2.next = 30;
                break;

              case 28:
                _connection2.connection.release();
                throw new Error('User Does Not Exist');

              case 30:
                _context2.next = 36;
                break;

              case 32:
                _context2.prev = 32;
                _context2.t0 = _context2['catch'](0);

                console.log(_context2.t0);
                this.next(_context2.t0);

              case 36:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 32]]);
      }));

      function changePassword(_x3) {
        return _ref2.apply(this, arguments);
      }

      return changePassword;
    }()
  }, {
    key: 'confirmUser',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var connection, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return pool.getConnection();

              case 3:
                connection = _context3.sent;
                _context3.next = 6;
                return connection.query(this.sql, [this.data.token]);

              case 6:
                result = _context3.sent;

                if (!(result.changedRows > 0)) {
                  _context3.next = 12;
                  break;
                }

                //  how the mysql library is wrapped - stackoverflow
                connection.connection.release();
                this.res.status(200).json({
                  success: true
                });
                _context3.next = 14;
                break;

              case 12:
                //  how the mysql library is wrapped - stackoverflow
                connection.connection.release();
                throw new Error('User Does Not Exist');

              case 14:
                _context3.next = 20;
                break;

              case 16:
                _context3.prev = 16;
                _context3.t0 = _context3['catch'](0);

                console.log(_context3.t0);
                this.next(_context3.t0);

              case 20:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 16]]);
      }));

      function confirmUser() {
        return _ref3.apply(this, arguments);
      }

      return confirmUser;
    }()
  }, {
    key: 'register',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var _data, email, password, first_name, last_name, phone, user, registerToken, _connection3, emailCheckResult, hash, insertResult;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _data = this.data, email = _data.email, password = _data.password, first_name = _data.first_name, last_name = _data.last_name, phone = _data.phone;
                user = { email: email, password: password, first_name: first_name, last_name: last_name, phone: phone };
                registerToken = randomstring.generate({
                  length: 20,
                  charset: 'hex'
                });

                user.token = registerToken;
                _context4.next = 7;
                return pool.getConnection();

              case 7:
                _connection3 = _context4.sent;
                _context4.next = 10;
                return _connection3.query(this.sql, [this.data.email]);

              case 10:
                emailCheckResult = _context4.sent;

                if (!(emailCheckResult.length > 0)) {
                  _context4.next = 16;
                  break;
                }

                _connection3.connection.release();
                throw new Error('Exists');

              case 16:
                console.log('INSERT');
                _context4.next = 19;
                return this.hashPassword(this.data.password);

              case 19:
                hash = _context4.sent;

                user.password = hash;
                _context4.next = 23;
                return _connection3.query(this.secondSQL, user);

              case 23:
                insertResult = _context4.sent;

                console.log("insert result", insertResult);
                if (insertResult.affectedRows) {
                  this.res.json({ "success": true });
                }

                // var url = 'www.testsite.com';
                // var registerEmailContent = 'You are receiving this because you (or someone else) have signed up ' +
                // 'to the website.\n\n Please click on the following link, or paste this into your browser to complete' +
                //  'the process:\n\n' + url + '/confirmEmail/' + user.token + '\n\n Once you have confirmed your account,' +
                //  ' you will be able to login.\n';
                // var Email = new Email(this.data.email, 'userconfirmation@makeup.com', 'Confirm Account', registerEmailContent, this.res);
                //   const emailResponse = await Email.sendTokenEmail();
                // if (emailResponse) {
                //   this.res.json({success: 'Email has been sent'});
                // }
                _connection3.connection.release();

              case 27:
                _context4.next = 33;
                break;

              case 29:
                _context4.prev = 29;
                _context4.t0 = _context4['catch'](0);

                console.log(_context4.t0);
                this.next(_context4.t0);

              case 33:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 29]]);
      }));

      function register() {
        return _ref4.apply(this, arguments);
      }

      return register;
    }()
  }, {
    key: 'getUserFromToken',
    value: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
        var decoded, _connection4, result;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                decoded = jwt.verify(this.token, secret);

                if (!decoded.user_id) {
                  _context5.next = 13;
                  break;
                }

                _context5.next = 5;
                return pool.getConnection();

              case 5:
                _connection4 = _context5.sent;
                _context5.next = 8;
                return _connection4.query(this.sql, [decoded.user_id]);

              case 8:
                result = _context5.sent;

                _connection4.connection.release();
                this.res.status(200).json({
                  user_id: result[0].user_id,
                  email: result[0].email,
                  first_name: result[0].first_name,
                  last_name: result[0].last_name,
                  phone: result[0].phone
                });
                _context5.next = 15;
                break;

              case 13:
                connection.connection.release();
                this.res.status(401).json({ "error": "Invalid Token" });

              case 15:
                _context5.next = 21;
                break;

              case 17:
                _context5.prev = 17;
                _context5.t0 = _context5['catch'](0);

                console.log(_context5.t0);
                this.next(_context5.t0);

              case 21:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 17]]);
      }));

      function getUserFromToken() {
        return _ref5.apply(this, arguments);
      }

      return getUserFromToken;
    }()
  }, {
    key: 'login',
    value: function () {
      var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
        var _connection5, result, user_id, match, token;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return pool.getConnection();

              case 3:
                _connection5 = _context6.sent;
                _context6.next = 6;
                return _connection5.query(this.sql, [this.data.email]);

              case 6:
                result = _context6.sent;

                if (!(result.length > 0)) {
                  _context6.next = 22;
                  break;
                }

                user_id = result[0].user_id;
                _context6.next = 11;
                return this.comparePassword(this.data.password, result[0].password);

              case 11:
                match = _context6.sent;

                if (!match) {
                  _context6.next = 18;
                  break;
                }

                token = jwt.sign({ user_id: user_id }, secret, {
                  expiresIn: '6h'
                });


                _connection5.connection.release();
                this.res.status(200).json({
                  user_id: result[0].user_id,
                  email: result[0].email,
                  first_name: result[0].first_name,
                  last_name: result[0].last_name,
                  phone: result[0].phone,
                  token: token
                });
                _context6.next = 20;
                break;

              case 18:
                _connection5.connection.release();
                throw new Error('Incorrect Password');

              case 20:
                _context6.next = 24;
                break;

              case 22:
                _connection5.connection.release();
                throw new Error('User Does Not Exist');

              case 24:
                _context6.next = 30;
                break;

              case 26:
                _context6.prev = 26;
                _context6.t0 = _context6['catch'](0);

                console.log(_context6.t0);
                this.next(_context6.t0);

              case 30:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 26]]);
      }));

      function login() {
        return _ref6.apply(this, arguments);
      }

      return login;
    }()
  }]);

  return AuthModel;
}();

exports.default = AuthModel;