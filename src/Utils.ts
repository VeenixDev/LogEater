export function getCallerName(): string {
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

export function getTimeStamp(): string {
    const date = new Date();

    return `${String(date.getHours()).padStart(2, "0")}:` +
        `${String(date.getMinutes()).padStart(2, "0")}:` +
        `${String(date.getSeconds()).padStart(2, "0")}:` +
        `${String(date.getMilliseconds()).padStart(4, "0")}`;
}