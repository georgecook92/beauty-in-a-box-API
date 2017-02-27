'use strict';

var _orderModel = require('../model/orderModel');

var _orderModel2 = _interopRequireDefault(_orderModel);

var _cartModel = require('../model/cartModel');

var _cartModel2 = _interopRequireDefault(_cartModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var express = require('express');
var router = express.Router();
var config = require('../db/config.js');
var secret = require('../jwtSecret.js');
var jwt = require('jsonwebtoken');

var getCartSQL = 'SELECT _product.product_id, _product.product_name, _product.price, _cart_product.quantity, _product.discount  FROM _cart inner join _cart_product on _cart_product.cart_id = _cart.cart_id inner join _product on _product.product_id = _cart_product.product_id where user_id = ?';
var insertOrderSQL = 'insert into _order SET ?';
var insertProductSQL = "insert into _order_product (order_id, product_id, quantity) VALUES ?";

router.post('/createPayment', function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res, next) {
    var authToken, totalPrice, token, cartModel, cartResult, stripe, currency, description;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            authToken = req.get('Authorization') || "";
            totalPrice = 0;
            _context2.prev = 2;
            token = jwt.verify(authToken, secret);

            // get cart from table (with prices)

            cartModel = new _cartModel2.default(req.body, next, authToken, getCartSQL);
            _context2.next = 7;
            return cartModel.getCart();

          case 7:
            cartResult = _context2.sent;


            cartResult.forEach(function (r) {
              totalPrice += +r.price * +r.quantity;
            });

            stripe = require("stripe")(config.stripeSecret);
            currency = "gbp";
            description = req.body.description;


            stripe.tokens.create({
              card: {
                "number": '4242424242424242',
                "exp_month": 12,
                "exp_year": 2018,
                "cvc": '123'
              }
            }).then(function (token) {
              //console.log('created token', token);
              return stripe.charges.create({
                amount: totalPrice * 100,
                currency: currency,
                description: description,
                source: token.id
              });
            }).then(function () {
              var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(response) {
                var orderModel, orderResult;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        orderModel = new _orderModel2.default({ payment_id: response.id, total_price: totalPrice }, next, authToken, insertOrderSQL, cartResult, insertProductSQL);
                        _context.next = 3;
                        return orderModel.addOrder();

                      case 3:
                        orderResult = _context.sent;


                        res.json(response);

                      case 5:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }()).catch(function (error) {
              console.log('ERROR', error);
              var code = error.statusCode ? error.statusCode : 400;
              res.status(code).json(error);
            });
            _context2.next = 19;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2['catch'](2);

            console.log(_context2.t0);
            res.status(400).json(_context2.t0);

          case 19:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[2, 15]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

module.exports = router;