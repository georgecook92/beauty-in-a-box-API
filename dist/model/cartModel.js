'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _general = require('../db/interaction/general.js');

var Queries = _interopRequireWildcard(_general);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pool = require('../db/connect.js');

var secret = require('../jwtSecret.js');
var jwt = require('jsonwebtoken');

var CartModel = function () {
  function CartModel(data, next) {
    var token = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var sql = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    _classCallCheck(this, CartModel);

    this.sql = sql;
    this.data = data;
    this.next = next;
    this.token = token;
  }

  _createClass(CartModel, [{
    key: 'checkCartExist',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var decoded, connection, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                decoded = jwt.verify(this.token, secret);
                _context.next = 4;
                return pool.getConnection();

              case 4:
                connection = _context.sent;
                _context.next = 7;
                return connection.query(this.sql, [decoded.user_id]);

              case 7:
                result = _context.sent;

                connection.connection.release();
                console.log("cart", result);
                return _context.abrupt('return', result);

              case 13:
                _context.prev = 13;
                _context.t0 = _context['catch'](0);

                console.log(_context.t0);

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 13]]);
      }));

      function checkCartExist() {
        return _ref.apply(this, arguments);
      }

      return checkCartExist;
    }()
  }, {
    key: 'createCart',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Queries.standardInsertQuery(this.sql, [], this.next, this.token);

              case 2:
                result = _context2.sent;
                return _context2.abrupt('return', result);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createCart() {
        return _ref2.apply(this, arguments);
      }

      return createCart;
    }()
  }, {
    key: 'getCart',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var decoded, connection, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                decoded = jwt.verify(this.token, secret);
                _context3.next = 4;
                return pool.getConnection();

              case 4:
                connection = _context3.sent;
                _context3.next = 7;
                return connection.query(this.sql, [decoded.user_id]);

              case 7:
                result = _context3.sent;

                connection.connection.release();
                return _context3.abrupt('return', result);

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3['catch'](0);

                console.log(_context3.t0);

              case 15:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 12]]);
      }));

      function getCart() {
        return _ref3.apply(this, arguments);
      }

      return getCart;
    }()
  }, {
    key: 'checkCartProduct',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var decoded, connection, result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                decoded = jwt.verify(this.token, secret);
                _context4.next = 4;
                return pool.getConnection();

              case 4:
                connection = _context4.sent;
                _context4.next = 7;
                return connection.query(this.sql, [this.data.cart_id, this.data.product_id]);

              case 7:
                result = _context4.sent;

                connection.connection.release();
                return _context4.abrupt('return', result);

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4['catch'](0);

                console.log(_context4.t0);
                this.next(_context4.t0);

              case 16:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 12]]);
      }));

      function checkCartProduct() {
        return _ref4.apply(this, arguments);
      }

      return checkCartProduct;
    }()
  }, {
    key: 'updateCartProduct',
    value: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
        var decoded, connection, result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                decoded = jwt.verify(this.token, secret);
                _context5.next = 4;
                return pool.getConnection();

              case 4:
                connection = _context5.sent;

                console.log("SQL", this.sql);
                _context5.next = 8;
                return connection.query(this.sql, [this.data.cart_id, this.data.product_id]);

              case 8:
                result = _context5.sent;

                connection.connection.release();
                return _context5.abrupt('return', result);

              case 13:
                _context5.prev = 13;
                _context5.t0 = _context5['catch'](0);

                console.log(_context5.t0);
                this.next(_context5.t0);

              case 17:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 13]]);
      }));

      function updateCartProduct() {
        return _ref5.apply(this, arguments);
      }

      return updateCartProduct;
    }()
  }, {
    key: 'addToCart',
    value: function () {
      var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
        var decoded, connection, result;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                decoded = jwt.verify(this.token, secret);
                _context6.next = 4;
                return pool.getConnection();

              case 4:
                connection = _context6.sent;
                _context6.next = 7;
                return connection.query(this.sql, this.data);

              case 7:
                result = _context6.sent;

                connection.connection.release();
                return _context6.abrupt('return', result);

              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6['catch'](0);

                console.log(_context6.t0);
                this.next(_context6.t0);

              case 16:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 12]]);
      }));

      function addToCart() {
        return _ref6.apply(this, arguments);
      }

      return addToCart;
    }()
  }, {
    key: 'deleteFromCart',
    value: function () {
      var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
        var decoded, connection, result;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                decoded = jwt.verify(this.token, secret);
                _context7.next = 4;
                return pool.getConnection();

              case 4:
                connection = _context7.sent;
                _context7.next = 7;
                return connection.query(this.sql, [this.data.cart_id, this.data.product_id]);

              case 7:
                result = _context7.sent;

                connection.connection.release();
                return _context7.abrupt('return', result);

              case 12:
                _context7.prev = 12;
                _context7.t0 = _context7['catch'](0);

                console.log(_context7.t0);
                this.next(_context7.t0);

              case 16:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 12]]);
      }));

      function deleteFromCart() {
        return _ref7.apply(this, arguments);
      }

      return deleteFromCart;
    }()
  }]);

  return CartModel;
}();

exports.default = CartModel;