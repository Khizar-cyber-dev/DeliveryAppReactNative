import SignIn from '@/components/auth/signIn';
import OrderDetail from '@/components/OrderDetail';
import Order from '@/components/Pages/AddCustomer';
import OrderPage from '@/components/Pages/OrderPage';
import Profile from '@/components/Pages/Profile';

import DrawerNavigator from '@/navigation/DrawerNavigator';
import { createStackNavigator } from '@react-navigation/stack';

export type RootStackParamList = {
  SignIn: undefined;
  MainApp: undefined;
  profile: undefined;
  Orders: undefined;
  OrderPage: undefined;
  OrderDetail: { order: any };
  Dashboard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="MainApp" component={DrawerNavigator} />
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="Orders" component={Order} />
          <Stack.Screen name="OrderPage" component={OrderPage} />
          <Stack.Screen name="OrderDetail" component={OrderDetail} />
          <Stack.Screen name="Dashboard" component={DrawerNavigator} />
      </Stack.Navigator>
  );
}
