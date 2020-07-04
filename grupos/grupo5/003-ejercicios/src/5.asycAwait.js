"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRemoteData = getRemoteData;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
export async function getRemoteData(){
    const objeto = await fetch('https://jsonplaceholder.typicode.com/users')
                    .then((response) => response.json())
                    .then(json => json.map(elemento => 
                        console.log("Nombre de usuario: "+elemento.name+
                        ", Ciudad:"+elemento.address.city)))
                    .catch(error => console.log(error));
}
*/
function getRemoteData() {
  return _getRemoteData.apply(this, arguments);
}

function _getRemoteData() {
  _getRemoteData = _asyncToGenerator(function* () {
    try {
      var response = yield (0, _nodeFetch.default)('https://jsonplaceholder.typicode.com/users');
      var data = yield response.json();
      console.log('Ejecucion con Async/Await:\n');
      data.map(element => console.log(element.name, element.address.city));
    } catch (err) {
      console.log(err);
    }
  });
  return _getRemoteData.apply(this, arguments);
}