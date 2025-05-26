import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface Coordinate {
  latitude: number;
  longitude: number;
}

type LocationPickerProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (selectedLocation: Coordinate | null) => void;
  initialLocation?: Coordinate;
};

export default function LocationPicker({ 
  visible, 
  onClose, 
  onSave, 
  initialLocation 
}: LocationPickerProps) {
  const [location, setLocation] = useState<Coordinate | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Coordinate | null>(null);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!visible) return;
    
    const initializeLocation = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Location permission denied');
          return;
        }

        let coords: Coordinate;
        if (initialLocation) {
          coords = initialLocation;
        } else {
          const loc = await Location.getCurrentPositionAsync({});
          coords = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          };
        }
        setLocation(coords);
        setSelectedLocation(coords);
      } catch (err) {
        setError('Failed to get location');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeLocation();
  }, [visible, initialLocation]);

  const handleMapPress = (event: any) => {
    const coords = event.nativeEvent.coordinate;
    setSelectedLocation(coords);
  };

  const searchLocation = async () => {
    if (!search.trim()) {
      setError('Please enter a location to search');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      let query = search;
      if (!/lahore/i.test(search) || !/pakistan/i.test(search)) {
        query = `${search}, Lahore, Pakistan`;
      }

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
        {
          headers: {
            'User-Agent': 'DeliveryApp/1.0',
            'Accept-Language': 'en',
          },
        }
      );

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const coords = {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        };
        setSelectedLocation(coords);
        setLocation(coords);
      } else {
        setError('Location not found');
      }
    } catch (err) {
      setError('Failed to search location');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!selectedLocation) {
      setError('Please select a location');
      return;
    }
    onSave(selectedLocation);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.input}
            placeholder="Search location..."
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={searchLocation}
            returnKeyType="search"
          />
          <TouchableOpacity 
            style={styles.searchButton} 
            onPress={searchLocation}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={{ color: 'white' }}>Search</Text>
            )}
          </TouchableOpacity>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {isLoading && !location ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : location ? (
          <MapView
            style={styles.map}
            region={{
              latitude: selectedLocation?.latitude ?? location.latitude,
              longitude: selectedLocation?.longitude ?? location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onPress={handleMapPress}
          >
            {selectedLocation && (
              <Marker
                coordinate={selectedLocation}
                title="Selected Location"
                draggable
                onDragEnd={e => setSelectedLocation(e.nativeEvent.coordinate)}
              />
            )}
          </MapView>
        ) : (
          <View style={styles.loadingContainer}>
            <Text>Unable to load map</Text>
          </View>
        )}

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.button, !selectedLocation && styles.disabledButton]} 
            onPress={handleSave}
            disabled={!selectedLocation}
          >
            <Text style={styles.buttonText}>Save Location</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: 'gray' }]} 
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: { 
    flex: 1,
    backgroundColor: 'white',
  },
  searchBox: {
    flexDirection: 'row',
    padding: 10,
    gap: 5,
    zIndex: 10,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40,
  },
  searchButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 6,
    alignItems: 'center',
    minWidth: 60,
  },
  map: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  errorContainer: {
    padding: 10,
    backgroundColor: '#ffebee',
    marginHorizontal: 10,
    borderRadius: 5,
  },
  errorText: {
    color: '#d32f2f',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});