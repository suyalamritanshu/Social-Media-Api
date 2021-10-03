"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var User = require("../models/User");

var router = require("express").Router();

var bcrypt = require("bcrypt"); //update user


router.put("/:id", function _callee(req, res) {
  var salt, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.body.userId == req.params.id || req.body.isAdmin)) {
            _context.next = 26;
            break;
          }

          if (!req.body.password) {
            _context.next = 14;
            break;
          }

          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 5:
          salt = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, salt));

        case 8:
          req.body.password = _context.sent;
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", res.status(500).json(err));

        case 14:
          _context.prev = 14;
          _context.next = 17;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.params.id, {
            $set: req.body
          }));

        case 17:
          user = _context.sent;
          res.status(200).json("Account has been updated.");
          _context.next = 24;
          break;

        case 21:
          _context.prev = 21;
          _context.t1 = _context["catch"](14);
          return _context.abrupt("return", res.status(500).json(_context.t1));

        case 24:
          _context.next = 27;
          break;

        case 26:
          return _context.abrupt("return", res.status(403).json("You cannot update this account because you are not the admin"));

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 11], [14, 21]]);
}); //delete user

router["delete"]("/:id", function _callee2(req, res) {
  var salt, user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(req.body.userId == req.params.id || req.body.isAdmin)) {
            _context2.next = 26;
            break;
          }

          if (!req.body.password) {
            _context2.next = 14;
            break;
          }

          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 5:
          salt = _context2.sent;
          _context2.next = 8;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, salt));

        case 8:
          req.body.password = _context2.sent;
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](2);
          return _context2.abrupt("return", res.status(500).json(err));

        case 14:
          _context2.prev = 14;
          _context2.next = 17;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(req.params.id));

        case 17:
          user = _context2.sent;
          res.status(200).json("Account has been deleted successfully.");
          _context2.next = 24;
          break;

        case 21:
          _context2.prev = 21;
          _context2.t1 = _context2["catch"](14);
          return _context2.abrupt("return", res.status(500).json(_context2.t1));

        case 24:
          _context2.next = 27;
          break;

        case 26:
          return _context2.abrupt("return", res.status(403).json("You cannot delete this account because you are not the admin"));

        case 27:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 11], [14, 21]]);
}); //get a particular user

router.get("/", function _callee3(req, res) {
  var userId, username, user, _user$_doc, password, updatedAt, other;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userId = req.query.userId;
          username = req.query.username;
          _context3.prev = 2;

          if (!userId) {
            _context3.next = 9;
            break;
          }

          _context3.next = 6;
          return regeneratorRuntime.awrap(User.findById(userId));

        case 6:
          _context3.t0 = _context3.sent;
          _context3.next = 12;
          break;

        case 9:
          _context3.next = 11;
          return regeneratorRuntime.awrap(User.findOne({
            username: username
          }));

        case 11:
          _context3.t0 = _context3.sent;

        case 12:
          user = _context3.t0;
          _user$_doc = user._doc, password = _user$_doc.password, updatedAt = _user$_doc.updatedAt, other = _objectWithoutProperties(_user$_doc, ["password", "updatedAt"]);
          res.status(200).json(other);
          _context3.next = 20;
          break;

        case 17:
          _context3.prev = 17;
          _context3.t1 = _context3["catch"](2);
          res.status(500).json(_context3.t1);

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 17]]);
}); //get friends

router.get("/friends/:userId", function _callee4(req, res) {
  var user, friends, friendList;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.params.userId));

        case 3:
          user = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(Promise.all(user.followings.map(function (friendId) {
            return User.findById(friendId);
          })));

        case 6:
          friends = _context4.sent;
          friendList = [];
          friends.map(function (friend) {
            var _id = friend._id,
                username = friend.username,
                profilePicture = friend.profilePicture;
            friendList.push({
              _id: _id,
              username: username,
              profilePicture: profilePicture
            });
          });
          res.status(200).json(friendList);
          _context4.next = 15;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json(_context4.t0);

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 12]]);
}); //follow a user
//follow a user

router.put("/:id/follow", function _callee5(req, res) {
  var user, currentUser;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (!(req.body.userId !== req.params.id)) {
            _context5.next = 24;
            break;
          }

          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 4:
          user = _context5.sent;
          _context5.next = 7;
          return regeneratorRuntime.awrap(User.findById(req.body.userId));

        case 7:
          currentUser = _context5.sent;

          if (user.followers.includes(req.body.userId)) {
            _context5.next = 16;
            break;
          }

          _context5.next = 11;
          return regeneratorRuntime.awrap(user.updateOne({
            $push: {
              followers: req.body.userId
            }
          }));

        case 11:
          _context5.next = 13;
          return regeneratorRuntime.awrap(currentUser.updateOne({
            $push: {
              followings: req.params.id
            }
          }));

        case 13:
          res.status(200).json("user has been followed");
          _context5.next = 17;
          break;

        case 16:
          res.status(403).json("you allready follow this user");

        case 17:
          _context5.next = 22;
          break;

        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](1);
          res.status(500).json(_context5.t0);

        case 22:
          _context5.next = 25;
          break;

        case 24:
          res.status(403).json("you cant follow yourself");

        case 25:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 19]]);
}); //unfollow a user

router.put("/:id/unfollow", function _callee6(req, res) {
  var user, currentUser;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (!(req.body.userId !== req.params.id)) {
            _context6.next = 24;
            break;
          }

          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 4:
          user = _context6.sent;
          _context6.next = 7;
          return regeneratorRuntime.awrap(User.findById(req.body.userId));

        case 7:
          currentUser = _context6.sent;

          if (!user.followers.includes(req.body.userId)) {
            _context6.next = 16;
            break;
          }

          _context6.next = 11;
          return regeneratorRuntime.awrap(user.updateOne({
            $pull: {
              followers: req.body.userId
            }
          }));

        case 11:
          _context6.next = 13;
          return regeneratorRuntime.awrap(currentUser.updateOne({
            $pull: {
              followings: req.params.id
            }
          }));

        case 13:
          res.status(200).json("user has been unfollowed");
          _context6.next = 17;
          break;

        case 16:
          res.status(403).json("you dont follow this user");

        case 17:
          _context6.next = 22;
          break;

        case 19:
          _context6.prev = 19;
          _context6.t0 = _context6["catch"](1);
          res.status(500).json(_context6.t0);

        case 22:
          _context6.next = 25;
          break;

        case 24:
          res.status(403).json("you cant unfollow yourself");

        case 25:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 19]]);
});
module.exports = router;
//# sourceMappingURL=users.dev.js.map
