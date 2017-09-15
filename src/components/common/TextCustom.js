import React, {
  PropTypes,
  PureComponent,
} from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  default: {
    // fontFamily: 'Roboto-BoldItalic',
    backgroundColor: 'transparent',
    overflow: 'visible',
  },

  h0: {
    fontSize: 36,
  },

  h0_regular: {
    fontSize: 36,
  },

  h1: {
    fontSize: 22,
  },

  h2: {
    fontSize: 19,
  },

  h2_light: {
    fontSize: 19,
  },

  t1: {
    fontSize: 19,
  },

  t1_light: {
    fontSize: 19,
  },

  t1_medium: {
    fontSize: 19,
  },

  t2: {
    fontSize: 16,
  },

  t2_regular: {
    fontSize: 16,
  },

  t2_medium: {
    fontFamily: 'Roboto-BoldItalic',
    fontSize: 16,
  },

  t3: {
    fontSize: 14,
  },

  t3_light: {
    fontSize: 14,
  },
});

class TextCustom extends PureComponent {
  setNativeProps(props) {
    this.text.setNativeProps(props);
  }

  render() {
    return (
      <Text
        ref={(ref) => {
          this.text = ref;
        }}
        {...this.props}
        style={[
          styles.default,
          styles[this.props.type],
          this.props.style,
        ]}
      />
    );
  }
}

TextCustom.defaultProps = {
  style: {},
  type: 't1',
  // onPress: () => {},
};

TextCustom.propTypes = {
  style: PropTypes.any,
  type: PropTypes.string,
};

export { TextCustom };
