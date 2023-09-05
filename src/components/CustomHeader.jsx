import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { activeBusinessAccount, firebaseAuth, getActiveAccount } from '../services/firebase'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { theme, windowWidth } from '../utils/theme'
import Bell from 'react-native-bootstrap-icons/icons/bell'

export default function CustomHeader() {
    const navigation = useNavigation()
    const authUser = firebaseAuth.currentUser

    useEffect(() => {
        getActiveAccount()
    }, [])

    return (
        <View style={styles.nav}>
            <View style={styles.left}>
                {authUser.photoURL ? <Image style={styles.nav_icon} source={require('../images/logo_dark.png')} /> : <Image style={styles.nav_icon} source={require('../images/logo_dark.png')} />}
                <Text style={styles.nav_title}>{activeBusinessAccount.businessName}</Text>
            </View>
            <TouchableOpacity style={styles.nav_button} touchSoundDisabled={false} onPress={() => { navigation.navigate('notifications') }}  >
                <Bell fill={theme.background} scaleX={1.05} scaleY={1.05} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    nav: {
        backgroundColor: theme.primary,
        padding: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        gap: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth
    },
    left: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center'
    },
    nav_icon: {
        height: 50,
        width: 50,
    },
    nav_title: {
        color: theme.text_dark,
        textTransform: 'uppercase',
        color: theme.text_light,
        fontSize: 20,
    },
    nav_button: {
        alignSelf: 'flex-end',
        marginLeft: 'auto',
        height: 50,
        width: 50,
        backgroundColor: theme.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    }
})