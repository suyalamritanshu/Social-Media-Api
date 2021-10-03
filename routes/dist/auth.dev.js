"use strict";

var router = require("express").Router();

var User = require("../models/User");

var bcrypt = require('bcrypt'); //register user


router.post("/register", function _callee(req, res) {
  var salt, hashedPassword, newUser, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 3:
          salt = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, salt));

        case 6:
          hashedPassword = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
          }));

        case 9:
          newUser = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(newUser.save());

        case 12:
          user = _context.sent;
          res.status(200).json(user);
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          res.status(500).json(_context.t0);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
}); //login

router.post('/login', function _callee2(req, res) {
  var user, validPassword;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 3:
          user = _context2.sent;
          !user && res.status(404).json("User not found.");
          _context2.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, user.password));

        case 7:
          validPassword = _context2.sent;
          !validPassword && res.status(404).json("Invalid Password.");
          res.status(200).json(user);
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json(_context2.t0);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
module.exports = router;
//# sourceMappingURL=auth.dev.js.map
