"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCnFuc = isCnFuc;
exports.checkAppName = checkAppName;
exports.isSafeToCreateProjectIn = isSafeToCreateProjectIn;

var fs = _interopRequireWildcard(require("fs"));

var path = _interopRequireWildcard(require("path"));

var _chalk = _interopRequireDefault(require("chalk"));

var _validateNpmPackageName = _interopRequireDefault(require("validate-npm-package-name"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var unlinkSync = fs.unlinkSync;

function isCnFuc(language) {
  return language === "cn" ? true : false;
}

function printValidationResults(results) {
  if (typeof results !== 'undefined') {
    results.forEach(error => {
      console.error(_chalk.default.red("  *  ".concat(error)));
    });
  }
}

function checkAppName(appName) {
  var validationResult = (0, _validateNpmPackageName.default)(appName);

  if (!validationResult.validForNewPackages) {
    console.error("Could not create a project called ".concat(_chalk.default.red("\"".concat(appName, "\"")), " because of npm naming restrictions: "));
    printValidationResults(validationResult.errors);
    printValidationResults(validationResult.warnings);
    process.exit(1);
  }
}

function isSafeToCreateProjectIn(root, name) {
  // These files should be allowed to remain on a failed install,
  // but then silently removed during the next create.
  var errorLogFilePatterns = ['npm-debug.log', 'yarn-error.log', 'yarn-debug.log'];
  var validFiles = ['.DS_Store', 'Thumbs.db', '.git', '.gitignore', '.idea', 'README.md', 'LICENSE', 'web.iml', '.hg', '.hgignore', '.hgcheck', '.npmignore', 'mkdocs.yml', 'docs', '.travis.yml', '.gitlab-ci.yml', '.gitattributes'];
  console.log();
  var conflicts = fs.readdirSync(root).filter(file => !validFiles.includes(file)) // Don't treat log files from previous installation as conflicts
  .filter(file => !errorLogFilePatterns.some(pattern => file.indexOf(pattern) === 0));

  if (conflicts.length > 0) {
    console.log("The directory ".concat(_chalk.default.green(name), " contains files that could conflict:"));
    console.log();

    for (var file of conflicts) {
      console.log("  ".concat(file));
    }

    console.log();
    console.log('Either try using a new directory name, or remove the files listed above.');
    return false;
  } // Remove any remnant files from a previous installation


  var currentFiles = fs.readdirSync(path.join(root));
  currentFiles.forEach(file => {
    errorLogFilePatterns.forEach(errorLogFilePattern => {
      // This will catch `(npm-debug|yarn-error|yarn-debug).log*` files
      if (file.indexOf(errorLogFilePattern) === 0) {
        unlinkSync(path.join(root, file));
      }
    });
  });
  return true;
}