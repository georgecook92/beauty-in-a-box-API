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

var OrderModel = function () {
  function OrderModel(data, next, token, sql, dataProduct, secondSql) {
    _classCallCheck(this, OrderModel);

    this.sql = sql;
    this.dataOrder = data;
    this.next = next;
    this.token = token;
    this.dataProduct = dataProduct;
    this.secondSql = secondSql;
  }

  _createClass(OrderModel, [{
    key: 'addOrder',


    // order_id, product_id, quantity

    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var decoded, connection, orderResult, dataArray, productResult;
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
                return connection.query(this.sql, { user_id: decoded.user_id, payment_id: this.dataOrder.payment_id, total_price: this.dataOrder.total_price });

              case 7:
                orderResult = _context.sent;
                dataArray = [];

                this.dataProduct.forEach(function (data) {
                  console.log('data', data);
                  dataArray.push([orderResult.insertId, data.product_id, data.quantity]);
                });

                console.log('dataArray', dataArray);
                _context.next = 13;
                return connection.query(this.secondSql, [dataArray]);

              case 13:
                productResult = _context.sent;

                console.log('product result', productResult);
                connection.connection.release();
                // return result;
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context['catch'](0);

                console.log(_context.t0);

              case 21:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 18]]);
      }));

      function addOrder() {
        return _ref.apply(this, arguments);
      }

      return addOrder;
    }()
  }]);

  return OrderModel;
}();

exports.default = OrderModel;