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
  constructor(props) {
    super(props);

    this.state = {
      focused: props.focused,
      invalid: props.invalid
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      focused: nextProps.focused,
      invalid: nextProps.invalid
    });
  }

  render() {
    var text = this.props.children;
    if(this.props.note) { text += ` ${this.props.note}`; }

    return (
      <View style={this.stylesFor('label')}>
        <Text style={this.stylesFor('text')}>{text.toUpperCase()}</Text>
      </View>
    );
  }
}

Label.propTypes = {
  children: PropTypes.string.isRequired,
  focused: PropTypes.bool,
  invalid: PropTypes.bool,
  note: PropTypes.string
};

Stylish.for(Label)
  .base({
    label: {
      marginBottom: 4
    },

    text: {
      color: Branding.slate,
      fontFamily: Branding.fontBold,
      fontSize: 12
    }
  })
  .states({
    focused: {
      text: {
        color: Branding.blue
      }
    },

    invalid: {
      text: {
        color: Branding.red
      }
    }
  });

module.exports = Label;
