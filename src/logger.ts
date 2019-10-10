import chalk from 'chalk'

function info(type, message) {
	console.log(`${chalk.bold.magenta(type)}: ${chalk.bold.hex('#67C23A')(message)}`);
};

function error(message) {
	console.log(chalk.red(message));
	process.exit(1);
};
function success(message) {
	console.log(chalk.green(message));
};
export {info, error, success}
