import { getCallerName } from "./Utils";
import fs from 'fs';
// [17:32:55] (ERROR)[UserController]: <Msg>
// [17:33:12] ( INFO)[          Main]: <Msg>
// [17:33:12] (INFO )[Main          ]: <Msg>
// export default class LogEater {


//   public static createLogger(name?: string): Logger {

//     LogEater.log(Levels.INFO, "Mein Anime ist zu ende!");
//   }
// }


// Const logger = LogEater.createLogger({
//   loggerName: 'TestLogger',
//   path: 'dsfiuhsd'
// })

// logger.info('edfuhihasdiuhgiusdhfg')


// [12:33:44] INFO TestLogger edfuhihasdiuhgiusdhfg

export enum LogColors {
	BLACK = "\u001b[30m",
	RED = "\u001b[31m",
	GREEN = "\u001b[32m",
	YELLOW = "\u001b[33m",
	BLUE = "\u001b[34m",
	MAGENTA = "\u001b[35m",
	CYAN = "\u001b[36m",
	WHITE = "\u001b[37m",

	BRIGHT_BLACK = "\u001b[30m;1",
	BRIGHT_RED = "\u001b[31m;1",
	BRIGHT_GREEN = "\u001b[32m;1",
	BRIGHT_YELLOW = "\u001b[33m;1",
	BRIGHT_BLUE = "\u001b[34m;1",
	BRIGHT_MAGENTA = "\u001b[35m;1",
	BRIGHT_CYAN = "\u001b[36m;1",
	BRIGHT_WHITE = "\u001b[37m;1",

	RESET = "\u001b[0m"
}

export type Color = string;
export type Message = Exclude<any, undefined | null>;

export class LogLevel {
	private static _INFO: Color = `${LogColors.GREEN}INFO${LogColors.RESET}`;
	private static _WARNING: Color = `${LogColors.YELLOW}WARNING${LogColors.RESET}`;
	private static _ERROR: Color = `${LogColors.RED}ERROR${LogColors.RESET}`;
	private static _DEBUG: Color = `${LogColors.BLUE}DEBUG${LogColors.RESET}`

	public static get INFO(): Color {
		return this._INFO;
	}

	public static get WARNING(): Color {
		return this._WARNING;
	}

	public static get ERROR(): Color {
		return this._ERROR;
	}

	public static get DEBUG(): Color {
		return this._DEBUG;
	}
}

export default class LogEater {
	private static _defaultDirectory: string = 'logs';

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

	private static printer(logLevel: Color, message: Message, ...optionalParams: Array<any>): void {
		if (message?.stack) this.print(`[${this.getTimeStamp()}] ${logLevel} ${message.stack}`);
		else this.print(`[${this.getTimeStamp()}] ${logLevel} ${message}`);

		if (optionalParams) {
			for (let m of optionalParams) {
				if (message?.stack) this.print(`[${this.getTimeStamp()}] ${logLevel} ${m.stack}`);
				else this.print(`[${this.getTimeStamp()}] ${logLevel} ${message}`);
			}
		}
	}

	private static print(message: Message): void {
		console.log(message);

		if(!fs.existsSync(this.defaultDirectory)) {
			fs.mkdirSync(this.defaultDirectory, { recursive: true});
		}

		const date = new Date();
		const filename = `${String(date.getMonth()).padStart(2, "0")}-` +
			`${String(date.getDay()).padStart(2, "0")}-` +
			`${String(date.getFullYear()).padStart(4, "0")}.log`;

		message = message.replace(/\u001b\[(.{1,2}m)|(.{1,2}m;1)/g, '');

		fs.appendFileSync(`${this.defaultDirectory}/${filename}`, `${message}\n`, { encoding: "utf-8" });
	}

	private static getTimeStamp(): string {
		const date = new Date();

		return `${String(date.getHours()).padStart(2, "0")}:` +
			`${String(date.getMinutes()).padStart(2, "0")}:` +
			`${String(date.getSeconds()).padStart(2, "0")}:` +
			`${String(date.getMilliseconds()).padStart(4, "0")}`;
	}

  public static get defaultDirectory(): string {
		return this._defaultDirectory;
	}
}