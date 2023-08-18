import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { theme, windowHeight, windowWidth } from '../utils/theme'
import { environments } from '../utils/environment'
import PlusCircleFill from 'react-native-bootstrap-icons/icons/plus-circle-fill'

export default function CreateStoreButton() {
    const navigation = useNavigation()
    return (
        <Pressable
            android_ripple={{ color: theme.amber }}
            style={
                styles.button
            }
            onPress={() => { navigation.navigate('add_store') }}>
            <View style={{ flexDirection: 'row', gap: 10, padding: 15, borderRadius: 10, alignItems: 'center' }}>
                <PlusCircleFill fill={theme.text_light} />
                <Text style={{ color: theme.text_light, fontSize: 18 }}>Create A New Store</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        gap: 10,
        backgroundColor: theme.primary_faint,
        borderRadius: 5,
        height: 55,
        alignItems: 'center',
        overflow: 'hidden'
    }
})