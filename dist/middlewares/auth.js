"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.isLoggedIn = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _config = _interopRequireDefault(require("../config"));

var _passportFacebook = require("passport-facebook");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const strategyOptions = {
  clientID: _config.default.FACEBOOK_APP_ID,
  clientSecret: _config.default.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:8080/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails']
};

const loginFunc = async (accessToken, refreshToken, profile, done) => {
  console.log('SALIO TODO BIEN');
  console.log(accessToken);
  console.log(refreshToken);
  console.log(profile);
  return done(null, profile);
};

_passport.default.use(new _passportFacebook.Strategy(strategyOptions, loginFunc));

_passport.default.serializeUser((user, cb) => {
  cb(null, user);
});

_passport.default.deserializeUser((obj, cb) => {
  cb(null, obj);
});

const isLoggedIn = (req, res, done) => {
  if (!req.isAuthenticated()) return res.status(401).json({
    msg: 'Unathorized'
  });
  done();
};

exports.isLoggedIn = isLoggedIn;
var _default = _passport.default;
exports.default = _default;