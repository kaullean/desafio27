"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _minimist = _interopRequireDefault(require("minimist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config(); // const args_parse = () => {
//   return minimist(process.argv.slice(2));
// }


const args_parse = () => {
  const len = [];
  process.argv.slice(2).map(i => i.indexOf("=") ? i.split("=").forEach(it => len.push(it)) : len.push(i));
  if (len.length % 2 !== 0) return false;
  const argPairs = {};

  for (let i = 0; i < len.length; i += 2) argPairs[len[i].replace(/-+/gi, "")] = len[i + 1];

  return argPairs;
};

let argumentos = args_parse();
var _default = {
  MONGO_ATLAS_URL: process.env.MONGO_ATLAS_SRV,
  PORT: argumentos.PORT || process.env.PORT,
  FACEBOOK_APP_ID: argumentos.FACEBOOK_CLIENT_ID || process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_APP_SECRET: argumentos.FACEBOOK_CLIENT_SECRET || process.env.FACEBOOK_CLIENT_SECRET,
  MODO: argumentos.MODO
};
/*
MONGO_ATLAS_USER=ponelatuya
MONGO_ATLAS_PASSWORD=ponelatuya
MONGO_ATLAS_SRV=ponelatuya
MONGO_ATLAS_DBNAME=ponelatuya
MONGO_LOCAL_DBNAME=ponelatuya
FACEBOOK_CLIENT_ID=ponelatuya
FACEBOOK_CLIENT_SECRET=ponelatuya
PORT=ponelatuya

Para pasar los argumentos por json utilizar
 "start": "node ./src/index.js PORT=8080 FACEBOOK_CLIENT_ID= FACEBOOK_CLIENT_SECRET="
*/

exports.default = _default;