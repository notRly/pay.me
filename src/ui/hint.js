import * as React from 'react';
import {BLACK_COLOR, PROFI_RED_COLOR} from './constants';
import {Text, View, StyleSheet} from 'react-native';

export default ({children, color}): React.Node => {
  return (
    <View>
      <Text>{children}</Text>
    </View>
  );
};
