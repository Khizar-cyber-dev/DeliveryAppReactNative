import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useCustomerStore } from '../../feature/OrderSlice';
import LocationPicker from '../Map';

type DrawerScreenList = {
  Dashboard: undefined;
  Orders: undefined;
  OrderPage: undefined;
  profile: undefined;
  SignIn: undefined;
};

type DrawerNavigationType = DrawerNavigationProp<DrawerScreenList>;

interface AddCustomerProps {
  navigation: DrawerNavigationType;
}

export default function Order({ navigation }: AddCustomerProps) {
  const addCustomer = useCustomerStore((state) => state.addCustomer);
  const [formData, setFormData] = useState({
    customerName: '',
    customerAddress: '',
    mobileNumber: '',
    openingBalance: '',
    zone: '',
  });
  const [location, setLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const { customerName, customerAddress, mobileNumber, openingBalance, zone } = formData;
    
    if (!customerName.trim()) {
      Alert.alert('Error', 'Please enter customer name');
      return false;
    }
    
    if (!customerAddress.trim()) {
      Alert.alert('Error', 'Please enter customer address');
      return false;
    }
    
    if (!mobileNumber.trim() || !/^\d+$/.test(mobileNumber)) {
      Alert.alert('Error', 'Please enter a valid mobile number');
      return false;
    }
    
    if (!openingBalance.trim() || isNaN(Number(openingBalance))) {
      Alert.alert('Error', 'Please enter a valid opening balance');
      return false;
    }
    
    if (!zone.trim()) {
      Alert.alert('Error', 'Please select a zone');
      return false;
    }
    
    if (!location) {
      Alert.alert('Error', 'Please set the location');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      addCustomer({
        id: new Date().getTime().toString(),
        name: formData.customerName,
        address: formData.customerAddress,
        mobileNumber: formData.mobileNumber,
        openingBalance: formData.openingBalance,
        zone: formData.zone,
        location: location,
        createdAt: new Date().toISOString(),
      });
      Alert.alert('Success', 'Customer added successfully!');
      setFormData({
        customerName: '',
        customerAddress: '',
        mobileNumber: '',
        openingBalance: '',
        zone: '',
      });
      setLocation(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to add customer. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeContainer}>
        {/* Custom Header with Menu Icon */}
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 2 }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginRight: 16 }}>
            <Ionicons name="menu" size={28} color="#2c3e50" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2c3e50' }}>Add Customer Order</Text>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Customer Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  value={formData.customerName}
                  onChangeText={(text) => handleInputChange('customerName', text)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Customer Address *</Text>
                <TextInput
                  style={[styles.input, styles.multilineInput]}
                  placeholder="123 Main St, City"
                  value={formData.customerAddress}
                  onChangeText={(text) => handleInputChange('customerAddress', text)}
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Mobile Number *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="03001234567"
                  keyboardType="phone-pad"
                  value={formData.mobileNumber}
                  onChangeText={(text) => handleInputChange('mobileNumber', text)}
                  maxLength={15}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Opening Balance *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="5000"
                  keyboardType="numeric"
                  value={formData.openingBalance}
                  onChangeText={(text) => handleInputChange('openingBalance', text)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Zone *</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={formData.zone}
                    onValueChange={(itemValue) => handleInputChange('zone', itemValue)}
                    style={styles.picker}
                    dropdownIconColor="#666"
                    mode="dropdown"
                    itemStyle={styles.pickerItem}
                  >
                    <Picker.Item label="Select your zone" value="" />
                    <Picker.Item label="North" value="north" />
                    <Picker.Item label="South" value="south" />
                    <Picker.Item label="East" value="east" />
                    <Picker.Item label="West" value="west" />
                  </Picker>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Location *</Text>
                <TouchableOpacity
                  style={[
                    styles.locationButton,
                    location && styles.locationButtonActive
                  ]}
                  onPress={() => setLocationModalVisible(true)}
                >
                  <Text style={styles.buttonText}>
                    {location ? '✓ Location Set' : '+ Set Location'}
                  </Text>
                </TouchableOpacity>
                {location && (
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationText}>
                      Latitude: {location.latitude.toFixed(4)}
                    </Text>
                    <Text style={styles.locationText}>
                      Longitude: {location.longitude.toFixed(4)}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Submit Order</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>

        <LocationPicker
          visible={locationModalVisible}
          onClose={() => setLocationModalVisible(false)}
          onSave={(selectedLocation) => {
            setLocation(selectedLocation);
            setLocationModalVisible(false);
          }}
          initialLocation={location || undefined}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  formContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dfe6e9',
    fontSize: 16,
    color: '#2d3436',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dfe6e9',
    overflow: 'hidden',
    height: 50,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    color: '#2d3436',
    ...Platform.select({
      android: {
        marginTop: -10,
        marginBottom: -10,
      },
    }),
  },
  pickerItem: {
    fontSize: 16,
    ...Platform.select({
      android: {
        height: 50,
        paddingVertical: 10,
      },
      ios: {
        height: 44,
      },
    }),
  },
  locationButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  locationButtonActive: {
    backgroundColor: '#2ecc71',
  },
  locationInfo: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#dfe6e9',
  },
  locationText: {
    fontSize: 14,
    color: '#34495e',
  },
  submitButton: {
    backgroundColor: '#27ae60',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});