import AddCustomer from '@/components/Pages/AddCustomer';
import OrderPage from '@/components/Pages/OrderPage';
import Profile from '@/components/Pages/Profile';
import SignIn from '@/components/auth/signIn';
import CustomDrawerContent from '@/components/sidebar/CustomDrawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import HomeStack from './HomeStack';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        swipeEnabled: true,
      }}
    >
      <Drawer.Screen 
        name="Dashboard" 
        component={HomeStack}
      />
      <Drawer.Screen 
        name="OrderPage" 
        component={OrderPage}
      />
      <Drawer.Screen 
        name="Orders" 
        component={AddCustomer}
      />
      <Drawer.Screen 
        name="profile" 
        component={Profile}
      />
      <Drawer.Screen 
        name="SignIn" 
        component={SignIn}
      />
    </Drawer.Navigator>
  );
}