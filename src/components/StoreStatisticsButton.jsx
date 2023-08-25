import React, { useEffect } from 'react'
import { Pressable, StyleSheet, Text } from "react-native"
import { TouchableOpacity } from "react-native"
import { default as CaretRightFill } from "react-native-bootstrap-icons/icons/caret-right-fill"
import { View } from "react-native-ui-lib"
import { activeBusinessAccount, db, firebaseAuth, get_stores } from '../services/firebase'
import { useNavigation } from '@react-navigation/native'
import Mailbox from 'react-native-bootstrap-icons/icons/mailbox'
import Building from 'react-native-bootstrap-icons/icons/building'
import { theme, windowWidth } from '../utils/theme'
import { getStoresCount } from '../services/StoresServices'
import ChevronRight from 'react-native-bootstrap-icons/icons/chevron-right'

export default function StoreStatisticsButton() {
    const authUser = firebaseAuth.currentUser
    const navigation = useNavigation()
    const [storesValue, setStoresValue] = React.useState(0)

    useEffect(() => {
    }, [])

    const statistics = [
        {
            id: 1,
            name: "Stores",
            route: "stores",
            value: 1
        },  
    ]

    function get_stores_count() {
        const uid = firebaseAuth.currentUser.uid;
        const clientsCollectionRef = db.collection(' clients');
        const storesCollectionRef = clientsCollectionRef.doc(uid).collection('stores');
    
        storesCollectionRef.get().then((querySnapshot) => {
            const numberOfDocuments = querySnapshot.size;
            setStoresValue(querySnapshot)
        }).catch((error) => {
            console.error("Error getting subcollection documents: ", error);
            return "NaN"
        });
    
    }

    return (
        <View style={{ paddingTop: 10 }}>
            <View style={styles.info}><Mailbox fill={theme.text_light} /><Text style={styles.header_text}>{authUser.email}</Text></View>
            <View style={styles.info}><Building fill={theme.text_light} /><Text style={styles.header_text}>{activeBusinessAccount.businessAddress}</Text></View>
            <Text style={styles.brand}>Statistics</Text>
            <View style={styles.horizontal}>
                {statistics.map((stat) => {
                    return (

                        <Pressable
                            android_ripple={{ color: theme.text_dark_faint }}
                            style={styles.banner}
                            onPress={() => {
                                navigation.navigate(stat.route)
                            }}
                            key={stat.id}
                        >
                            <View style={styles.left}>
                                <Text style={styles.left_title}>{stat.name}</Text>
                                <Text style={styles.left_value}>{stat.value}</Text>
                            </View>
                            <View>
                                <ChevronRight fill={theme.background} />
                            </View>
                        </Pressable>

                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    banner: {
        minHeight: 25,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: theme.primary_faint,
        padding: 10,
        paddingHorizontal: 20,
        marginRight: 15,
        width: windowWidth - 50
    },
    left: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    left_title: {
        color: theme.text_light,
        fontWeight: 'bold',
        fontSize: 12
    },
    left_value: {
        color: theme.text_light,
        fontSize: 30,
        fontWeight: 'bold',
        color: theme.text_light
    },
    info: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20
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
    horizontal: {
        flexDirection: 'column',
        gap: 15
    },
    brand: {
        marginVertical: 10,
        fontWeight: 'bold',
        color: theme.background,
        fontSize: 18
    },
    header_text: {
        color: theme.light
    }
})