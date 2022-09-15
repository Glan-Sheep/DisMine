import moment from "moment-timezone";
import chalk from "chalk";

//console.logの先頭にtimestampを付加する
let oldConsole = console.log;
console.log = function(){
  let timestamp = "[" + moment().tz("Asia/Tokyo").format("YYYY/MM/DD HH:mm:ss") + "] ";
  Array.prototype.unshift.call(arguments, chalk.bold(timestamp));
  oldConsole.apply(console, arguments);
};