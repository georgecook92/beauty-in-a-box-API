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

var ProductsModel = function () {
  function ProductsModel(data, res, next) {
    var token = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var sql = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

    _classCallCheck(this, ProductsModel);

    this.sql = sql;
    this.data = data;
    this.res = res;
    this.next = next;
    this.token = token;
  }

  _createClass(ProductsModel, [{
    key: 'getAll',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var connection, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return pool.getConnection();

              case 3:
                connection = _context.sent;
                _context.next = 6;
                return connection.query(this.sql);

              case 6:
                result = _context.sent;

                connection.connection.release();
                return _context.abrupt('return', result);

              case 11:
                _context.prev = 11;
                _context.t0 = _context['catch'](0);

                console.log(_context.t0);
                this.next(_context.t0);

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 11]]);
      }));

      function getAll() {
        return _ref.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: 'getAllByCat',
    value: function getAllByCat() {
      Queries.standardRequiredLengthGetQuery(this.sql, [this.data.categoryId], this.next, this.token, this.res);
    }
  }, {
    key: 'getProduct',
    value: function getProduct() {
      Queries.standardRequiredLengthGetQuery(this.sql, [this.data.productId], this.next, this.token, this.res);
    }

    // ADMIN PANEL STUFF

  }, {
    key: 'changeProductQuantity',
    value: function changeProductQuantity() {
      Queries.standardUpdateQuery(this.sql, [this.data.quantity, this.data.productId], this.next, this.res);
    }
  }, {
    key: 'changeDiscount',
    value: function changeDiscount() {
      Queries.standardUpdateQuery(this.sql, [this.data.discount, this.data.productId], this.next, this.res);
    }
  }, {
    key: 'changePrice',
    value: function changePrice() {
      Queries.standardUpdateQuery(this.sql, [this.data.price, this.data.productId], this.next, this.res);
    }
  }]);

  return ProductsModel;
}();

exports.default = ProductsModel;