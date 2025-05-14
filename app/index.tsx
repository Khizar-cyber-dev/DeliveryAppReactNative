import SignIn from '@/components/auth/signIn';
import Profile from '@/components/Pages/Profile';

import DrawerNavigator from '@/navigation/DrawerNavigator';
import { createStackNavigator } from '@react-navigation/stack';

export type RootStackParamList = {
  SignIn: undefined;
  MainApp: undefined;
  profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="MainApp" component={DrawerNavigator} />
          <Stack.Screen name="profile" component={Profile} />
      </Stack.Navigator>
  );
}
