import LogEater from "./LogEater";


LogEater.info('Hello World');
LogEater.warning('Hello World');
LogEater.error('Hello World');


try {
  throw new Error('Hello from the throw function')
} catch (error) {
  LogEater.debug(error); 
}