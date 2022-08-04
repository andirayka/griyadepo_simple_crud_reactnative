import {dimens, color} from '../../constants';
import React, {FC} from 'react';
import {FAB} from 'react-native-paper';

export const FABList = ({label, onPress}) => {
  return (
    <FAB
      style={{
        position: 'absolute',
        margin: dimens.large_26,
        right: 0,
        bottom: 0,
        backgroundColor: color.green_500,
      }}
      color="black"
      label={label}
      icon="plus"
      onPress={onPress}
    />
  );
};
