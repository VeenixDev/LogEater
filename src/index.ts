import fs from "fs";

import { deepAssign, generateMessage, getDateStamp, getCallerName, replaceColorCode } from "./Utils";
import LogLevel, { Level } from "./LogLevel";
import Config, { defaultConfig as defaultCfg } from "./LogEaterConfig";

export type Message = any;

export default class LogEater {
  private static _defaultConfig: Config = defaultCfg;

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
    logLevel: Level,
    message: Message,
    ...optionalParams: Array<any>
  ): void {
    const caller = getCallerName(2);

    this.print(generateMessage(message, this.defaultConfig, logLevel, caller), logLevel);

    for (let oP of optionalParams) {
      this.print(generateMessage(oP, this.defaultConfig, logLevel, caller), logLevel);
    }
  }

  private static print(message: Message, logLevel: Level): void {
    console.log(message)

    // Is needed because the logLevel contains color codes
    logLevel = replaceColorCode(logLevel).toLowerCase();

    const directory = this.defaultConfig[logLevel].path;

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    message = replaceColorCode(message);

    fs.appendFileSync(`${this.defaultConfig[logLevel].path}/${getDateStamp(this.defaultConfig.date, this.defaultConfig.timezone)}.log`, `${message}\n`, {
      encoding: "utf-8",
    });
  }

  public static get defaultConfig() {
    return this._defaultConfig;
  }

  public static set defaultConfig(newConfig: Config) {
    const exclude = ['time', 'message', 'default'];

    if (newConfig.default) {
      for (const entry in this.defaultConfig) {
        if(exclude.includes(entry)) {
          continue;
        }
        
        for (const option in newConfig['default']) {
          if (this.defaultConfig[entry][option] === this.defaultConfig['default'][option]) {
            this._defaultConfig[entry][option] = newConfig['default'][option];
          }
        }
      }
    }
    
    deepAssign(this.defaultConfig, newConfig);
  }
}

module.exports = LogEater;