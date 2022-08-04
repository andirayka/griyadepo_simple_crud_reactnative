import React from 'react';
import {Subheading} from 'react-native-paper';

export const OneLineInfo = ({info}) => {
  return (
    <Subheading>
      <Subheading style={{fontWeight: 'bold', color: '#F59E0B'}}>
        Info:
      </Subheading>{' '}
      {info}
    </Subheading>
  );
};
