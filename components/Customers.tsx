import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import SearchBar from './searchBar';

type Customer = {
  id: string;
  name: string;
  fullName: string;
  email: string;
  joined: string;
  orders: number;
};

const TopCustomersTable = ({ data }: { data: Customer[] }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const text = searchText.toLowerCase();
    setExpandedId(null);
    if (text === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (item) =>
          item.name.toLowerCase().includes(text) ||
          item.email.toLowerCase().includes(text)
      );
      setFilteredData(filtered);
    }
  }, [searchText, data]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    Keyboard.dismiss();
  };

  const renderItem = ({ item }: { item: Customer }) => (
    <View>
      <TouchableOpacity
        onPress={() => toggleExpand(item.id)}
        className="flex-row items-center py-3 px-2 bg-white"
      >
        <Text className="flex-[1.5] text-sm text-gray-900">{item.name}</Text>
        <View className="w-px h-full bg-gray-300 mx-2" />
        <Text className="flex-[2] text-sm text-gray-900">{item.email}</Text>
      </TouchableOpacity>

      {expandedId === item.id && (
        <View className="bg-gray-100 px-3 pb-3">
          <Text className="text-sm text-gray-600 mb-1">Date Joined: {item.joined}</Text>
          <Text className="text-sm text-gray-600">Orders: {item.orders}</Text>
        </View>
      )}

      <View className="h-px bg-gray-200" />
    </View>
  );

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 mx-4 mt-6 bg-white mb-8">
          <SearchBar
            placeholder="Search by name or email"
            value={searchText}
            onChangeText={setSearchText}
          />

          <View className="flex-row py-3 px-2 bg-gray-100">
            <Text className="flex-[1.5] font-bold text-sm text-gray-800">Name</Text>
            <Text className="flex-[2] font-bold text-sm text-gray-800">Email</Text>
          </View>

          <View className="h-px bg-gray-200" />

          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={true}
            extraData={expandedId}
            ListEmptyComponent={
              <Text className="text-center mt-4 text-sm text-gray-500">
                No customers found.
              </Text>
            }
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default TopCustomersTable;