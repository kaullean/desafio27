"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _index = _interopRequireDefault(require("../routes/index"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_express.default.json());
app.use((0, _expressSession.default)({
  secret: 'your secret line of secretness',
  resave: true,
  saveUninitialized: true
}));

const publicPath = _path.default.resolve(__dirname, '../../public');

app.use(_express.default.static(publicPath));
app.use(_auth.default.initialize());
app.use(_auth.default.session());

const viewsPath = _path.default.resolve(__dirname, '../../views');

const layoutDirPath = viewsPath + '/layouts';
const defaultLayerPth = viewsPath + '/layouts/main.hbs';
const partialDirPath = viewsPath + '/partials';
app.set('view engine', 'hbs');
app.engine('hbs', (0, _expressHandlebars.default)({
  layoutsDir: layoutDirPath,
  extname: 'hbs',
  defaultLayout: defaultLayerPth,
  partialsDir: partialDirPath
}));
/* Router */

app.use('/', _index.default);
var _default = app;
exports.default = _default;