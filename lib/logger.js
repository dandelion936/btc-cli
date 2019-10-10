"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.info = info;
exports.error = error;
exports.success = success;

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function info(type, message) {
  console.log("".concat(_chalk.default.bold.magenta(type), ": ").concat(_chalk.default.bold.hex('#67C23A')(message)));
}

;

function error(message) {
  console.log(_chalk.default.red(message));
  process.exit(1);
}

;

function success(message) {
  console.log(_chalk.default.green(message));
}

;