"use strict";

var path = _interopRequireWildcard(require("path"));

var fs = _interopRequireWildcard(require("fs"));

var _vinylFs = _interopRequireDefault(require("vinyl-fs"));

var _chalk = _interopRequireDefault(require("chalk"));

var _utils = require("./utils");

var _emptyDir = _interopRequireDefault(require("empty-dir"));

var _logger = require("./logger");

var _inquirer = _interopRequireDefault(require("inquirer"));

var _through = _interopRequireDefault(require("through2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var join = path.join;
var renameSync = fs.renameSync;
var existsSync = fs.existsSync;

class Create {
  constructor(args) {
    _defineProperty(this, "isCn", false);

    _defineProperty(this, "projectName", "");

    _defineProperty(this, "tpl", "");

    _defineProperty(this, "mirror", "default");

    _defineProperty(this, "dest", "");

    this.isCn = (0, _utils.isCnFuc)(args.language);
    this.projectName = args.project;
    this.tpl = join(__dirname, "../template/".concat(args.template));
    this.mirror = args.mirror;
    this.dest = join(process.cwd(), this.projectName);
    this.create();
  }

  create() {
    var btcCli = _chalk.default.bold.cyan("Btc-Cli");

    console.log();
    console.log(btcCli + (!this.isCn ? " is booting... " : " 正在启动..."));
    console.log(btcCli + (!this.isCn ? " will execute init command... " : " 即将执行 init 命令..."));
    (0, _utils.checkAppName)(this.projectName);

    if (existsSync(this.dest) && !_emptyDir.default.sync(this.dest)) {
      if (!(0, _utils.isSafeToCreateProjectIn)(this.dest, this.projectName)) {
        process.exit(1);
      }
    }

    this.createApp();
  }

  createApp() {
    var _this = this;

    console.log();
    console.log(_chalk.default.bold.cyan("Btc-Cli") + (!this.isCn ? " will creating a new btc app in " : " 即将创建一个新的应用在 ") + this.dest);

    _vinylFs.default.src(["**/*", "!node_modules/**/*"], {
      cwd: this.tpl,
      cwdbase: true,
      dot: true
    }).pipe(this.template(this.dest, this.tpl)).pipe(_vinylFs.default.dest(this.dest)).on("end",
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      try {
        (0, _logger.info)("Rename", "gitignore -> .gitignore");

        if (existsSync(join(_this.dest, "gitignore"))) {
          renameSync(join(_this.dest, "gitignore"), join(_this.dest, ".gitignore"));
        }

        if (_this.projectName) {
          try {
            var appPackage = require(join(_this.dest, "package.json"));

            appPackage.name = _this.projectName;
            fs.writeFile(join(_this.dest, "package.json"), JSON.stringify(appPackage, null, 2), err => {
              if (err) return console.log(err);
            });
            process.chdir(_this.projectName);
          } catch (err) {
            console.log((0, _logger.error)(err));
          }
        }

        (0, _logger.info)("Install", "We will install dependencies, if you refuse, press ctrl+c to abort, and install dependencies by yourself. :>");
        console.log();
        var {
          yes
        } = yield _inquirer.default.prompt([{
          name: 'yes',
          message: "Confirm releasing install?",
          type: 'confirm'
        }]);

        if (yes) {
          require("./install")(_this.mirror, _this.done);
        } else {
          _this.done();
        }
      } catch (e) {
        console.log((0, _logger.error)(e));
      }
    })).resume();
  }

  done() {
    console.log();
    console.log();
    console.log();
    (0, _logger.success)("Congratulation! ".concat(this.projectName, " has been created successfully! "));
    console.log();
  }

  template(dest, cwd) {
    return _through.default.obj(function (file, enc, cb) {
      if (!file.stat.isFile()) {
        return cb();
      }

      (0, _logger.info)("Copy", file.path.replace(cwd + "/", ""));
      this.push(file);
      cb();
    });
  }

}

module.exports = function (args) {
  new Create(args);
};