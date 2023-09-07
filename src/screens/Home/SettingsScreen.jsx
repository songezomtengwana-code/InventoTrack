import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { activeBusinessAccount, firebaseAuth, signOut } from '../../services/firebase'
import CheveronRight from 'react-native-bootstrap-icons/icons/chevron-right'
import { theme, windowHeight, windowWidth } from '../../utils/theme'

// icons
import Chat from 'react-native-bootstrap-icons/icons/chat'
import Gear from 'react-native-bootstrap-icons/icons/gear'
import Bell from 'react-native-bootstrap-icons/icons/bell'
import Share from 'react-native-bootstrap-icons/icons/share'
import BoxArrowRight from 'react-native-bootstrap-icons/icons/box-arrow-right'
import Star from 'react-native-bootstrap-icons/icons/star'
import TextLeft from 'react-native-bootstrap-icons/icons/text-left'
import Person from 'react-native-bootstrap-icons/icons/person'
import { environments } from '../../utils/environment'

const SettingsScreen = () => {
    const navigation = useNavigation()
    const authUser = firebaseAuth.currentUser

    return (
        <ScrollView style={{ backgroundColor: theme.background, minHeight: windowHeight }}>
            <View style={styles.profile}>
                <View>
                    {authUser.photoURL ? <Image style={styles.image} source={{ uri: authUser.photoURL }} /> : <Image style={styles.image} source={require('../../images/logo_light.png')} />}
                </View>
                <View>
                    <Text style={styles.name}>{activeBusinessAccount.businessName}</Text>
                    <Text style={styles.email}>{authUser.email}</Text>
                </View>
            </View>

            <Text style={styles.section_header}>Profile</Text>
            <Pressable android_ripple={{ color: theme.primary_transparent, }} onPress={() => { navigation.navigate('manage_settings') }} style={styles.option}>
                <View style={styles.horizontal}>
                    <Person fill={theme.primary} />
                    <Text style={{ color: theme.primary_faint, fontSize: 16 }}>Profile Details</Text>
                </View>

                <CheveronRight fill={theme.black} />

            </Pressable>

            <Pressable android_ripple={{ color: theme.primary_transparent, }} onPress={() => { navigation.navigate('notifications') }} style={styles.option}>
                <View style={styles.horizontal}>
                    <Bell fill={theme.primary} />
                    <Text style={{ color: theme.primary_faint, fontSize: 16 }}>Notifications</Text>
                </View>
                <CheveronRight fill={theme.black} />
            </Pressable>

            <View style={styles.spacer}></View>

            <Text style={styles.section_header}>Help & Support</Text>

            <Pressable android_ripple={{ color: theme.primary_transparent, }} onPress={() => { }} style={styles.option}>
                <View style={styles.horizontal}>
                    <Chat fill={theme.primary} />

                    <Text style={{ color: theme.primary_faint, fontSize: 16 }}>Get in touch</Text>
                </View>
                <CheveronRight fill={theme.black} />

            </Pressable>

            <View style={styles.spacer}></View>

            <Text style={styles.section_header}>More</Text>
            <Pressable android_ripple={{ color: theme.primary_transparent, }} onPress={() => { }} style={styles.option}>
                <View style={styles.horizontal}>
                    <Share fill={theme.primary} />
                    <Text style={{ color: theme.primary_faint, fontSize: 16 }}>Share the InventoTrack App</Text>
                </View>
                <CheveronRight fill={theme.black} />
            </Pressable>
            <Pressable android_ripple={{ color: theme.primary_transparent, }} onPress={() => { }} style={styles.option}>
                <View style={styles.horizontal}>
                    <Star fill={theme.primary} />
                    <Text style={{ color: theme.primary_faint, fontSize: 16 }}>Rate the app</Text>
                </View>
                <CheveronRight fill={theme.black} />
            </Pressable>
            <Pressable android_ripple={{ color: theme.primary_transparent, }} onPress={() => { navigation.navigate('terms') }} style={styles.option}>
                <View style={styles.horizontal}>
                    <TextLeft fill={theme.primary} />
                    <Text style={{ color: theme.primary_faint, fontSize: 16 }}>Terms & conditions</Text>
                </View>
                <CheveronRight fill={theme.black} />
            </Pressable>

            <View style={styles.spacer}></View>

            <Text style={[styles.section_header, {color: theme.secondary}]}>Exit</Text>
            <Pressable android_ripple={{ color: theme.primary_transparent, }} onPress={() => { signOut(navigation) }} style={styles.option}>
                <View style={styles.horizontal}>
                    <BoxArrowRight fill={theme.secondary} />
                    <Text style={{ color: theme.secondary, fontSize: 16 }}>Log out</Text>
                </View>
                <CheveronRight fill={theme.secondary} />
            </Pressable>
            <Text style={styles.version}>App Version: {environments.app_version}</Text>
            <Text style={styles.signiture}>{environments.signiture}</Text>
        </ScrollView>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    profile: {
        flexDirection: 'row',
        gap: 15,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
        padding: 25
    },
    image: {
        height: 75,
        width: 75
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.primary,
        marginBottom: 5,
        textTransform: 'uppercase'
    },
    caret: {
        marginLeft: 'auto',
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 25,
        borderBottomColor: theme.primary_transparent,
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    email: {
        color: theme.grey
    },
    horizontal: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    version: {
        color: theme.grey,
        textAlign: 'right',
        margin: 20
    },
    signiture: {
        color: theme.grey,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 12
    },
    section_header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        color: theme.primary,
        marginHorizontal: 25
    },
    spacer: {
        height: 5,
        width: windowWidth,
        backgroundColor: '#f1f1f1'
    }
})