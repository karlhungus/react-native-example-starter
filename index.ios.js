import React from 'react-native';
import Components from './App/Components';
import Validations from './App/Utilities/Validations';

var {
  AppRegistry,
  Component,
  View
} = React;

var {
  Field
} = Components;

class StylingExample extends Component {
  renderField() {
    return (
      <Field
        label='Age'
        placeholder='21'
        validations={[Validations.required, Validations.positive, Validations.integer, Validations.lessThan(90)]}
      />
    );
  }

  render() {
    return (
      <View style={{padding: 20, paddingTop: 40}}>
        {this.renderField()}
        {this.renderField()}
      </View>
    );
  }
}

AppRegistry.registerComponent('StylingExample', () => StylingExample);
