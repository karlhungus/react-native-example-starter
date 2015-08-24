import React from 'react-native';
import Stylish from 'react-native-stylish';
import Branding from '../../Utilities/Branding';

var {
  View,
  Text,
  PropTypes,
  Component
} = React;

class Label extends Component {
  render() {
    return (<View>
      <Text>{this.props.children.toUpperCase()}</Text>
    </View>);
  }
}

Label.propTypes = {
  children: PropTypes.string.isRequired
};

module.exports = Label;
