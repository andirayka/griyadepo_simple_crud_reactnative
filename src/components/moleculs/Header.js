import {color} from '../../constants';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import React, {FC, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AuthContext} from '../../context/AuthContext';

export const Header = ({title, noBackButton, withFilter, onPressFilter}) => {
  const navigation = useNavigation();
  const {
    state: {userRole},
  } = useContext(AuthContext);

  return (
    <Appbar.Header style={styles.container}>
      {noBackButton ? (
        <Appbar.Action
          icon="reorder-horizontal"
          onPress={() => navigation.toggleDrawer()}
        />
      ) : (
        <Appbar.BackAction onPress={navigation.goBack} />
      )}

      <Appbar.Content title={title} titleStyle={{color: color.btn_black}} />

      {withFilter && (
        <Appbar.Action icon="filter-outline" onPress={onPressFilter} />
      )}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.bg_grey,
  },
});
