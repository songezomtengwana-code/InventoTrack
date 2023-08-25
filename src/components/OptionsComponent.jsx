import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../utils/theme'
import UpcScan from 'react-native-bootstrap-icons/icons/upc-scan'
import Search from 'react-native-bootstrap-icons/icons/search'
import { useNavigation } from '@react-navigation/native'
import PlusCircleFill from 'react-native-bootstrap-icons/icons/plus-circle-fill'

export default function OptionsComponent() {
    const navigation = useNavigation()

    const options = [
        {
            key: 'e42d52f4d3d',
            title: 'Scan to find',
            route: ''
        },
        {
            key: 'io409d44j0h',
            title: 'Search to find',
            route: ''
        },
    ]

    return (
        <ScrollView horizontal={true} style={{ gap: 20, marginBottom: 15 }}>
            <Pressable
                android_ripple={{ color: theme.grey }}
                style={styles.button}
                onPress={() => {
                    navigation.navigate('barcode_scanner')
                }}
            >
                <UpcScan fill={theme.third} />
                <Text style={styles.text}>Scan to find</Text>
            </Pressable>
            <Pressable
                android_ripple={{ color: theme.grey }}
                style={styles.button}
                onPress={() => {
                    navigation.navigate('add_store')
                }}
            >
                <PlusCircleFill fill={theme.third} />
                <Text style={styles.text}>Add A New Store </Text>
            </Pressable>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 5,
        marginRight: 10,
        borderColor: theme.background,
        backgroundColor: theme.background,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    text: {
        color: theme.primary,
        fontWeight: 'bold'
    }
})