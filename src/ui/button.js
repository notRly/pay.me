import * as React from 'react';
import {PROFI_RED_COLOR, WHITE_COLOR} from './constants';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Button, Text} from 'native-base';

export default ({onPress, disabled, children}): React.Node => {
  return (
    <TouchableOpacity
      accessibilityComponentType="button"
      disabled={disabled}
      onPress={onPress}
    >
      <Button>
        <Text disabled={disabled}>{children}</Text>
      </Button>
    </TouchableOpacity>
  );
};
