import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  View,
} from 'react-native';
import {
  BarChart,
  LineChart,
  PieChart,
} from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopCustomersTable from '../Customers';

const screenWidth = Dimensions.get('window').width;

interface Customer {
  id: string;
  name: string;
  fullName: string;
  email: string;
  joined: string;
  orders: number;
}

interface ChartData {
  labels: string[];
  datasets: { data: number[]; strokeWidth?: number; color?: (opacity: number) => string }[];
}

const dummyData: Customer[] = [
  { id: '1', name: 'Khizar', fullName: "Khizar Asim", email: 'khizar@demo.com', joined: '2024-12-01', orders: 34 },
  { id: '2', name: 'Ali', fullName: "Ali Jameel", email: 'ali@demo.com', joined: '2024-11-10', orders: 28 },
  { id: '3', name: 'Sara', fullName: "Sara Unknown", email: 'sara@demo.com', joined: '2024-09-14', orders: 40 },
];

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [barData, setBarData] = useState<ChartData>({ labels: [], datasets: [{ data: [] }] });
  const [lineData, setLineData] = useState<ChartData | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<Customer[]>(dummyData);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setBarData({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{ data: [50, 80, 45, 70, 100, 90] }],
      });

      setLineData({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            data: [40, 60, 65, 85, 95, 100],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          },
        ],
      });

      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    const text = searchText.toLowerCase();
    setExpandedId(null);
    if (text === '') {
      setFilteredData(dummyData);
    } else {
      const filtered = dummyData.filter(
        (item) =>
          item.name.toLowerCase().includes(text) ||
          item.email.toLowerCase().includes(text)
      );
      setFilteredData(filtered);
    }
  }, [searchText]);

  const chartConfig = {
    backgroundGradientFrom: '#f5f5f5',
    backgroundGradientTo: '#f5f5f5',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: { r: '5', strokeWidth: '2', stroke: '#ffa726' },
    strokeWidth: 2,
  };

  const pieData = [
    { name: 'Tech', population: 400000, color: '#3366CC', legendFontColor: '#333', legendFontSize: 14 },
    { name: 'Marketing', population: 300000, color: '#DC3912', legendFontColor: '#333', legendFontSize: 14 },
    { name: 'Sales', population: 200000, color: '#FF9900', legendFontColor: '#333', legendFontSize: 14 },
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };


  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
        <Text className="mt-2">Loading charts...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={null}
        ListHeaderComponent={
          <View>
            <View className="flex-row justify-between mb-5">
              <View className="bg-white p-4 rounded-xl w-[30%] shadow-md">
                <Text className="text-sm text-gray-500">Revenue</Text>
                <Text className="text-lg font-bold text-black mt-1">$25,999</Text>
              </View>
              <View className="bg-white p-4 rounded-xl w-[30%] shadow-md">
                <Text className="text-sm text-gray-500">Users</Text>
                <Text className="text-lg font-bold text-black mt-1">60,000</Text>
              </View>
              <View className="bg-white p-4 rounded-xl w-[30%] shadow-md">
                <Text className="text-sm text-gray-500">Visitors</Text>
                <Text className="text-lg font-bold text-black mt-1">103.5M</Text>
              </View>
            </View>

            <Text className="text-lg font-semibold text-gray-700 mt-4 mb-2">Sales Overview</Text>
            <BarChart data={barData} width={screenWidth - 32} height={220} yAxisLabel="$" yAxisSuffix='' fromZero chartConfig={chartConfig} style={{ borderRadius: 16, marginVertical: 8 }} />

            <Text className="text-lg font-semibold text-gray-700 mt-4 mb-2">Revenue Trend</Text>
            <LineChart data={lineData || { labels: [], datasets: [] }} width={screenWidth - 32} height={220} yAxisLabel="$" fromZero chartConfig={chartConfig} bezier style={{ borderRadius: 16, marginVertical: 8 }} />

            <Text className="text-lg font-semibold text-gray-700 mt-4 mb-2">User Distribution</Text>
            <PieChart data={pieData} width={screenWidth - 40} height={220} chartConfig={chartConfig} accessor="population" backgroundColor="transparent" paddingLeft="0" absolute hasLegend center={[10, 10]} />

            <Text className="text-lg font-semibold text-gray-700 mt-4 mb-2">Top Customers</Text>
          </View>
        }
        ListFooterComponent={
          <TopCustomersTable data={dummyData} />
        }
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
};

export default Home;
