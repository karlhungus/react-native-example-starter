import React from 'react-native';
import Stylish from 'react-native-stylish';
import Branding from '../../Utilities/Branding';
import Validations from '../../Utilities/Validations';

import FieldValidationsStore from '../../Stores/FieldValidationsStore';

var {
  Component,
  TextInput,
  View,
  PropTypes
} = React;

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      text: ''
    }
  }

  _updateText(text) {
    console.log("text")
    this.setState({
      text //same as text: text
    });

    var currentValidation = Validations.test(this.props.validations, {against: text});

    FieldValidationsStore.validationChanged({
      field: this.props.field,
      validity: currentValidation.passed
    });
  }

  render() {
   return (
       <View style={this.stylesFor('border')} >
         <TextInput
           onChangeText={(text) => this._updateText()}
           onFocus={() => this.setState({focused: true})}
           onBlur={() => this.setState({focused: false})}
           style={this.stylesFor('input')}
           />
       </View>
       );
  }
}

Stylish.for(Input).base({
  border: {
    borderBottomWidth: 1,
    borderBottomColor: Branding.gray
  },
  input: {
    height: 30
  }
}).states({
  focused: {
             border: {
                       borderBottomColor: Branding.blue
                     }
           }
});

Input.propTypes = {
  validations: PropTypes.array
};

Input.defaultProps = {
  validations: []
};

module.exports = Input;
