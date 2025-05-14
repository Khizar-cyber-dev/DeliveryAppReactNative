import Home from '@/components/Pages/Home';
import { Feather } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

export default function HomeStack({ navigation }: any) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ paddingHorizontal: 16 }}>
              <Feather name="menu" size={24} />
            </TouchableOpacity>
          ),
          headerTitle: () => <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Dashboard</Text>,
        }}
      />
    </Stack.Navigator>
  );
}
// 📊