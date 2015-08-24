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

    this.name = `field-${index++}`;

    this.state = {
      focused: false,
      hasContent: !!this.props.value.length,
      invalid: false,
      invalidityReason: null
    };
  }

  componentWillMount() {
    FieldValidationsStore.addChangeListener(::this._onValidationChange);
  }

  componentWillUnmount() {
    FieldValidationsStore.removeChangeListeners();
  }

  _onValidationChange() {
    var validity = FieldValidationsStore.validity(this.name);
    console.log(validity);

    if(!validity) { return; }

    this.setState({
      invalid: !validity.valid,
      invalidityReason: validity.reason
    });
  }

  render() {
    return (
      <View style={this.stylesFor('field')}>
        <Label invalid={this.state.invalid} note={this.state.invalidityReason} focused={this.state.focused}>{this.props.label}</Label>
        <Input {...this.props} name={this.name} invalid={this.state.invalid} focused={this.state.focused} onFocus={() => this.setState({focused: true})} onBlur={() => this.setState({focused: false})} />
        <View style={this.stylesFor('border')} />
      </View>
    );
  }
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  validations: PropTypes.array,
  value: PropTypes.string
};

Field.defaultProps = {
  value: ''
};

Stylish.for(Field)
  .base({
    field: {
      paddingBottom: 2,
      marginBottom: 20
    },

    border: {
      borderBottomColor: Branding.gray,
      borderBottomWidth: 1,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0
    }
  })
  .states({
    focused: {
      border: {
        borderBottomWidth: 2,
        borderBottomColor: Branding.blue
      }
    },

    invalid: {
      border: {
        borderBottomColor: Branding.red
      }
    }
  });

Field.Label = Label;
Field.Input = Input;

module.exports = Field;
