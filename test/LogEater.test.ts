import Config from "../src/LogEaterConfig";
import LogEater from "../src/LogEater";
import { mocked } from 'ts-jest/utils';
import fs from 'fs';

global.console.log = jest.fn();
fs.existsSync = jest.fn().mockReturnValue(false);

const promises = {
  appendFile: jest.fn()
}

describe('test LogEater functions', () => {
  const config: Config = LogEater.defaultConfig;
  const date = new Date(new Date().toLocaleString('en-US', { timeZone: config.timezone }).toString());

  let finDate = config.message;

  finDate = finDate.replace(/yyyy/g, date.getFullYear().toString().padStart(4, "0"));
  finDate = finDate.replace(/yy/g, date.getFullYear().toString().substr(-2).padStart(2, "0"));
  finDate = finDate.replace(/mm/g, date.getMonth().toString().padStart(2, "0"));
  finDate = finDate.replace(/dd/g, date.getDate().toString().padStart(2, "0"));

  describe('test info function', () => {
    beforeEach(() => {
      mocked(promises.appendFile as jest.Mock).mockImplementation(() => {
        throw new Error();
      });
    });
    test('should log info message', () => {
      LogEater.info('info');

      expect(global.console.log).toBeCalled();
    });
  })
  
  describe('test warning function', () => {
    test('should log warning message', () => {
      LogEater.warning('warning');
      
      expect(global.console.log).toBeCalled();
    });
  });

  describe('test error function', () => {
    test('should log error message', () => {
      LogEater.error('error');

      expect(global.console.log).toBeCalled();
    });
  });

  describe('test debug function', () => {
    test('should log debug message', () => {
      LogEater.debug('debug');
      
      expect(global.console.log).toBeCalled();
    });
  });

  describe('optional parameter', () => {
    test('should loop over the optional parameter', () => {
      LogEater.debug('optional', 'parameters');

      expect(global.console.log).toBeCalled();
    });
  });

  describe('test setter for defaultConfig', () => {
    test('should update defaultConfig', () => {
      const def = {...LogEater.defaultConfig};

      LogEater.defaultConfig = {
        default: {
          console: false,
        },
        timezone: 'Europe/Berlin',
        date: 'dd-mm-yyyy',
        time: 'hh:mm:ss',
        message: '[{{time}}] {{level}}: {{message}}'
      };

      expect(def).not.toEqual(LogEater.defaultConfig);

    });
  });
});