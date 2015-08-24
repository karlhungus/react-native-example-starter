var BaseValidation = {
  isPresent(value) { return !!value; },
  isBlank(value) { return !this.isPresent(value); }
};

var Validations = {
  create(validation) {
    var finalValidation = {};
    for(var key of Object.keys(validation)) {
      finalValidation[key] = Object.getOwnPropertyDescriptor(validation, key);
    }

    return Object.create(BaseValidation, finalValidation);
  },

  test(validations, {against}) {
    var checked = [];

    for(var validation of validations) {
      if(checked.indexOf(validation.name) >= 0) { continue; }

      var preValidations = validation.before || [];

      for(var preValidation of preValidations) {
        preValidation = this[preValidation];
        if(!preValidation || checked.indexOf(preValidation.name) >= 0) { continue; }

        if(!preValidation.test(against)) {
          return { passed: false, message: preValidation.message };
        }

        checked.push(preValidation.name);
      }

      if(!validation.test(against)) {
        return { passed: false, message: validation.message };
      }

      checked.push(validation.name);
    }

    return { passed: true };
  }
};

Validations.required = Validations.create({
  name: 'required',

  test(value) {
    return this.isPresent(value);
  },

  message: 'must not be blank'
});

Validations.number = Validations.create({
  name: 'number',

  test(value) {
    if(this.isBlank(value)) { return true; }
    return !isNaN(value);
  },

  message: 'must be a number'
});

Validations.integer = Validations.create({
  name: 'integer',

  before: ['number'],

  test(value) {
    if(this.isBlank(value)) { return true; }
    return (+value % 1) === 0;
  },

  message: 'must be an integer'
});

Validations.positive = Validations.create({
  name: 'positive',

  before: ['number'],

  test(value) {
    if(this.isBlank(value)) { return true; }
    return +value > 0;
  },

  message: 'must be greater than zero'
});

var lessThanValidation = Validations.create({
  before: ['number'],

  test(value) {
    if(this.isBlank(value)) { return true; }
    return +value < this.max;
  },

  get message() { return `must be less than ${this.max}`; }
});

Validations.lessThan = (max) => {
  return Object.create(lessThanValidation, {
    max: { value: max },
    name: { value: `lessThan${max}` }
  });
};

module.exports = Validations;
