'use strict';

var _cartModel = require('../model/cartModel.js');

var _cartModel2 = _interopRequireDefault(_cartModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var express = require('express');
var router = express.Router();


router.get('/getCart', function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
    var emailCheckSQL, token, Model, cartExist, getCartSQL, cartModel, result, createCartSQL, CreateCartModel, createdCart;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            emailCheckSQL = 'SELECT * FROM _cart where user_id = ?';
            token = req.get('Authorization') || "test";
            Model = new _cartModel2.default(req.body, next, token, emailCheckSQL);
            _context.next = 6;
            return Model.checkCartExist();

          case 6:
            cartExist = _context.sent;

            if (!(cartExist.length !== 0)) {
              _context.next = 16;
              break;
            }

            getCartSQL = 'SELECT _product.product_id, _product.product_name, _product.price, _cart_product.quantity, _product.discount  FROM _cart inner join _cart_product on _cart_product.cart_id = _cart.cart_id inner join _product on _product.product_id = _cart_product.product_id where user_id = ?';
            cartModel = new _cartModel2.default(req.body, next, token, getCartSQL);
            _context.next = 12;
            return cartModel.getCart();

          case 12:
            result = _context.sent;

            // will return a success value and data if success == true
            res.json({ data: result, cartId: cartExist[0].cart_id });
            _context.next = 22;
            break;

          case 16:
            createCartSQL = 'insert into _cart SET user_id=?';
            CreateCartModel = new _cartModel2.default(req.body, next, token, createCartSQL);
            _context.next = 20;
            return CreateCartModel.createCart();

          case 20:
            createdCart = _context.sent;

            res.json([]);

          case 22:
            _context.next = 27;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);

          case 27:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 24]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

router.post("/addToCart", function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res, next) {
    var checkSQL, token, CheckCartModel, check, result, addSQL, UpdateCartModel, _addSQL, AddCartModel, cartCheckSQL, Model, cartExist, getCartSQL, cartModel, data;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            // check if product is already in cart - if so update it - else add it

            checkSQL = "SELECT * FROM _cart_product where cart_id = ? AND product_id = ?";
            token = req.get('Authorization') || "";
            CheckCartModel = new _cartModel2.default(req.body, next, token, checkSQL);
            _context2.next = 6;
            return CheckCartModel.checkCartProduct();

          case 6:
            check = _context2.sent;

            console.log('check', check);
            result = void 0;

            if (!(check.length > 0)) {
              _context2.next = 17;
              break;
            }

            // total quantity
            //const quantity = check[0].quantity + parseInt(req.body.quantity);
            // update cart
            addSQL = "UPDATE _cart_product SET quantity = " + parseInt(req.body.quantity) + " where cart_id = ? AND product_id = ?";
            UpdateCartModel = new _cartModel2.default(req.body, next, token, addSQL);
            _context2.next = 14;
            return UpdateCartModel.updateCartProduct();

          case 14:
            result = _context2.sent;
            _context2.next = 22;
            break;

          case 17:
            _addSQL = "INSERT INTO _cart_product SET ?";
            AddCartModel = new _cartModel2.default(req.body, next, token, _addSQL);
            _context2.next = 21;
            return AddCartModel.addToCart();

          case 21:
            result = _context2.sent;

          case 22:
            cartCheckSQL = 'SELECT * FROM _cart where user_id = ?';
            Model = new _cartModel2.default(req.body, next, token, cartCheckSQL);
            _context2.next = 26;
            return Model.checkCartExist();

          case 26:
            cartExist = _context2.sent;
            getCartSQL = 'SELECT _product.product_id, _product.product_name, _product.price, _cart_product.quantity, _product.discount  FROM _cart inner join _cart_product on _cart_product.cart_id = _cart.cart_id inner join _product on _product.product_id = _cart_product.product_id where user_id = ?';
            cartModel = new _cartModel2.default(req.body, next, token, getCartSQL);
            _context2.next = 31;
            return cartModel.getCart();

          case 31:
            data = _context2.sent;

            res.json({ data: data, cartId: cartExist[0].cart_id });
            _context2.next = 38;
            break;

          case 35:
            _context2.prev = 35;
            _context2.t0 = _context2['catch'](0);

            console.log(_context2.t0);

          case 38:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 35]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());

router.delete("/deleteFromCart", function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res, next) {
    var SQL, token, Model, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            SQL = "DELETE FROM _cart_product where cart_id = ? AND product_id = ?";
            token = req.get('Authorization') || "";
            Model = new _cartModel2.default(req.body, next, token, SQL);
            _context3.next = 6;
            return Model.deleteFromCart();

          case 6:
            result = _context3.sent;

            res.json(result);
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3['catch'](0);

            console.log(_context3.t0);

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 10]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());

module.exports = router;