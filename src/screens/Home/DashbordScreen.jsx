import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { firebaseAuth } from '../../services/firebase';
import { theme } from '../../utils/theme';
import { useNavigation } from '@react-navigation/native';
import CreateStoreButton from '../../components/CreateStoreButton';
import StoreStatisticsButton from '../../components/StoreStatisticsButton';
import CustomHeader from '../../components/CustomHeader';
import OptionsComponent from '../../components/OptionsComponent';
import StoresChartComponent from '../../components/StoresChartComponent';

const DashbordScreen = () => {
    const authUser = firebaseAuth.currentUser
    const navigation = useNavigation()

    return (
        <>
            <CustomHeader />
            <ScrollView>
                <View style={styles.header}>
                    <StoreStatisticsButton />
                </View>
                <View style={styles.body}>
                    <OptionsComponent />
                    <Text style={styles.header_title}>Statistics</Text>
                    <StoresChartComponent />
                </View>
            </ScrollView>
        </>
    )
}

export default DashbordScreen

const styles = StyleSheet.create({
    header: {
        backgroundColor: theme.primary,
        flexDirection: 'row',
        gap: 15,
        paddingHorizontal: 25,
        marginBottom: 25,
        padding: 15,
        flexDirection: 'column'
    },
    body: {
        paddingHorizontal: 25
    },
    header_logo: {
        display: 'none'
    },
    header_title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: theme.text_dark,
        marginBottom: 15
    },
    header_text: {
        color: theme.text_light
    },
    header_locations: {

    },
    info: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10
    },
    loader: {
        height: 150,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loader_text: {
        fontWeight: '600',
        marginVertical: 10,
        color: theme.text_light
    },
    banner: {
        minHeight: 25
    }
})