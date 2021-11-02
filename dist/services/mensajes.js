"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mensajesService = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _normalizr = require("normalizr");

var _util = _interopRequireDefault(require("util"));

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

class MensajesService {
  constructor() {
    this.mensajes = [];
    this.filePath = _path.default.resolve(__dirname, '../../public/mensajes.json');
  }

  async leer() {
    this.mensajes = JSON.parse(await _fs.default.promises.readFile(this.filePath, 'utf-8'));
    let messages = this.mensajes.map(aMsg => ({
      author: aMsg.author,
      text: aMsg.text,
      time: aMsg.time
    })); //let normalizedMessages = normalize(messages, msgesSchema);
    // console.log(util.inspect(normalizedMessages,true,5,true));

    return messages; // return this.mensajes;
  }

  async guardar() {
    await _fs.default.promises.writeFile(this.filePath, JSON.stringify(this.mensajes, null, '\t'));
  }

  async agregar(unMensaje) {
    this.mensajes.push(unMensaje);
    await this.guardar();
    return unMensaje;
  }

}

const mensajesService = new MensajesService();
exports.mensajesService = mensajesService;