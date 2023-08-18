import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { theme, windowWidth } from '../utils/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

// icons
import ThreeDots from 'react-native-bootstrap-icons/icons/exclamation-circle'
import { environments } from '../utils/environment';
import { Button, Divider, Menu, Modal, PaperProvider, Portal } from 'react-native-paper';
import ExclamationCircle from 'react-native-bootstrap-icons/icons/exclamation-circle-fill';
import StockTrackerBadges from './StockTrackerBadges';
export default function ProductCard({ inventory, id }) {
    const iconScale = 1
    const navigation = useNavigation()

    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };

    if (inventory.length < 1) {
        return <Text style={{ color: theme.text_dark, textAlign: 'center', marginVertical: 50 }}>Nothing On The Inventory</Text>
    } else {
        return (
            <PaperProvider >
                <View
                    style={{
                        width: windowWidth, display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    {inventory?.map((product) => {
                        return (
                            <Pressable key={product.id} style={styles.button} android_ripple={{ color: theme.grey }} onPress={() => { navigation.navigate('update_store_product', { product: product, id: id }) }}>
                                <View style={styles.card} key={product.id}>
                                    <View style={styles.horizontal}>
                                        {product.imageurl ? <Image source={{ uri: product.imageurl }} style={styles.prouct_image} /> : <Image source={{ uri: environments.product_placeholder }} style={styles.prouct_image} />}
                                        <View style={styles.container}>
                                            <Text style={styles.name}>{product.name}</Text>
                                            <Text style={styles.info}>{product.quantity} in stock</Text>
                                        </View>
                                    </View>
                                </View>
                                <StockTrackerBadges stockValue={product.quantity} />
                            </Pressable>

                        )
                    })}
                </View>
                <Portal >
                    <Modal dismissableBackButton={true} visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <Text style={{ color: theme.primary }}>Example Modal.  Click outside this area to dismiss.</Text>
                    </Modal>
                </Portal>
            </PaperProvider>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        color: theme.text_dark,
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 20,
        textTransform: 'capitalize'
    },
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    title: {
        color: theme.text_dark_faint,
        fontSize: 14,
        textTransform: 'capitalize'
    },
    info: {
        color: theme.third,
        fontSize: 16
    },
    id: {
        fontSize: 10,
        fontWeight: 'bold',
        color: theme.grey,
        marginBottom: 10,
        textAlign: 'right'
    },
    vertical: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginTop: 10
    },
    barcode: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 10,
        marginTop: 25,
        justifyContent: 'center'
    },
    prouct_image: {
        height: 50,
        width: 50,
        marginRight: 5
    },
    more: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        zIndex: 10
    },
    button: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: windowWidth - 50,
        backgroundColor: theme.background,
        marginVertical: 10,
        borderRadius: 5
    },
    noti: {
        marginHorizontal: 15,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        height: 25
    },
    
})