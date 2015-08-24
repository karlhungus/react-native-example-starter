import EventEmitter from 'EventEmitter';
import Dispatcher from '../Dispatcher';

const VALIDATION_ACTION = 'fieldValidation';

class FieldValidationsStore extends EventEmitter {
  constructor() {
    Dispatcher.register((action) => {
      if(!action.type === VALIDATION_ACTION) { return; }

      handleValidation(action);
    });
  }
}

module.exports = new FieldValidationsStore;
