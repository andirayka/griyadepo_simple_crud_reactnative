import React, {useContext} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Title} from 'react-native-paper';
import {dimens} from '../constants';
import {AuthContext} from '../context/AuthContext';
import {Categories, Posts} from '../screens';

const DrawerContainer = createDrawerNavigator();

export const AdminDrawer = () => {
  return (
    <DrawerContainer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#000',
        drawerActiveBackgroundColor: '#FCD34D',
        headerShown: false,
      }}>
      <DrawerContainer.Screen
        name="Posts"
        component={Posts}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              color="black"
              name="newspaper-variant-multiple-outline"
              size={26}
            />
          ),
          drawerLabel: 'Posts',
        }}
      />
      <DrawerContainer.Screen
        name="Categories"
        component={Categories}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons color="black" name="group" size={26} />
          ),
          drawerLabel: 'Categories',
        }}
      />
    </DrawerContainer.Navigator>
  );
};

const CustomDrawerContent = props => {
  const {logout} = useContext(AuthContext);

  return (
    <>
      <DrawerContentScrollView {...props}>
        <Title
          style={{
            marginLeft: dimens.medium,
            marginBottom: dimens.big,
            marginTop: dimens.big,
          }}>
          Halo, Admin Griya Depo
        </Title>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerItem
        label="Keluar"
        onPress={logout}
        icon={() => (
          <MaterialCommunityIcons
            color="black"
            name="logout-variant"
            size={26}
          />
        )}
      />
    </>
  );
};
