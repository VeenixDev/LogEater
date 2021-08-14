import LogColors from './LogColors'

export type Color = string;

export default class LogLevel {
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