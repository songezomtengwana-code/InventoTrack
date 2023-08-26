import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { PaperProvider, MD3LightTheme as DefaultTheme, Modal, TextInput, } from 'react-native-paper'
import { environments } from '../utils/environment'

// icons
import Pen from 'react-native-bootstrap-icons/icons/pen'
import { useNavigation } from '@react-navigation/native'
import { theme, windowHeight, windowWidth } from '../utils/theme'
import { uploadToInventory } from '../services/StoresServices'
import LoadingComponent from './LoadingComponent'

/**
 * @param {Object} param0 
 * @param {*} param0.product 
 * @param {*} param0.sid contains the store id
 */
export default function NewProductModal({ product, sid }) {
    const navigation = useNavigation()
    const [visible,setVisible] = useState(false)

    return (
        <>
        {visible ? <LoadingComponent text='Adding New Product...' /> : <></>}
            <ScrollView style={{ backgroundColor: theme.background, position: 'relative' }}>
                
                <PaperProvider>
                    <View>
                        <Image source={{ uri: environments.sample_barcode }} style={styles.sample_barcode} />
                        <Text style={[styles.barcode_text, styles.text]}>{product.barcode}</Text>
                        <View style={styles.view}>
                            <View style={styles.details}>
                                <Text style={[styles.details_faint]}>Last Modified: {product.updatedAt.substring(0, 21)}</Text>
                            </View>
                            {product.imageurl ? <Image source={{ uri: product.imageurl }} style={styles.prouct_image} /> : <Image source={{ uri: environments.product_placeholder }} style={styles.prouct_image} />}
                            <Text style={[styles.text, styles.product_name]}>{product.name}</Text>
                            <Text style={styles.description}>{product.description}</Text>

                            <Text style={styles.name}>{product.name}</Text>
                            <View style={styles.horizontal}>
                                <Text style={styles.title}>InventoTrack UUID:</Text>
                                <Text style={styles.info}>{product.id}</Text>
                            </View>
                            <View style={styles.horizontal}>
                                <Text style={styles.title}>Quantity:</Text>
                                <Text style={styles.info}>{product.quantity}</Text>
                            </View>
                            <View style={styles.horizontal}>
                                <Text style={styles.title}>Category:</Text>
                                <Text style={styles.info}>{product.category}</Text>
                            </View>
                            <View style={styles.horizontal}>
                                <Text style={styles.title}>Aisle:</Text>
                                <Text style={styles.info}>{product.location.aisle}</Text>
                            </View>
                            <View style={styles.horizontal}>
                                <Text style={styles.title}>Shelf:</Text>
                                <Text style={styles.info}>{product.location.shelf}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'baseline',
                                gap: 5,

                            }}>
                                <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Price: </Text>
                                <Text style={styles.price}>{product.price} ZAR</Text>
                            </View>
                            <Pressable
                                android_ripple={{ color: theme.grey }}
                                style={styles.edit_button}
                                onPress={() => {
                                   setVisible(true)
                                    uploadToInventory(sid, product, navigation)
                                }}
                            >
                                <Pen fill={theme.primary} />
                                <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Confirm Product Details</Text>
                            </Pressable>
                        </View>
                    </View>
                </PaperProvider>
            </ScrollView>
        </>
    )
}


const styles = StyleSheet.create({
    view: {
        padding: 25,
        paddingVertical: 10,
        backgroundColor: theme.background,
        borderRadius: 10
    },
    dialog: {
        backgroundColor: theme.background,
        color: theme.text_dark,
        borderRadius: 10
    },
    text: {
        color: theme.text_dark
    },
    barcode: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    sample_barcode: {
        width: windowWidth,
        height: 50
    },
    barcode_text: {
        textAlign: 'center',
        fontSize: 20,
        letterSpacing: windowWidth / 25,
        marginVertical: 5,
        fontWeight: 'bold',
        color: theme.text_dark_faint
    },
    product_name: {
        fontSize: 28,
        fontWeight: '600',
        marginBottom: 8,
    },
    description: {
        color: theme.text_dark,
        fontSize: 18,
        marginBottom: 12
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 5,
        marginVertical: 20
    },
    details_faint: {
        fontWeight: '400',
        color: theme.grey,
        fontSize: 14
    },
    horizontal: {
        flexDirection: 'column',
        alignItems: 'left',
        gap: 10,
        marginBottom: 12.5,
        borderBottomColor: theme.text_dark_faint,
        borderBottomWidth: 1,
        paddingBottom: 12.5
    },
    title: {
        color: theme.black,
        fontWeight: 'bold'
    },
    info: {
        color: theme.primary,
    },
    price: {
        fontWeight: 'bold',
        fontSize: 28,
        color: theme.primary,
        marginVertical: 20,
        textAlign: 'right'
    },
    edit_button: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: theme.third,
        backgroundColor: theme.third,
        marginVertical: 10,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5,
        width: '100%'
    },
    header: {
        fontSize: 18,
        color: theme.primary,
        marginBottom: 16
    },
    input: {
        marginBottom: 10,
        backgroundColor: theme.background
    },
    prouct_image: {
        height: 150,
        width: 150,
        marginBottom: 25
    },
    delete_button: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: theme.secondary,
        backgroundColor: theme.secondary,
        marginVertical: 10,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5,
        width: '15%'
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.background,
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 25,
        paddingVertical: 10,
        zIndex: 99,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
    }
})