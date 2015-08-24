import React from 'react-native';
import Stylish from 'react-native-stylish';
import Branding from '../../Utilities/Branding';
import Validations from '../../Utilities/Validations';

import Label from './FieldLabel';
import Input from './FieldInput';

var {
  View,
  PropTypes,
  Component
} = React;

class Field extends Component {
  render() {}
}

Field.propTypes = {};

Field.defaultProps = {};

Field.Label = Label;
Field.Input = Input;

module.exports = Field;
