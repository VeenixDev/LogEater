/**
 * Config usable for a Logger
 */
export type Config = {
  /**
   * Default options
   */
  default?: LogOptions;
  /**
   * LogLevel error options
   */
  error?: LogOptions;
  /**
   * LogLevel warning options
   */
  warning?: LogOptions;
  /**
   * LogLevel info options
   */
  info?: LogOptions;
  /**
   * LogLevel debug options
   */
  debug?: LogOptions;

  /**
   * Time template
   */
  time?: string;
  /**
   * Message template
   */
  message?: string;
};

/**
 * The options for a LogLevel
 */
export type LogOptions = {
  path?: string;
  console?: boolean;
  file?: boolean;
}