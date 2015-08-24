import EventEmitter from 'EventEmitter';
import Dispatcher from '../Dispatcher';

const VALIDATION_ACTION = 'fieldValidation';

var validations = {};
var handleValidations = (action) => {
  validations[action.field] = action;
}
class FieldValidationsStore extends EventEmitter {
  constructor() {
    super();

    Dispatcher.register((action) => {
      if(!action.type === VALIDATION_ACTION) { return; }

      handleValidation(action);
      this.changed();
    });
  }

  changed() {
    this.emit('changed')
  }

  validiationChanged(details) {
    details.type = VALIDATION_ACTION;
    Dispatcher.dispatch(details);
  }

  addChangeListener(callback) {
    this.addListener('changed', callback);
  }

  validity(fieldName) {
    return validations[feildName];
  }
}

module.exports = new FieldValidationsStore;
