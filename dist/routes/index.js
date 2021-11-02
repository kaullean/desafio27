"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _mensajes = require("../services/mensajes");

var _normalizr = require("normalizr");

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var _path = _interopRequireDefault(require("path"));

var _child_process = require("child_process");

var _config = _interopRequireDefault(require("../config"));

var _os = _interopRequireWildcard(require("os"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const author = new _normalizr.schema.Entity('author', {}, {
  idAttribute: 'email'
});
const msge = new _normalizr.schema.Entity('message', {
  author: author
}, {
  idAttribute: 'time'
});
const msgesSchema = new _normalizr.schema.Array(msge);

const scriptPath = _path.default.resolve(__dirname, '../utils/random.js');

const miRouter = (0, _express.Router)();
miRouter.get('/', async (req, res) => {
  let normalizedMsj = await _mensajes.mensajesService.leer();
  let denormalizedMsj = (0, _normalizr.denormalize)(normalizedMsj.result, msgesSchema, normalizedMsj.entities);
  let data = {
    usuario: req.session.usuario,
    layout: 'index',
    mensajes: denormalizedMsj
  };
  res.render('main', data);
});
miRouter.get('/login', (req, res) => {
  res.render('login');
});
miRouter.get('/auth/facebook', _auth.default.authenticate('facebook', {
  scope: ['email']
}));
miRouter.get('/auth/facebook/callback', _auth.default.authenticate('facebook', {
  successRedirect: '/loginOK',
  failureRedirect: '/loginError'
}));
miRouter.get('/loginOK', (req, res) => {
  let foto = 'noPhoto';
  let email = 'noEmail';

  if (req.isAuthenticated()) {
    const userData = req.user;
    if (userData.photos) foto = userData.photos[0].value;
    if (userData.emails) email = userData.emails[0].value;
    res.render('loginOk', {
      layout: 'main',
      nombre: userData.displayName,
      contador: userData.contador,
      foto,
      email
    });
  } else {
    res.redirect('/login');
  }
});
miRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/api/login');
});
miRouter.get('/info', (req, res) => {
  if (_config.default.MODO == 'CLUSTER') {
    let data = {
      argumentoEntrada: process.argv0,
      nombrePlataforma: process.platform,
      versionNode: process.version,
      memoria: JSON.stringify(process.memoryUsage()),
      path: process.execPath,
      processID: process.pid,
      carpeta: process.cwd(),
      procesadores: _os.default.cpus().length
    };
    res.render('info', data);
  } else {
    let data = {
      argumentoEntrada: process.argv0,
      nombrePlataforma: process.platform,
      versionNode: process.version,
      memoria: JSON.stringify(process.memoryUsage()),
      path: process.execPath,
      processID: process.pid,
      carpeta: process.cwd(),
      procesadores: 1
    };
    res.render('info', data);
  }
});
var _default = miRouter;
exports.default = _default;