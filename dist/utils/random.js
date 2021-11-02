"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numeroAleatorio = void 0;

const numeroAleatorio = numero => {
  let numerosAleatorios = [];

  for (let i = 0; i < numero; i++) {
    let numeroAleatorio = Math.round(Math.random() * (1001 - 1) + 1001);
    numerosAleatorios.push(numeroAleatorio);
  }

  console.log(numerosAleatorios);
  return numerosAleatorios;
};

exports.numeroAleatorio = numeroAleatorio;
process.on('message', num => {
  console.log('Empezando a generar numeros');
  const rta = numeroAleatorio(num);
  process.send(rta);
});