import React from 'react';
import {View} from 'react-native';

// Spacing helper to arrange layouts
export const Gap = ({x, y}) => {
  return <View style={{marginLeft: x, marginTop: y}} />;
};
