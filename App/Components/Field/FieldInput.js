import React from 'react-native';
import Stylish from 'react-native-stylish';
import Branding from '../../Utilities/Branding';
import Validations from '../../Utilities/Validations';
import FieldValidationsStore from '../../Stores/FieldValidationsStore';

var {
  Component,
  TextInput,
  PropTypes
} = React;

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: this.props.value,
      invalid: true
    };
  }

  _onInput(text) {
    this.setState({text});

    var validationResult = Validations.test(this.props.validations, {against: text});

    FieldValidationsStore.updateValidation({
      field: this.props.name,
      valid: validationResult.passed,
      reason: validationResult.message
    });
  }

  render() {
    return (
      <TextInput style={this.stylesFor('input')} onChangeText={::this._onInput} {...this.props} value={this.state.text} />
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  onValidationChange: PropTypes.func,
  validations: PropTypes.array,
  value: PropTypes.string
};

Input.defaultProps = {
  validations: [],
  value: ''
};

Stylish.for(Input).base({
  input: {
    height: 30,
    color: Branding.black,
    fontFamily: Branding.font,
    fontSize: 16
  }
});

module.exports = Input;
