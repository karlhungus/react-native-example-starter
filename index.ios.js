import React from 'react-native';
import Components from './App/Components';

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
      <View />
    );
  }
}

AppRegistry.registerComponent('StylingExample', () => StylingExample);
