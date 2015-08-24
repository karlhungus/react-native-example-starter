import React from 'react-native';
import Stylish from 'react-native-stylish';
import Branding from '../../Utilities/Branding';
import Validations from '../../Utilities/Validations';

import FieldValidationsStore from '../../Stores/FieldValidationsStore';

import Label from './FieldLabel';
import Input from './FieldInput';

var {
  View,
  PropTypes,
  Component
} = React;

var index = 0;

class Field extends Component {
  constructor(props) {
    super(props);

    this.name = 'field${index++}'
    this.state = {invalid: false};
  }

  componentWillMount() {
    FieldValidationsStore.addChangeListener(() => {
      var validity = FieldValidationsStore.validity(this.name);
      this.setState({invalid: !validity.valid})
    });
  }
  render() {
    return (
      <View>
        <Label>{this.props.label}</Label>
        <Input 
          invalid={this.state.invalid} 
          validations={this.props.validations}
          field={this.name}/>
      </View>
    );
  }
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  validations: PropTypes.array
};

Field.defaultProps = {
  validations: []
};

Field.Label = Label;
Field.Input = Input;

module.exports = Field;
