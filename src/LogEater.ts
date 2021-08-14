import fs from "fs";

import { getCallerName, getTimeStamp } from "./Utils";
import LogLevel from "./LogLevel";
import { Color } from "./LogLevel";
import { Config } from "./LogEaterConfig";


export type Message = Exclude<any, undefined | null>;

export default class LogEater {
  private static _defaultDirectory: string = "logs";
  private static _defaultConfig: Config = {
		default: {
			path: 'logs',
			console: true,
			file: true
		},
		time: 'hh:mm:ss',
		message: '[&{{time}}] &{{logLevel}} ({{caller}}): {{message}}'
  };

  public static info(message: Message, ...optionalParams: Array<any>): void {
    this.printer(LogLevel.INFO, message, ...optionalParams);
  }

  public static warning(message: Message, ...optionalParams: Array<any>): void {
    this.printer(LogLevel.WARNING, message, ...optionalParams);
  }

  public static error(message: Message, ...optionalParams: Array<any>): void {
    this.printer(LogLevel.ERROR, message, ...optionalParams);
  }

  public static debug(message: Message, ...optionalParams: Array<any>): void {
    this.printer(LogLevel.DEBUG, message, ...optionalParams);
  }

  private static printer(
    logLevel: Color,
    message: Message,
    ...optionalParams: Array<any>
  ): void {
    if (message?.stack)
      this.print(`[${getTimeStamp()}] ${logLevel} ${message.stack}`);
    else this.print(`[${getTimeStamp()}] ${logLevel} ${message}`);

    if (optionalParams) {
      for (let m of optionalParams) {
        if (message?.stack)
          this.print(`[${getTimeStamp()}] ${logLevel} ${m.stack}`);
        else this.print(`[${getTimeStamp()}] ${logLevel} ${message}`);
      }
    }
  }

  private static print(message: Message): void {
    console.log(message);

    if (!fs.existsSync(this.defaultDirectory)) {
      fs.mkdirSync(this.defaultDirectory, { recursive: true });
    }

    const date = new Date();
    const filename =
      `${String(date.getMonth()).padStart(2, "0")}-` +
      `${String(date.getDay()).padStart(2, "0")}-` +
      `${String(date.getFullYear()).padStart(4, "0")}.log`;

    message = message.replace(/\u001b\[(.{1,2}m)|(.{1,2}m;1)/g, "");

    fs.appendFileSync(`${this.defaultDirectory}/${filename}`, `${message}\n`, {
      encoding: "utf-8",
    });
  }

  public static get defaultDirectory() {
    return LogEater._defaultDirectory;
  }
}
