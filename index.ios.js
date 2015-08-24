import React from 'react-native';
import Components from './App/Components';

import Validations from './App/Utilities/Validations';
import Stylish from 'react-native-stylish';

var {
  AppRegistry,
  Component,
  View
} = React;

var {
  Field
} = Components;

class StylingExample extends Component {
  render() {
    return (
      <View style={this.stylesFor('container')}>
        <Field label='Hello' 
        validations={[Validations.number]}/>
        <Field label='Goodbye' />
      </View>
    );
  }
}

Stylish.for(StylingExample).base({
  container: {
    padding: 20,
    paddingTop: 40
  }
});

AppRegistry.registerComponent('StylingExample', () => StylingExample);
