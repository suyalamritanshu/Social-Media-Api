"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var Post = require("../models/Post");

var router = require("express").Router();

var User = require("../models/User"); //create a post 


router.post("/", function _callee(req, res) {
  var newPost, savedPost;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          newPost = new Post(req.body);
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(newPost.save());

        case 4:
          savedPost = _context.sent;
          res.status(200).json(savedPost);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          res.status(500).json(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); //update a post

router.put("/:id", function _callee2(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context2.sent;

          if (!(post.userId === req.body.userId)) {
            _context2.next = 10;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(post.updateOne({
            $set: req.body
          }));

        case 7:
          res.status(200).json("Post has been updated successfully");
          _context2.next = 11;
          break;

        case 10:
          res.status(403).json("You cannot update other's post");

        case 11:
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json(_context2.t0);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
}); //delete a post

router["delete"]("/:id", function _callee3(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context3.sent;

          if (!(post.userId === req.body.userId)) {
            _context3.next = 10;
            break;
          }

          _context3.next = 7;
          return regeneratorRuntime.awrap(post.deleteOne());

        case 7:
          res.status(200).json("Post has been deleted successfully.");
          _context3.next = 11;
          break;

        case 10:
          res.status(403).json("You cannot delete other's post");

        case 11:
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json(_context3.t0);

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
}); //like / dislike a post

router.put("/:id/like", function _callee4(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context4.sent;

          if (post.likes.includes(req.body.userId)) {
            _context4.next = 10;
            break;
          }

          _context4.next = 7;
          return regeneratorRuntime.awrap(post.updateOne({
            $push: {
              likes: req.body.userId
            }
          }));

        case 7:
          res.status(200).json("Post has been liked successfully.");
          _context4.next = 13;
          break;

        case 10:
          _context4.next = 12;
          return regeneratorRuntime.awrap(post.updateOne({
            $pull: {
              likes: req.body.userId
            }
          }));

        case 12:
          res.status(200).json("Post has been disliked successfully.");

        case 13:
          _context4.next = 18;
          break;

        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json(_context4.t0);

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 15]]);
}); //get a post

router.get("/:id", function _callee5(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context5.sent;
          res.status(200).json(post);
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json(_context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //get timeline posts

router.get("/timeline/:userId", function _callee6(req, res) {
  var currentUser, userPosts, friendPosts;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.params.userId));

        case 3:
          currentUser = _context6.sent;
          _context6.next = 6;
          return regeneratorRuntime.awrap(Post.find({
            userId: currentUser._id
          }));

        case 6:
          userPosts = _context6.sent;
          _context6.next = 9;
          return regeneratorRuntime.awrap(Promise.all(currentUser.followings.map(function (friendId) {
            return Post.find({
              userId: friendId
            });
          })));

        case 9:
          friendPosts = _context6.sent;
          res.status(200).json(userPosts.concat.apply(userPosts, _toConsumableArray(friendPosts)));
          _context6.next = 16;
          break;

        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json(_context6.t0);

        case 16:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 13]]);
}); //get user's all posts

router.get("/profile/:username", function _callee7(req, res) {
  var user, posts;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            username: req.params.username
          }));

        case 3:
          user = _context7.sent;
          _context7.next = 6;
          return regeneratorRuntime.awrap(Post.find({
            userId: user._id
          }));

        case 6:
          posts = _context7.sent;
          res.status(200).json(posts);
          _context7.next = 13;
          break;

        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          res.status(500).json(_context7.t0);

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
module.exports = router;
//# sourceMappingURL=posts.dev.js.map
