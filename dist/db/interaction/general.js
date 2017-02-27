'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var standardInsertQuery = exports.standardInsertQuery = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(SQL, data, next, token) {
    var decoded, connection, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            decoded = jwt.verify(token, secret);
            _context.next = 4;
            return pool.getConnection();

          case 4:
            connection = _context.sent;
            _context.next = 7;
            return connection.query(SQL, decoded.user_id);

          case 7:
            result = _context.sent;

            connection.connection.release();
            return _context.abrupt('return', result);

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            next(_context.t0);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 12]]);
  }));

  return function standardInsertQuery(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var standardUpdateQuery = exports.standardUpdateQuery = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(SQL, data, next, token, res) {
    var decoded, connection, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            decoded = jwt.verify(token, secret);
            _context2.next = 4;
            return pool.getConnection();

          case 4:
            connection = _context2.sent;
            _context2.next = 7;
            return connection.query(SQL, data);

          case 7:
            result = _context2.sent;

            if (!(result.affectedRows > 0)) {
              _context2.next = 18;
              break;
            }

            if (!(result.changedRows > 0)) {
              _context2.next = 14;
              break;
            }

            // changed quantity
            connection.connection.release();
            res.json({ success: true });
            _context2.next = 16;
            break;

          case 14:
            // exists but no change
            connection.connection.release();
            throw new Error('No Change');

          case 16:
            _context2.next = 20;
            break;

          case 18:
            // does not exist
            connection.connection.release();
            throw new Error('ID Not Found');

          case 20:
            _context2.next = 26;
            break;

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2['catch'](0);

            console.log(_context2.t0);
            next(_context2.t0);

          case 26:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 22]]);
  }));

  return function standardUpdateQuery(_x5, _x6, _x7, _x8, _x9) {
    return _ref2.apply(this, arguments);
  };
}();

var standardGetQueryToken = exports.standardGetQueryToken = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(SQL, next, token) {
    var decoded, connection, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            decoded = jwt.verify(token, secret);
            _context3.next = 4;
            return pool.getConnection();

          case 4:
            connection = _context3.sent;
            _context3.next = 7;
            return connection.query(SQL, decoded.user_id);

          case 7:
            result = _context3.sent;

            if (!(result.length > 0)) {
              _context3.next = 13;
              break;
            }

            connection.connection.release();
            return _context3.abrupt('return', {
              success: true,
              data: result
            });

          case 13:
            connection.connection.release();
            return _context3.abrupt('return', {
              success: true,
              data: []
            });

          case 15:
            _context3.next = 21;
            break;

          case 17:
            _context3.prev = 17;
            _context3.t0 = _context3['catch'](0);

            console.log(_context3.t0);
            next(_context3.t0);

          case 21:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 17]]);
  }));

  return function standardGetQueryToken(_x10, _x11, _x12) {
    return _ref3.apply(this, arguments);
  };
}();

var standardRequiredLengthGetQuery = exports.standardRequiredLengthGetQuery = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(SQL, data, next, token, res) {
    var connection, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return pool.getConnection();

          case 3:
            connection = _context4.sent;
            _context4.next = 6;
            return connection.query(SQL, data);

          case 6:
            result = _context4.sent;

            if (!(result.length > 0)) {
              _context4.next = 12;
              break;
            }

            connection.connection.release();
            res.json(result);
            _context4.next = 14;
            break;

          case 12:
            connection.connection.release();
            throw new Error('ID Not Found');

          case 14:
            _context4.next = 20;
            break;

          case 16:
            _context4.prev = 16;
            _context4.t0 = _context4['catch'](0);

            console.log(_context4.t0);
            next(_context4.t0);

          case 20:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 16]]);
  }));

  return function standardRequiredLengthGetQuery(_x13, _x14, _x15, _x16, _x17) {
    return _ref4.apply(this, arguments);
  };
}();

var standardGetQuery = exports.standardGetQuery = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(SQL, data, next) {
    var connection, result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return pool.getConnection();

          case 3:
            connection = _context5.sent;
            _context5.next = 6;
            return connection.query(SQL, data);

          case 6:
            result = _context5.sent;

            connection.connection.release();
            return _context5.abrupt('return', result);

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5['catch'](0);

            console.log(_context5.t0);
            next(_context5.t0);

          case 15:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this, [[0, 11]]);
  }));

  return function standardGetQuery(_x18, _x19, _x20) {
    return _ref5.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var pool = require('../connect.js');
var jwt = require('jsonwebtoken');
var secret = require('../../jwtSecret.js');