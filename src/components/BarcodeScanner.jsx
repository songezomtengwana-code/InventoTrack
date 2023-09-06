import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { theme, windowWidth } from '../utils/theme'
import { PanGestureHandler } from 'react-native-gesture-handler';
import { ActivityIndicator, FAB } from 'react-native-paper';

export default function BarcodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [flip, setFlip] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // Handle the scanned data as needed (e.g., send to an API, display it).
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const handleCameraFlip = () => {
    setFlip(!flip)
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={flip ? Camera.Constants.Type.front : Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      <View style={styles.rectangleContainer}>
        <View style={styles.rectangle} />
      </View>

      {/* Bottom Drawer */}
      <PanGestureHandler>
        <View style={styles.bottomDrawer}>
          <ActivityIndicator size='large' color={theme.third}></ActivityIndicator>
          <Text style={styles.drawerText}>Waiting For Barcode.</Text>
          <FAB
            icon='camera-flip-outline'
            style={styles.fab}
            onPress={handleCameraFlip}
            mode='flat'
          />
        </View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  camera: {
    flex: 1,
  },
  bottomDrawer: {
    height: '45%', // Adjust this value as needed
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  drawerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary
  },
  fab: {
    position: 'absolute',
    margin: 25,
    right: 0,
    bottom: 0,
    backgroundColor: theme.third,
    color: theme.background
  },
});
