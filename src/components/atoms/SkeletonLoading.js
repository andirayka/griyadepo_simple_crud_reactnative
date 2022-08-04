import {dimens} from '../../constants';
import React from 'react';
import ContentLoader, {BulletList, List} from 'react-content-loader/native';
import {View} from 'react-native';

const loaderProps = {
  backgroundColor: '#D1D5DB',
  foregroundColor: '#6EE7B7',
  style: {marginTop: dimens.standard},
};
// type?: 'content' | 'list' | 'bulletlist'
export const SkeletonLoading = ({type = 'content'}) => {
  const LoaderComponent = () => {
    if (type == 'list') {
      return <List {...loaderProps} />;
    }
    if (type == 'bulletlist') {
      return <BulletList {...loaderProps} />;
    }
    return <ContentLoader {...loaderProps} />;
  };

  return (
    <View style={{flex: 1, padding: dimens.standard}}>
      {[...Array(4)].map((item, index) => {
        return <LoaderComponent key={index} />;
      })}
    </View>
  );
};
