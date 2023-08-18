import React, { useEffect } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BullseyeIcon from 'react-native-bootstrap-icons/icons/bullseye';
import BoxSeamIcon from 'react-native-bootstrap-icons/icons/box-seam';
import ShopIcon from 'react-native-bootstrap-icons/icons/shop'
import ThreeDotsIcon from 'react-native-bootstrap-icons/icons/three-dots';
import QrCodeIcon from 'react-native-bootstrap-icons/icons/upc-scan'

// screens
import DashbordScreen from './Home/DashbordScreen';
import { theme } from '../utils/theme';
import InventoryScreen from './Home/InventoryScreen';
import { Icon } from 'react-native-ui-lib';
import SettingsScreen from './Home/SettingsScreen';
import ScannerScreen from './Home/ScannerScreen';
import StoresScreen from './StoresScreen';
import { getActiveAccount } from '../services/firebase';

const Tab = createMaterialBottomTabNavigator();

export function HomeScreen() {

    useEffect(() => {
        getActiveAccount()
    }, [])

    return (
        <Tab.Navigator
            initialRouteName='dashboard'
            sceneAnimationType='shifting'
            shifting={false}
            activeColor='#000000'
            screenOptions={{
                tabBarColor: theme.black
            }}
            inactiveColor="#00000090"
            barStyle={{ backgroundColor: theme.background }}
        >
            <Tab.Screen
                name='overview'
                component={DashbordScreen}
                options={{
                    title: 'Overview',
                    tabBarIcon: ({ color }) => (
                        <BullseyeIcon fill={theme.black} fontSize={50} translateY={5} />
                    ),
                }} />
            {/* <Tab.Screen
                name='inventory'
                component={InventoryScreen}
                options={{
                    title: 'Inventory',
                    tabBarIcon: ({ color }) => (
                        <BoxSeamIcon fill={theme.black} fontSize={50} translateY={5} />
                    ),
                    tabBarColor: "#ffffff",

                }} /> */}
            {/* <Tab.Screen
                name='scanner'
                component={ScannerScreen}
                options={{
                    title: 'Scan',
                    tabBarIcon: ({ color }) => (
                        <QrCodeIcon fill={theme.black} fontSize={50} translateY={5} />
                    ),
                    tabBarColor: "#ffffff",

                }} /> */}
            <Tab.Screen
                name='stores'
                component={StoresScreen}
                options={{
                    title: 'Stores',
                    tabBarIcon: ({ color }) => (
                        <ShopIcon fill={theme.black} fontSize={50} translateY={5} />
                    ),
                    tabBarColor: "#ffffff",

                }} />
            <Tab.Screen
                name='more'
                component={SettingsScreen}
                options={{
                    title: 'More',
                    tabBarIcon: ({ color }) => (
                        <ThreeDotsIcon fill={theme.black} fontSize={50} translateY={5} />
                    ),
                    tabBarColor: "#ffffff",

                }} />
        </Tab.Navigator>
    );
}
