export function getCallerName() {
  try {
      throw new Error();
  }
  catch (e) {
      try {
          return e.stack.split('at ')[3].split(' ')[0];
      } catch (e) {
          return '';
      }
  }
}