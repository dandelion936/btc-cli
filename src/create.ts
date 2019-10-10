import * as path from 'path'
const join = path.join;
import * as fs from 'fs'
const renameSync = fs.renameSync;
const existsSync = fs.existsSync;
import vfs from 'vinyl-fs'
import chalk from 'chalk'
import { isCnFuc, checkAppName, isSafeToCreateProjectIn } from './utils'
import emptyDir from 'empty-dir'
import { info, error, success } from './logger'
import inquirer from 'inquirer'
import through from 'through2'

interface CreateInf {
  isCn: Boolean,
  projectName: String,
  tpl: String,
  mirror: String,
  dest: String,
}

class Create implements CreateInf {
  isCn: boolean = false
  projectName: string = ""
  tpl: string = ""
  mirror: string  = "default"
  dest: string = ""
  constructor(args) {
    this.isCn = isCnFuc(args.language)
    this.projectName = args.project
    this.tpl = join(__dirname, `../template/${args.template}`)
    this.mirror = args.mirror
    this.dest = join(process.cwd(), this.projectName)
    this.create()
  }
  private create() {
    var btcCli = chalk.bold.cyan("Btc-Cli");
    console.log();
    console.log(btcCli + (!this.isCn ? " is booting... " : " 正在启动..."));
    console.log(
      btcCli +
        (!this.isCn ? " will execute init command... " : " 即将执行 init 命令...")
    );
    checkAppName(this.projectName);
    if (existsSync(this.dest) && ! emptyDir.sync(this.dest)) {
      if (!isSafeToCreateProjectIn(this.dest, this.projectName)) {
        process.exit(1);
      }
    }
    this.createApp()
  }
  private createApp() {
    console.log();
    console.log(
      chalk.bold.cyan("Btc-Cli") +
        (!this.isCn
          ? " will creating a new btc app in "
          : " 即将创建一个新的应用在 ") +
        this.dest
    );

    vfs
      .src(["**/*", "!node_modules/**/*"], {
        cwd: this.tpl,
        cwdbase: true,
        dot: true
      })
      .pipe(this.template(this.dest, this.tpl))
      .pipe(vfs.dest(this.dest))
      .on("end", async () => {
        try {
          info("Rename", "gitignore -> .gitignore");
          if(existsSync(join(this.dest, "gitignore"))) {
            renameSync(join(this.dest, "gitignore"), join(this.dest, ".gitignore"));
          }
          if (this.projectName) {
            try {
              var appPackage = require(join(this.dest,"package.json"));
              appPackage.name = this.projectName;
              fs.writeFile(join(this.dest,"package.json"), JSON.stringify(appPackage, null, 2), (err) => {
                if (err) return console.log(err);
              })
              process.chdir(this.projectName);
            } catch (err) {
              console.log(error(err));
            }
          }
          info(
            "Install",
            "We will install dependencies, if you refuse, press ctrl+c to abort, and install dependencies by yourself. :>"
          );
          console.log();
          const { yes } = await inquirer.prompt([{
            name: 'yes',
            message: `Confirm releasing install?`,
            type: 'confirm'
          }])
          if(yes) {
            require("./install")(this.mirror, this.done);
          } else {
            this.done()
          }
        } catch (e) {
          console.log(error(e));
        }
      })
      .resume();
  }
  private done() {
    console.log();
    console.log();
    console.log();
    success(`Congratulation! ${this.projectName} has been created successfully! `);
    console.log();
  }
  private template(dest, cwd) {
    return through.obj(function(file, enc, cb) {
      if (!file.stat.isFile()) {
        return cb();
      }
      info("Copy", file.path.replace(cwd + "/", ""));
      this.push(file);
      cb();
    });
  }
}
module.exports = function(args) {
  new Create(args)
}
