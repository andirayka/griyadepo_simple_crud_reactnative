import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {getLocalStorage} from '../utils';
import {AuthContext} from '../context/AuthContext';
import {
  Login,
  PostDetail,
  AddPost,
  CategoryDetail,
  AddCategory,
} from '../screens';
import {AdminDrawer} from './AdminDrawer';

const AppStack = createStackNavigator();

const AppRouter = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    state: {isLoggedIn},
    setIsLoggedIn,
  } = useContext(AuthContext);

  useEffect(() => {
    // Check data
    getLocalStorage('isLoggedIn').then(res => {
      if (res == 1) {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    });

    // clearLocalStorage();
  }, [setIsLoggedIn]);

  // When checking data, show splash screen
  if (isLoading) {
    //   return <Splash />;
    return <></>;
  }

  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        {/* Authentication Stack */}
        {isLoggedIn ? (
          <>
            {/* Admin Stack */}
            <AppStack.Screen name="AdminDrawer" component={AdminDrawer} />
            <AppStack.Screen name="PostDetail" component={PostDetail} />
            <AppStack.Screen name="CategoryDetail" component={CategoryDetail} />
            <AppStack.Screen name="AddPost" component={AddPost} />
            <AppStack.Screen name="AddCategory" component={AddCategory} />
          </>
        ) : (
          <AppStack.Screen name="Login" component={Login} />
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
