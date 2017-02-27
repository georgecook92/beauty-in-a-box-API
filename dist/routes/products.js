'use strict';

var _productsModel = require('../model/productsModel.js');

var _productsModel2 = _interopRequireDefault(_productsModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var express = require('express');
var router = express.Router();


router.get('/getAllByCat', function (req, res, next) {
  var emailCheckSQL = 'SELECT * FROM _product where _product.category_id = ?';
  var token = req.get('Authorization') || "";
  var Model = new _productsModel2.default(req.query, res, next, token, emailCheckSQL);
  Model.getAllByCat();
});

router.get('/getAll', function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
    var emailCheckSQL, token, Model, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            emailCheckSQL = 'SELECT * FROM _product';
            token = req.get('Authorization') || "";
            Model = new _productsModel2.default(req.query, res, next, token, emailCheckSQL);
            _context.next = 5;
            return Model.getAll();

          case 5:
            result = _context.sent;

            res.json(result);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

router.get('/getProduct', function (req, res, next) {
  var emailCheckSQL = 'SELECT * FROM _product where _product.product_id = ?';
  var token = req.get('Authorization') || "";
  var Model = new _productsModel2.default(req.query, res, next, token, emailCheckSQL);
  Model.getProduct();
});

router.put('/changeQuantity', function (req, res, next) {
  var changeQuantitySQL = 'update _product set `quantity` = ? where `product_id` = ?';
  var Model = new _productsModel2.default(req.body, res, next, changeQuantitySQL);
  Model.changeProductQuantity();
});

router.put('/changeDiscount', function (req, res, next) {
  var changeDiscountSQL = 'update _product set `discount` = ? where `product_id` = ?';
  var Model = new _productsModel2.default(req.body, res, next, changeDiscountSQL);
  Model.changeDiscount();
});

router.put('/changePrice', function (req, res, next) {
  var changePriceSQL = 'update _product set `price` = ? where `product_id` = ?';
  var Model = new _productsModel2.default(req.body, res, next, changePriceSQL);
  Model.changePrice();
});

module.exports = router;