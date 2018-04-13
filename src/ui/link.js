import * as React from 'react';
import { LINK_BLUE_COLOR } from './constants';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default ({onPress, children}): React.Node => {
  return (
    <TouchableOpacity
      accessibilityComponentType="button"
      onPress={onPress}>
       <View>
        <Text style={styles.link}>{children}</Text>
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