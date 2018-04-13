import * as React from 'react';
import {BLACK_COLOR} from './constants';
import {View, Text, StyleSheet} from 'react-native';

export default ({children}): React.Node => {
  return (
    <View>
      <Text>{children}</Text>
    </View>
  );
};
