import { Message } from "./LogEater";
import Config from "./LogEaterConfig";
import { Level } from "./LogLevel";

/**
 * Gives you the name of the function which called this method.
 * 
 * This method is needed since you no longer can get this information via function.caller
 * 
 * @param level The amout of levels you want to go the stack down
 * @return The name of the caller function
 */
export function getCallerName(level: number): string {
  try {
      throw new Error();
  }
  catch (e) {
		return e.stack.split('at ')[2 + level]?.split(' ')[0];
  }
}

/**
 * Gets the current timestamp
 * 
 * @retun The current timestamp
 */
export function getTimeStamp(timeTemplate: string, timezone: string): string {
  const ms = new Date().getMilliseconds();
	const date = new Date(new Date().toLocaleString('en-US', { timeZone: timezone }).toString());
	
	let finTime = timeTemplate;

	finTime = finTime.replace(/hh/g, date.getHours().toString().padStart(2, "0"));
	finTime = finTime.replace(/mm/g, date.getMinutes().toString().padStart(2, "0"));
	finTime = finTime.replace(/ss/g, date.getSeconds().toString().padStart(2, "0"));
	finTime = finTime.replace(/ms/g, ms.toString().padStart(4, "0"));
  
	return finTime;
}

/**
 * Gets the current date
 * 
 * @param dateTemplate The templat how the date is structured
 * @param timezone The timezone you want to get the date from
 * @return The current date
 */
export function getDateStamp(dateTemplate: string, timezone: string): string {
	const date = new Date(new Date().toLocaleString('en-US', { timeZone: timezone }).toString());

	let finDate = dateTemplate;

	finDate = finDate.replace(/yyyy/g, date.getFullYear().toString().padStart(4, "0"));
	finDate = finDate.replace(/yy/g, date.getFullYear().toString().substr(-2).padStart(2, "0"));
	finDate = finDate.replace(/mm/g, date.getMonth().toString().padStart(2, "0"));
	finDate = finDate.replace(/dd/g, date.getDate().toString().padStart(2, "0"));

	return finDate;
}

/**
 * Generates the message that gets logged
 * 
 * @param message The actuall message
 * @param messsageTemplate The template defined in the config for the message
 * @param logLevel The level of the log(ex. INFO, ERROR)
 * @param caller The name of the function that is logging
 */
export function generateMessage(message: Message, config: Config, logLevel: Level, caller: string): string {
  let finMsg = config.message;
	
  finMsg = finMsg.replace(/{{message}}/g, message.stack ? message.stack : message);
  finMsg = finMsg.replace(/{{time}}/g, this.getTimeStamp(config.time, config.timezone));
  finMsg = finMsg.replace(/{{level}}/g, logLevel);
  finMsg = finMsg.replace(/{{caller}}/g, caller);

  return finMsg;
}

/**
 * Tests if a given value is an object
 * 
 * @param object The value which gets tested
 * @return If the value is an object 
 */
export function isObject(object: any): boolean {
  return (object && typeof object == 'object' && !Array.isArray(object));
}

/**
 * Deep assigns two objects
 * 
 * @param target The target object where the data gets assigned into
 * @param sources The source objects where the data gets copied from
 * @return The target
 */
export function deepAssign(target: Object, ...sources: Array<Object>): Object {
  if(!sources?.length) return;
  
  if(isObject(target)) {
    for(let source of sources) {

      for(let entry in source) {
        
        if(isObject(source[entry])) {
          if(!target[entry]) {
            target[entry] = {}
            Object.assign(target[entry], source[entry]);
          }

          deepAssign(target[entry], source[entry]);
        } else {
          target[entry] = source[entry];
        }
      }
    }
  }

  return target;
}

/**
 * Replaces ASCII color codes from a string
 * 
 * @param string The string where the codes should get removed
 * @return The string without ASCII color codes
 */
export function replaceColorCode(string: string): string {
  return string.replace(/\u001b\[(.{1,2}m)|(.{1,2}m;1)/g, "")
}
