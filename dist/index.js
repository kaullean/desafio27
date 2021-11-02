"use strict";

var _config = _interopRequireDefault(require("./config"));

var _server = _interopRequireDefault(require("./services/server"));

var _db = require("./services/db");

var _os = _interopRequireDefault(require("os"));

var _cluster = _interopRequireDefault(require("cluster"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let cpus = _os.default.cpus().length;

const puerto = _config.default.PORT;

if (_config.default.MODO == 'CLUSTER' && _cluster.default.isMaster) {
  console.log(`NUMERO DE CPUS ===> ${cpus}`);
  console.log(`PID MASTER ${process.pid}`);

  for (let i = 0; i < cpus; i++) {
    _cluster.default.fork();
  }
} else {
  const PORT = 8080;

  _server.default.listen(PORT, () => console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`));
}