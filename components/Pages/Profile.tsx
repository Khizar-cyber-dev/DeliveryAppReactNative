import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
  const navigation = useNavigation();

  const userData = {
    name: "Ayesha",
    title: "Senior Mobile Developer",
    email: "ayesha.ahmad@example.com",
    phone: "+1 (234) 567-8901",
    location: "San Francisco, CA",
    bio: "Passionate about creating beautiful and functional mobile experiences. Specializing in React Native with 5+ years of experience building cross-platform apps.",
    joinDate: "Joined March 2022",
    skills: ["React Native", "TypeScript", "UI/UX Design", "Firebase", "Redux"],
    stats: {
      projects: 24,
      clients: 18,
      experience: "5 years"
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        {/* Header with back button */}
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            className="p-2 bg-white rounded-full shadow-sm"
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color="#4b5563" />
          </TouchableOpacity>
          {/* <TouchableOpacity className="p-2">
            <Ionicons name="ellipsis-vertical" size={20} color="#4b5563" />
          </TouchableOpacity> */}
        </View>

        {/* Profile header */}
        <View className="items-center mb-8">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            }}
            className="w-32 h-32 rounded-full mb-4 border-4 border-white shadow-lg"
          />
          <Text className="text-2xl font-bold text-gray-900 mb-1">{userData.name}</Text>
          <Text className="text-md text-blue-600 font-medium mb-2">{userData.title}</Text>
          <Text className="text-sm text-gray-500">{userData.joinDate}</Text>
        </View>

        {/* Stats */}
        <View className="flex-row justify-around mb-8 bg-white p-4 rounded-xl shadow-sm">
          <View className="items-center">
            <Text className="text-2xl font-bold text-gray-900">{userData.stats.projects}+</Text>
            <Text className="text-sm text-gray-500">Projects</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-gray-900">{userData.stats.clients}</Text>
            <Text className="text-sm text-gray-500">Clients</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-gray-900">{userData.stats.experience}</Text>
            <Text className="text-sm text-gray-500">Experience</Text>
          </View>
        </View>

        {/* Contact Info */}
        <View className="mb-8 bg-white p-5 rounded-xl shadow-sm">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Contact Information</Text>
          
          <View className="flex-row items-center py-3 border-b border-gray-100">
            <View className="bg-blue-50 p-2 rounded-full">
              <Ionicons name="mail-outline" size={18} color="#3b82f6" />
            </View>
            <View className="ml-4">
              <Text className="text-xs text-gray-400">Email</Text>
              <Text className="text-base text-gray-800">{userData.email}</Text>
            </View>
          </View>
          
          <View className="flex-row items-center py-3 border-b border-gray-100">
            <View className="bg-blue-50 p-2 rounded-full">
              <Ionicons name="call-outline" size={18} color="#3b82f6" />
            </View>
            <View className="ml-4">
              <Text className="text-xs text-gray-400">Phone</Text>
              <Text className="text-base text-gray-800">{userData.phone}</Text>
            </View>
          </View>
          
          <View className="flex-row items-center py-3">
            <View className="bg-blue-50 p-2 rounded-full">
              <Ionicons name="location-outline" size={18} color="#3b82f6" />
            </View>
            <View className="ml-4">
              <Text className="text-xs text-gray-400">Location</Text>
              <Text className="text-base text-gray-800">{userData.location}</Text>
            </View>
          </View>
        </View>

        {/* Bio */}
        <View className="mb-8 bg-white p-5 rounded-xl shadow-sm">
          <Text className="text-lg font-semibold text-gray-900 mb-3">About Me</Text>
          <Text className="text-sm text-gray-600 leading-6">{userData.bio}</Text>
        </View>

        {/* Skills */}
        <View className="mb-8 bg-white p-5 rounded-xl shadow-sm">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Skills</Text>
          <View className="flex-row flex-wrap">
            {userData.skills.map((skill, index) => (
              <View key={index} className="bg-blue-50 px-3 py-2 rounded-full mr-2 mb-2">
                <Text className="text-blue-700 text-sm">{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-between mb-6">
          <TouchableOpacity 
            className="flex-1 bg-white border border-gray-200 py-3 rounded-lg mr-3 items-center shadow-sm"
            activeOpacity={0.7}
          >
            <Text className="text-gray-800 font-medium">Share Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-1 bg-blue-600 py-3 rounded-lg items-center shadow-md"
            activeOpacity={0.7}
          >
            <Text className="text-white font-medium">Contact</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          className="bg-white border border-gray-200 py-4 rounded-lg items-center shadow-sm mb-10"
          activeOpacity={0.7}
        >
          <Text className="text-blue-600 text-base font-semibold">Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;