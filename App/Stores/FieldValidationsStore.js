import EventEmitter from 'EventEmitter';
import Dispatcher from '../Dispatcher';

const VALIDATION_ACTION = 'fieldValidation';

var validations = {};
var handleValidation = (action) => {
  validations[action.field] = action;
}

class FieldValidationsStore extends EventEmitter {
  constructor() {
    super();

    Dispatcher.register((action) => {
      console.log(action);
      if(action.type !== VALIDATION_ACTION) { return; }

      handleValidation(action);
      this.changed();
    });
  }

  changed() {
    this.emit('change');
  }

  addChangeListener(listener) {
    this.addListener('change', listener);
  }

  removeChangeListeners() {
    this.removeAllListeners();
  }

  updateValidation(details) {
    details.type = VALIDATION_ACTION;
    Dispatcher.dispatch(details);
  }

  validity(fieldName) {
    return validations[fieldName];
  }
}

module.exports = new FieldValidationsStore;
