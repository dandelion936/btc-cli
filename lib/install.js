"use strict";

var _crossSpawn = _interopRequireDefault(require("cross-spawn"));

var _which = _interopRequireDefault(require("which"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (mirror, done) {
  var registry,
      resolved,
      pkgtool = "npm";
  mirror = mirror.toLowerCase();

  if (mirror === "yarn" || mirror === "cnpm") {
    try {
      resolved = _which.default.sync(mirror);
      if (resolved) pkgtool = mirror;
    } catch (e) {
      console.log(e);
      return secede((0, _crossSpawn.default)(pkgtool, ["install"], {
        stdio: "inherit"
      }), done);
    }
  } else if (mirror !== "default") {
    registry = ["--registry", require("./mirror")[mirror]];
  }

  return secede((0, _crossSpawn.default)(pkgtool, registry ? [].concat(["install"], registry) : ["install"], {
    stdio: "inherit"
  }), done);
};

function secede(line, done) {
  line.on("close", function (code) {
    done && typeof done === 'function' && done();
    process.exit(code);
  });
  line.on("error", function (reason) {
    console.log("An error occured while executing the NPM command.", reason);
  });
}