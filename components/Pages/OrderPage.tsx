import { useCustomerStore } from '@/feature/OrderSlice';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type DrawerScreenList = {
  Dashboard: undefined;
  Orders: undefined;
  OrderPage: undefined;
  profile: undefined;
  SignIn: undefined;
};

type DrawerNavigationType = DrawerNavigationProp<DrawerScreenList>;

interface OrderPageProps {
  navigation: DrawerNavigationType;
}

type TabType = 'today' | 'history' | 'all';

const OrderPage = ({ navigation }: OrderPageProps) => {
    const customers = useCustomerStore((state) => state.customers);
    const [activeTab, setActiveTab] = useState<TabType>('today');

    const filteredCustomers = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        switch (activeTab) {
            case 'today':
                return customers.filter(customer => {
                    const customerDate = new Date(customer.createdAt);
                    return customerDate >= today;
                });
            case 'history':
                return customers.filter(customer => {
                    const customerDate = new Date(customer.createdAt);
                    return customerDate < today;
                });
            default:
                return customers;
        }
    }, [customers, activeTab]);
    
    return (
        <SafeAreaView style={styles.container}>
            {/* Header with menu button */}
            {/* <View style={styles.headerContainer}>
                <TouchableOpacity 
                    style={styles.menuButton}
                    onPress={() => navigation.openDrawer()}
                >
                    <MaterialIcons name="menu" size={24} color="#4a6da7" />
                </TouchableOpacity>
                <Text style={styles.header}>Customer List</Text>
                <View style={styles.menuButtonPlaceholder} />
            </View> */}
             <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}  style={styles.menuButton}>
            <Ionicons name="menu" size={28} color="#2c3e50" />
          </TouchableOpacity>
          <Text style={styles.header}>Add Customer Order</Text>
        </View>

            {/* Tab Navigation */}
            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'today' && styles.activeTab]}
                    onPress={() => setActiveTab('today')}
                >
                    <Text style={[styles.tabText, activeTab === 'today' && styles.activeTabText]}>Today</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'history' && styles.activeTab]}
                    onPress={() => setActiveTab('history')}
                >
                    <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>History</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'all' && styles.activeTab]}
                    onPress={() => setActiveTab('all')}
                >
                    <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>All</Text>
                </TouchableOpacity>
            </View>
            
            {filteredCustomers.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <MaterialIcons name="people-outline" size={60} color="#ccc" />
                    <Text style={styles.emptyText}>No customers found</Text>
                </View>
            ) : (
                <View style={styles.listContainer}>
                    {filteredCustomers.map((customer) => (
                        <View key={customer.id} style={styles.card}>
                            <View style={styles.cardHeader}>
                                <MaterialIcons name="person" size={24} color="#4a6da7" />
                                <Text style={styles.name}>{customer.name}</Text>
                            </View>
                            
                            <View style={styles.detailRow}>
                                <MaterialIcons name="account-balance-wallet" size={18} color="#666" />
                                <Text style={styles.detailText}>
                                    Balance: <Text style={styles.balanceText}>${customer.openingBalance}</Text>
                                </Text>
                            </View>
                            
                            <View style={styles.detailRow}>
                                <MaterialIcons name="location-on" size={18} color="#666" />
                                <Text style={styles.detailText} numberOfLines={2}>{customer.address}</Text>
                            </View>

                            <View style={styles.detailRow}>
                                <MaterialIcons name="access-time" size={18} color="#666" />
                                <Text style={styles.detailText}>
                                    Added: {new Date(customer.createdAt).toLocaleString()}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
        paddingHorizontal: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingTop: 10,
    },
    menuButton: {
        padding: 8,
    },
    menuButtonPlaceholder: {
        width: 40, 
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        textAlign: 'center',
        flex: 1,
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 4,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: '#4a6da7',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    activeTabText: {
        color: '#fff',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#95a5a6',
        marginTop: 10,
    },
    listContainer: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        marginLeft: 10,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    detailText: {
        fontSize: 14,
        color: '#7f8c8d',
        marginLeft: 8,
        flex: 1,
    },
    balanceText: {
        fontWeight: 'bold',
        color: '#27ae60',
    },
});

export default OrderPage;