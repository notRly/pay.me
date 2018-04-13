import * as React from 'react';
import { LINK_BLUE_COLOR } from './constants';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default ({onPress, text}): React.Node => {
  return (
    <TouchableOpacity
      accessibilityComponentType="button"
      onPress={onPress}>
       <View>
        <Text style={styles.link}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    fontSize: 15,
    color: LINK_BLUE_COLOR,
  },
});