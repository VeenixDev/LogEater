import LogColors from './LogColors'

export type Level = string;

export default class LogLevel {
	private static _INFO: Level = `${LogColors.GREEN}INFO${LogColors.RESET}`;
	private static _WARNING: Level = `${LogColors.YELLOW}WARNING${LogColors.RESET}`;
	private static _ERROR: Level = `${LogColors.RED}ERROR${LogColors.RESET}`;
	private static _DEBUG: Level = `${LogColors.BLUE}DEBUG${LogColors.RESET}`

	public static get INFO(): Level {
		return this._INFO;
	}

	public static get WARNING(): Level {
		return this._WARNING;
	}

	public static get ERROR(): Level {
		return this._ERROR;
	}

	public static get DEBUG(): Level {
		return this._DEBUG;
	}
}