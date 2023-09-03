import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { theme, windowWidth } from '../utils/theme'
import { PanGestureHandler } from 'react-native-gesture-handler';

// export default function BarCodeScanner() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true);
//     // You can handle the scanned barcode data here, e.g., send it to an API or display it.
//     alert(`Bar code with type ${type} and data ${data} has been scanned!`);
//   };

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={styles.camera}
//         type={Camera.Constants.Type.back}
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//       >
//         <View style={styles.rectangleContainer}>
//           <View style={styles.rectangle} />
//         </View>
//       </Camera>
//       {scanned && (
//         <TouchableOpacity onPress={() => setScanned(false)} style={styles.scanAgainButton}>
//           <Text style={styles.buttonText}>Scan Again</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//   },
//   camera: {
//     flex: 1,
//   },
//   rectangleContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#00000040',
//   },
//   rectangle: {
//     height: windowWidth - 100,
//     width: windowWidth - 100,
//     borderWidth: 5,
//     borderRadius: 10,
//     borderColor: theme.third,
//     backgroundColor: 'transparent',
//   },
//   scanAgainButton: {
//     backgroundColor: '#007AFF',
//     borderRadius: 5,
//     padding: 10,
//     marginTop: 20,
//     alignSelf: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//   },
// });


export default function BarcodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

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

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      <View style={styles.rectangleContainer}>
        <View style={styles.rectangle} />
      </View>

      {/* Bottom Drawer */}
      <PanGestureHandler>
        <View style={styles.bottomDrawer}>
          {/* Content of the bottom drawer */}
          <Text style={styles.drawerText}>Bottom Drawer Content</Text>
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
    height: '35%', // Adjust this value as needed
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary
  },
});
