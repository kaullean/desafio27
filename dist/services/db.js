"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDb = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const connectDb = () => {
  return _mongoose.default.connect(_config.default.MONGO_ATLAS_URL, {
    useNewUrlParser: true
  });
};

exports.connectDb = connectDb;