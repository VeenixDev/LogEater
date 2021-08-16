import LogColors from '../src/LogColors';
import * as Utils from '../src/Utils';

describe('test utils file', () => {
  describe('test getCallerName function', () => {});

  describe('test getTimeStamp function', () => {
    test('should return a "hh" formatted time', () => {
      expect(Utils.getTimeStamp('hh', 'Europe/Berlin'))
        .toMatch(/^[0-9]{2}$/);
    });

    test('should return a "hh:mm" formatted time', () => {
      expect(Utils.getTimeStamp('hh:mm', 'Europe/Berlin'))
        .toMatch(/^[0-9]{2}:[0-9]{2}$/);
    });

    test('should return a "hh:mm:ss" formatted time', () => {
      expect(Utils.getTimeStamp('hh:mm:ss', 'Europe/Berlin'))
        .toMatch(/^([0-9]{2}:){2}[0-9]{2}$/);
    });

    test('should return a "hh:mm:ss:ms" formatted time', () => {
      expect(Utils.getTimeStamp('hh:mm:ss:ms', 'Europe/Berlin'))
        .toMatch(/^([0-9]{2}:){3}[0-9]{4}$/);
    });
  });

  describe('test getDateStamp function', () => {
    test('should return a "yyyy" formatted date', () => {
      expect(Utils.getDateStamp('yyyy', 'Europe/Berlin'))
        .toMatch(/^[0-9]{4}$/);
    });

    test('should return a "yy" formatted date', () => {
      expect(Utils.getDateStamp('yy', 'Europe/Berlin'))
        .toMatch(/^[0-9]{2}$/);
    });
  
    test('should return a "yy-mm" formatted date', () => {
      expect(Utils.getDateStamp('yy-mm', 'Europe/Berlin'))
        .toMatch(/^[0-9]{2}-[0-9]{2}$/);
    });
  
    test('should return a "yy-mm-dd" formatted date', () => {
      expect(Utils.getDateStamp('yy-mm-dd', 'Europe/Berlin'))
        .toMatch(/^[0-9]{2}-[0-9]{2}-[0-9]{2}$/);
    });
  });

  describe('test generateMessage function', () => {});

  describe('test isObject function', () => {
    test('should return false for string', () => {
      expect(Utils.isObject('')).toBeFalsy();
    });

    test('should return false for number', () => {
      expect(Utils.isObject(1)).toBeFalsy();
    });

    test('should return false for array', () => {
      expect(Utils.isObject([])).toBeFalsy();
    });

    test('should return true for object', () => {
      expect(Utils.isObject({})).toBeTruthy();
    });

    test('should return true for null', () => {
      expect(Utils.isObject(null)).toBeFalsy();
    });

    test('should return true for undefined', () => {
      expect(Utils.isObject(undefined)).toBeFalsy();
    });
  });

  describe('test deepAssign function', () => {
    test('should return merged object', () => {
      const obj1 = { data: 'test', moreData: { hello: 'World'}};
      const obj2 = { test: 'data', moreData: { world: 'Hello', evenMore: { data: 'myData' }}};

      console.log('Hello')
    
      const result = { data: 'test', test: 'data', moreData: { hello: 'World', world: 'Hello', evenMore: { data: 'myData' }}};
      
      Utils.deepAssign(obj1, obj2);
      expect(obj1).toEqual(result);
    });
  });

  describe('test replaceColorCode function', () => {
    test('should return GREEN when pass color green', () => {
      expect(Utils.replaceColorCode(`${LogColors.GREEN}GREEN`)).toEqual('GREEN');
    });

    test('should return BLUE when pass color blue', () => {
      expect(Utils.replaceColorCode(`${LogColors.BLUE}BLUE`)).toEqual('BLUE');
    });
  });
});
