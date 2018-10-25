
import './old/indexOld.js';
console.log('global calc', new Calc());

// тут будем экспортировать модули что нужны из вне
export * from './components/App.js';
export * from './utils/EventDispatcher';


