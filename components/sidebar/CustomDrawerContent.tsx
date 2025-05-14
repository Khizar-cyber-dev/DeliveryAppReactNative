import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function CustomDrawerContent(props: any) {
  return (
    <View className="flex-1 bg-white">
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        {/* Profile Section */}
        <View className="items-center py-6 px-4 border-b border-gray-200">
          <TouchableOpacity onPress={() => props.navigation.navigate('profile')}>
            <View className="items-center mb-4">
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
                }}
                className="w-24 h-24 rounded-full border-4 border-gray-300"
              />
            </View>
            <View className="items-center">
              <Text className="text-lg font-semibold text-gray-900 mb-1">
                Ayesha
              </Text>
              <Text className="text-sm text-gray-500">ayesha@example.com</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View className="px-3 py-2">
          <TouchableOpacity
            className="flex-row items-center py-3 px-4 rounded-lg mb-1"
            onPress={() => props.navigation.navigate('Dashboard')}
          >
            <Ionicons name="home-outline" size={22} color="#6b7280" />
            <Text className="ml-4 text-base font-medium text-gray-700">
              Dashboard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-3 px-4 rounded-lg mb-1">
            <Ionicons name="notifications-outline" size={22} color="#6b7280" />
            <Text className="ml-4 text-base font-medium text-gray-700">
              Notifications
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-3 px-4 rounded-lg mb-1">
            <Ionicons name="document-text-outline" size={22} color="#6b7280" />
            <Text className="ml-4 text-base font-medium text-gray-700">
              Documents
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>

      {/* Footer */}
      <View className="p-4 border-t border-gray-200">
        <TouchableOpacity
          className="flex-row items-center py-3 px-2"
          onPress={() => props.navigation.navigate('profile')}
        >
          <Ionicons name="settings-outline" size={20} color="#6b7280" />
          <Text className="ml-4 text-sm text-gray-700">Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center py-3 px-2"
          onPress={() => props.navigation.navigate('SignIn')}
        >
          <MaterialIcons name="logout" size={20} color="#6b7280" />
          <Text className="ml-4 text-sm text-gray-700">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}