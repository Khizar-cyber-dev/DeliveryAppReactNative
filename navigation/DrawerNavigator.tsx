import CustomDrawerContent from '@/components/sidebar/CustomDrawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import HomeStack from './HomeStack';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Dashboard" component={HomeStack} />
    </Drawer.Navigator>
  );
}