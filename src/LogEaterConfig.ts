/* Config usable for a Logger */
export default interface Config {
  /** Default options */
  "default"?: LogOptions;

  /** LogLevel error options */
  "error"?: LogOptions;

  /** LogLevel warning options */
  "warning"?: LogOptions;

  /** LogLevel info options */
  "info"?: LogOptions;

  /** LogLevel debug options */
  "debug"?: LogOptions;

  /** The timezone you are located in */
  "timezone"?: string;

  /** File date template */
  "date"?: string;

  /** Log time template */
  "time"?: string;

  /** Message template */
  "message"?: string;
};

/** The options for a LogLevel */
export interface LogOptions {
  path?: string;
  console?: boolean;
  file?: boolean;
}

export const defaultConfig: Config = {
  default: {
    path: 'logs',
    console: true,
    file: true
  },
  info: {
    path: 'logs',
    console: true,
    file: true
  },
  warning: {
    path: 'logs',
    console: true,
    file: true
  },
  error: {
    path: 'logs',
    console: true,
    file: true
  },
  debug: {
    path: 'logs',
    console: true,
    file: true
  },
  timezone: 'Europe/Berlin',
  date: 'yyyy-mm-dd',
  time: 'hh:mm:ss:ms',
  message: '[{{time}}] {{level}} ({{caller}}): {{message}}'
};