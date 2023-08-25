import 'react-native-gesture-handler';
import React, { Component } from 'react';
import CreateAccount from './src/screens/CreateAccount';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import SignIn from './src/screens/SignIn';
import { ConfigureAccount } from './src/screens/ConfigureAccount';
import { HomeScreen } from './src/screens/HomeScreen';
import AddStore from './src/screens/Home/AddStore';
import StoreDashboard from './src/screens/Store/StoreDashboard';

// Main Screens
import { theme } from './src/utils/theme';
import AddStoreProduct from './src/screens/Store/AddStoreProduct';
import UpdateStoreProduct from './src/screens/Store/UpdateStoreProduct';
import ScannerScreen from './src/screens/Home/ScannerScreen';
import ManageSettingsScreen from './src/screens/Settings/ManageSettingsScreen';
import EditStoreProduct from './src/screens/Store/EditStoreProduct';
import ManageNotificationsScreen from './src/screens/Settings/ManageNotificationsScreen';
import BarcodeScanner from './src/components/BarcodeScanner';
import AddProductScanner from './src/screens/Home/Scanners/AddProductScanner';
import SearchStoreProduct from './src/screens/Store/SearchStoreProduct';

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='signin' screenOptions={{ cardStyle: { backgroundColor: theme.background }, gestureEnabled: true, animationTypeForReplace: 'push', }} >
          <Stack.Screen name="create" component={CreateAccount} options={{ headerShown: false }} />
          <Stack.Screen name="signin" component={SignIn} options={{ headerShown: false }} />
          <Stack.Screen name="configure" component={ConfigureAccount} options={{ headerShown: false }} />
          <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name='add_store' component={AddStore} options={{ headerTitle: 'Add Store', headerTitleAlign: 'start', cardShadowEnabled: true, headerShadowVisible: true }} />

          {/* individual store views */}
          <Stack.Screen name='store_dashboard' component={StoreDashboard} options={{ headerShown: false }} />
          <Stack.Screen name='add_store_product' component={ScannerScreen} options={{ headerTitle: 'Add New Product', headerTitleAlign: 'start', cardShadowEnabled: true, headerShadowVisible: true, headerShown: false }} />
          <Stack.Screen name='update_store_product' component={UpdateStoreProduct} options={{ headerShown: false }} />
          <Stack.Screen name='edit_store_product' component={EditStoreProduct} options={{ headerTitle: 'Edit Store Product' }} />
          <Stack.Screen name='add_product_scanner' component={AddProductScanner} options={{ headerShown: false }} />
          <Stack.Screen name='search_store_product' component={SearchStoreProduct} options={{ headerShown: false }} />
          
          {/* settings options */}
          <Stack.Screen name='barcode_scanner' component={BarcodeScanner} options={{ headerTitle: 'Barcodde Scanner', headerTitleAlign: 'center' }} />
          <Stack.Screen name='notifications' component={ManageNotificationsScreen} />
          {/* SETTINGS OPTION SCREENS */}
          <Stack.Group
            screenOptions={{
              animationEnabled: true
            }}
          >
            <Stack.Screen name='manage_settings' component={ManageSettingsScreen} options={{ headerTitle: 'Profile Details', headerTitleStyle: { color: theme.primary }, headerStyle: { backgroundColor: theme.background }, gestureEnabled: true }} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
